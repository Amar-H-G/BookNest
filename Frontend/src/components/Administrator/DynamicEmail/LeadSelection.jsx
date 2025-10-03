import React, { useEffect, useRef, useState } from "react";
import { Users, Filter, Search, Send, Mail, RefreshCw, Eye, ChevronLeft, ChevronRight, Shield, X, User, Phone, BarChart3, Calendar } from "lucide-react";
import API from "../../../services/api";

const PAGE_LIMIT = 20;

const LeadSelection = ({
  selectedLeads,
  onLeadsChange,
  onSendTest,
  onSendBulk,
  campaignPayload,
  isSending,
}) => {
  const [currentPageLeads, setCurrentPageLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeadDetails, setSelectedLeadDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  const searchDebounceRef = useRef(null);

  useEffect(() => {
    fetchLeads(1, "", "");
    return () => clearTimeout(searchDebounceRef.current);
  }, []);

  const fetchLeads = async (page = 1, search = "", status = "") => {
    try {
      setIsLoading(true);
      const response = await API.get("/leads/planning/", {
        params: { page, limit: PAGE_LIMIT, search, status },
      });
      const data = response.data;

      const transformedLeads = (data.leads || []).map((lead, index) => {
        const primaryEmail = lead.email ? String(lead.email).trim() : "";
        const emailsFromBackend = Array.isArray(lead.emails)
          ? lead.emails.map((e) => String(e).trim()).filter(Boolean)
          : primaryEmail
          ? [primaryEmail]
          : [];
        return {
          id: lead.mobile || `lead-${page}-${index}`,
          name: lead.name || "Unknown",
          email: primaryEmail || "",
          emails: emailsFromBackend,
          mobile: lead.mobile || "",
          status: lead.status || "new",
          history: lead.history || [],
          email_tracking: lead.email_tracking || [],
          total_emails_sent: lead.total_emails_sent || 0,
          source: lead.source || "Unknown",
          updated_at: lead.updated_at,
          assigned_to: lead.assigned_to_name || "-",
        };
      });

      setCurrentPage(page);
      setTotalPages(data.total_pages || Math.ceil((data.total_count || 0) / PAGE_LIMIT) || 1);
      setTotalLeads(data.total_count || 0);
      setCurrentPageLeads(transformedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setCurrentPageLeads([]);
      setTotalPages(1);
      setTotalLeads(0);
      setCurrentPage(page);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      fetchLeads(1, searchTerm.trim(), statusFilter);
    }, 450);
    return () => clearTimeout(searchDebounceRef.current);
  }, [searchTerm, statusFilter]);

  const getUniqueStatuses = () => [
    "new",
    "contacted",
    "qualified",
    "converted",
    "followup",
    "dead",
    "closed",
    "spam",
  ];

  const isLeadSelected = (lead) => selectedLeads.some((s) => s.id === lead.id);

  const toggleLeadSelection = (lead) => {
    const already = isLeadSelected(lead);
    if (already) {
      onLeadsChange(selectedLeads.filter((s) => s.id !== lead.id));
    } else {
      if (selectedLeads.length >= 20) {
        alert("Maximum 20 leads can be selected at a time.");
        return;
      }
      const leadToAdd = {
        ...lead,
        emails: Array.isArray(lead.emails) ? [...lead.emails] : lead.email ? [lead.email] : [],
      };
      onLeadsChange([...selectedLeads, leadToAdd]);
    }
  };

  const selectAllOnPage = () => {
    const availableSlots = 20 - selectedLeads.length;
    if (availableSlots <= 0) {
      alert("Maximum 20 leads already selected. Please deselect some leads first.");
      return;
    }
    const leadsToSelect = currentPageLeads
      .filter((lead) => !isLeadSelected(lead))
      .slice(0, availableSlots)
      .map((lead) => ({ ...lead, emails: Array.isArray(lead.emails) ? [...lead.emails] : lead.email ? [lead.email] : [] }));
    if (leadsToSelect.length === 0) {
      alert("All leads on this page are already selected.");
      return;
    }
    onLeadsChange([...selectedLeads, ...leadsToSelect]);
  };

  const deselectAll = () => onLeadsChange([]);

  const loadPage = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchLeads(page, searchTerm.trim(), statusFilter);
  };

  const nextPage = () => loadPage(currentPage + 1);
  const prevPage = () => loadPage(currentPage - 1);

  const showLeadDetails = (lead) => {
    setSelectedLeadDetails({ ...lead, emails: Array.isArray(lead.emails) ? [...lead.emails] : lead.email ? [lead.email] : [] });
  };

  const closeLeadDetails = () => setSelectedLeadDetails(null);

  const modalAddEmail = (value) => {
    const cleaned = String(value || "").trim();
    if (!cleaned) return;
    if (!/@/.test(cleaned)) {
      if (!confirm("The value doesn't look like an email. Add anyway?")) return;
    }
    setSelectedLeadDetails((prev) => ({ ...prev, emails: prev.emails.includes(cleaned) ? prev.emails : [...prev.emails, cleaned] }));
  };

  const modalRemoveEmail = (email) => {
    setSelectedLeadDetails((prev) => ({ ...prev, emails: prev.emails.filter((e) => e !== email) }));
  };

  const saveModalEmailsToSelection = () => {
    if (!selectedLeadDetails) return;
    const isSelected = selectedLeads.some((s) => s.id === selectedLeadDetails.id);
    if (isSelected) {
      const updated = selectedLeads.map((s) => (s.id === selectedLeadDetails.id ? { ...s, emails: [...selectedLeadDetails.emails] } : s));
      onLeadsChange(updated);
    }
    setCurrentPageLeads((prev) => prev.map((l) => (l.id === selectedLeadDetails.id ? { ...l, emails: [...selectedLeadDetails.emails] } : l)));
    closeLeadDetails();
  };

  const handleSendBulkClick = () => {
    if (!selectedLeads || selectedLeads.length === 0) {
      alert("Please select at least one recipient.");
      return;
    }
    const recipients = selectedLeads.flatMap((lead) => {
      const emails = Array.isArray(lead.emails) && lead.emails.length > 0 ? lead.emails : lead.email ? [lead.email] : [];
      return emails.map((em) => ({ email: em, name: lead.name || "", mobile: lead.mobile || "", lead_id: lead.id }));
    });
    if (recipients.length === 0) {
      alert("None of the selected leads have an email address.");
      return;
    }
    const bulkPayload = { ...campaignPayload, recipients, campaign_name: campaignPayload.campaign_name || `Campaign ${new Date().toLocaleDateString()}` };
    onSendBulk(bulkPayload);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      new: "bg-blue-100 text-blue-800 border border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      qualified: "bg-green-100 text-green-800 border border-green-200",
      converted: "bg-purple-100 text-purple-800 border border-purple-200",
      followup: "bg-orange-100 text-orange-800 border border-orange-200",
      dead: "bg-red-100 text-red-800 border border-red-200",
      closed: "bg-gray-100 text-gray-800 border border-gray-200",
      spam: "bg-pink-100 text-pink-800 border border-pink-200",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const handleRefresh = () => fetchLeads(currentPage, searchTerm.trim(), statusFilter);

  const EmailChips = ({ emails, onRemove }) => (
    <div className="flex flex-wrap gap-2">
      {emails && emails.length > 0 ? (
        emails.map((em) => (
          <div key={em} className="flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-indigo-50 border border-indigo-100">
            <span className="truncate max-w-[140px]">{em}</span>
            {onRemove && (
              <button onClick={() => onRemove(em)} className="p-1">
                <X className="w-3 h-3 text-indigo-500" />
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="text-xs text-gray-400 italic">No emails</div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="w-6 h-6 mr-3 text-blue-500" />
        Select Recipients
        {isLoading && <RefreshCw className="w-4 h-4 ml-3 animate-spin text-blue-500" />}
      </h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
        <div className="flex items-center text-yellow-800 text-sm md:text-base">
          <Shield className="w-4 h-4 mr-2" />
          <span>
            <strong>Limit:</strong> {selectedLeads.length}/20 leads selected
          </span>
        </div>
        <div className="text-xs md:text-sm text-yellow-700 mt-1">Selections persist across pages — you can edit emails from the details view.</div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status Filter</label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border text-sm appearance-none"
              >
                <option value="">All Statuses</option>
                {getUniqueStatuses().map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Search (name or email)</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type to search by name or email (live)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 pl-10 pr-3 border text-sm"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                  fetchLeads(1, "", "");
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white text-xs md:text-sm py-2 px-3 rounded-xl transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs md:text-sm py-2 px-3 rounded-xl transition-all duration-300 flex items-center disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-3">
        <button
          onClick={selectAllOnPage}
          disabled={selectedLeads.length >= 20 || currentPageLeads.length === 0}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs md:text-sm py-2 px-2 rounded-xl transition-colors"
        >
          Select Page ({currentPageLeads.length})
        </button>
        <button onClick={deselectAll} className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white text-xs md:text-sm py-2 px-2 rounded-xl transition-colors">
          Clear All Selections
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-blue-700 font-medium">
          <span>
            <span className="text-blue-800">{selectedLeads.length}</span>/20 selected
          </span>
          <div className="mt-2 md:mt-0 text-blue-600 text-xs md:text-sm">
            Page {currentPage} of {totalPages} • Total: {totalLeads} leads
          </div>
        </div>
      </div>

      <div className="max-h-[440px] md:max-h-96 overflow-y-auto border border-gray-300 rounded-xl p-4 bg-white shadow-inner mb-4">
        {currentPageLeads.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center">
                <RefreshCw className="w-5 h-5 animate-spin text-blue-500 mb-2" />
                Loading leads...
              </div>
            ) : (
              <p>No leads found matching your criteria. Try adjusting filters.</p>
            )}
          </div>
        ) : (
          currentPageLeads.map((lead) => (
            <div
              key={lead.id}
              className={`flex items-center p-4 rounded-xl mb-3 transition-all duration-200 shadow-sm ${
                isLeadSelected(lead) ? "bg-green-50 border-2 border-green-400 hover:bg-green-100" : "bg-white border border-gray-200 hover:bg-gray-50"
              } ${selectedLeads.length >= 20 && !isLeadSelected(lead) ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                if (!(selectedLeads.length >= 20 && !isLeadSelected(lead))) {
                  toggleLeadSelection(lead);
                }
              }}
            >
              <input
                type="checkbox"
                checked={isLeadSelected(lead)}
                onChange={() => toggleLeadSelection(lead)}
                disabled={selectedLeads.length >= 20 && !isLeadSelected(lead)}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded-md flex-shrink-0"
              />

              <div className="ml-4 flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-center">
                <div className="min-w-0">
                  <div className="text-base font-semibold text-gray-900 truncate">{lead.name}</div>
                  <div className="text-sm text-gray-500 mt-0.5 truncate">{lead.email || "No primary email"}</div>
                </div>

                <div className="flex justify-between md:justify-end items-center space-x-3 mt-2 md:mt-0 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1.5 rounded-full font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showLeadDetails(lead);
                    }}
                    className="text-gray-500 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-blue-50 flex-shrink-0"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevPage} disabled={currentPage === 1 || isLoading} className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          </div>
          <button onClick={nextPage} disabled={currentPage === totalPages || isLoading} className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={() => onSendTest(campaignPayload)}
          disabled={isSending}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Mail className="w-5 h-5 mr-2" />}
          {isSending ? "Sending Test..." : "Send Test Email"}
        </button>

        <button
          onClick={handleSendBulkClick}
          disabled={selectedLeads.length === 0 || isSending}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
          {isSending ? "Sending Emails..." : `Send to ${selectedLeads.length} Selected`}
        </button>
      </div>

      {selectedLeadDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 shadow-2xl border border-blue-100 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <User className="w-6 h-6 mr-3 text-blue-500" />
                    Lead Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">View lead information and email history</p>
                </div>
                <button onClick={closeLeadDetails} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors" title="Close">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-500" />
                      Personal Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Full Name</label>
                        <p className="text-gray-900 font-semibold text-lg">{selectedLeadDetails.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Mobile Number</label>
                        <p className="text-gray-900 font-medium flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-green-500" />
                          {selectedLeadDetails.mobile || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                      Lead Status & Source
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Current Status</label>
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedLeadDetails.status)}`}>
                          {selectedLeadDetails.status?.charAt(0).toUpperCase() + selectedLeadDetails.status?.slice(1)}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Source</label>
                        <p className="text-gray-900 font-medium bg-white px-3 py-2 rounded-lg border border-gray-200">{selectedLeadDetails.source || "Unknown"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-green-500" />
                      Email Information
                    </h4>

                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-600 block mb-3">Email Addresses</label>
                      <EmailChips emails={selectedLeadDetails.emails || []} onRemove={modalRemoveEmail} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Primary Email</label>
                        <p className="text-gray-900 font-medium bg-white px-3 py-2 rounded-lg border border-gray-200 truncate">{selectedLeadDetails.email || "No primary email"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Total Emails Sent</label>
                        <div className="flex items-center space-x-2">
                          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                            <span className="text-2xl font-bold text-blue-600">{selectedLeadDetails.total_emails_sent}</span>
                          </div>
                          <Mail className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedLeadDetails.history && selectedLeadDetails.history.length > 0 && (
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                        Status History
                      </h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {[...selectedLeadDetails.history]
                          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                          .slice(0, 10)
                          .map((h, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                              <div className={`w-2 h-2 rounded-full mt-2 ${h.status === "new" ? "bg-blue-500" : h.status === "contacted" ? "bg-yellow-500" : h.status === "qualified" ? "bg-green-500" : h.status === "converted" ? "bg-purple-500" : "bg-gray-500"}`} />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-semibold text-gray-900 capitalize">{h.status}</span>
                                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">{new Date(h.updated_at).toLocaleDateString()}</span>
                                </div>
                                {h.remark && <p className="text-sm text-gray-600 bg-white p-2 rounded border">{h.remark}</p>}
                                <div className="text-xs text-gray-400 mt-1">{new Date(h.updated_at).toLocaleTimeString()}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      Assignment
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Assigned To</label>
                        <p className="text-gray-900 font-semibold bg-white px-3 py-2 rounded-lg border border-gray-200">{selectedLeadDetails.assigned_to || "Unassigned"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Last Updated</label>
                        <p className="text-gray-900 text-sm bg-white px-3 py-2 rounded-lg border border-gray-200">
                          {selectedLeadDetails.updated_at ? new Date(selectedLeadDetails.updated_at).toLocaleString() : "Never updated"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Send className="w-5 h-5 mr-2 text-green-500" />
                      Email Tracking
                    </h4>
                    <div className="max-h-80 overflow-y-auto space-y-3">
                      {selectedLeadDetails.email_tracking && selectedLeadDetails.email_tracking.length > 0 ? (
                        selectedLeadDetails.email_tracking.slice(0, 8).map((t, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-semibold text-gray-900 text-sm truncate flex-1 mr-2">{t.subject || "No Subject"}</h5>
                              <span className={`text-xs px-2 py-1 rounded-full ${t.status === "sent" ? "bg-green-100 text-green-800" : t.status === "opened" ? "bg-blue-100 text-blue-800" : t.status === "clicked" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}>
                                {t.status || "sent"}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                              <div className="flex justify-between"><span>Sent:</span><span>{t.sent_at ? new Date(t.sent_at).toLocaleDateString() : "Unknown date"}</span></div>
                              {t.opened_at && (<div className="flex justify-between"><span>Opened:</span><span>{new Date(t.opened_at).toLocaleDateString()}</span></div>)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Send className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-gray-500 text-sm">No email tracking data available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
                      Quick Stats
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-sm text-gray-600">Emails Sent</span>
                        <span className="font-bold text-blue-600">{selectedLeadDetails.total_emails_sent}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-sm text-gray-600">Status Changes</span>
                        <span className="font-bold text-green-600">{selectedLeadDetails.history?.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-sm text-gray-600">Email Accounts</span>
                        <span className="font-bold text-purple-600">{selectedLeadDetails.emails?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button onClick={closeLeadDetails} className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-xl transition-colors duration-200 shadow-sm">Close Details</button>
                <button onClick={saveModalEmailsToSelection} className="ml-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-sm">Save Emails</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadSelection;
