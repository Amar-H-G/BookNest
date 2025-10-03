import React, { useMemo, useState } from "react";
import { gsap } from "gsap";
import API from "../../services/api";
import EmailConfiguration from "../../components/Administrator/DynamicEmail/EmailConfiguration";
import LeadSelection from "../../components/Administrator/DynamicEmail/LeadSelection";
import PreviewPanel from "../../components/Administrator/DynamicEmail/PreviewPanel";
import TestEmailModal from "../../components/Administrator/DynamicEmail/TestEmailModal";
import { toast } from "react-toastify";

const DynamicEmail = () => {
  const [config, setConfig] = useState({
    campaign_name: "",
    template_name: "dynamic_sale_alert",
    template_type: "dynamic",
    subject: "🎉 M3M FREEDOM SALE ALERT - Limited Time Offer!",
    scheduled_at: "",
    dynamic_fields: [],
  });

  const [selectedLeads, setSelectedLeads] = useState([]);

  const [showTestModal, setShowTestModal] = useState(false);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const campaignPayload = useMemo(() => ({
    template_name: config.template_name,
    template_type: config.template_type,
    subject: config.subject,
    dynamic_fields: config.dynamic_fields,
    scheduled_at: config.scheduled_at || undefined,
    campaign_name: config.campaign_name || `${config.subject} - ${new Date().toLocaleDateString()}`,
  }), [config]);

  const handlePreviewEmail = async (payload) => {
    setIsLoadingPreview(true);
    setPreviewHtml(null);
    try {
      const response = await API.post("/email_campaign/preview_email/", {
        ...payload,
        to_email: "preview@example.com",
      });
      setPreviewHtml(response.data.body || "Preview not available.");
      toast.success("Preview loaded successfully!");
    } catch (error) {
      console.error("Preview failed:", error);
      setPreviewHtml("Error loading preview. Check console for details.");
      toast.error("Error loading email preview.");
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleSendTestApi = async (payload) => {
    setIsSending(true);
    try {
      const response = await API.post("/email_campaign/send_test_email/", payload);
      if (response.data.status === "success") {
        toast.success(`Test email sent to ${payload.to_email}!`);
      } else {
        toast.error(`Test email failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Test email failed:", error);
      toast.error("Error: Could not send test email.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateCampaign = async (payload) => {
    setIsSending(true);
    try {
      const response = await API.post("/email_campaign/create_campaign/", payload);
      if (response.data.status === "success") {
        toast.success(`Campaign '${payload.campaign_name}' created (ID: ${response.data.campaign_id})!`);
        setSelectedLeads([]);
      } else {
        toast.error(`Campaign creation failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Campaign creation failed:", error.response?.data || error);
      toast.error("Error: Could not create campaign. Check console.");
    } finally {
      setIsSending(false);
    }
  };

  const openPreviewWindow = () => {
    const html = previewHtml || "";
    const doc = window.open("", "_blank", "noopener,noreferrer,width=1200,height=800");
    if (doc) {
      doc.document.write(html);
      doc.document.close();
    }
  };

  return (
    <div className="min-h-screen pt-2 pb-10 py-8 px-2 sm:px-4 bg-gray-50">
      <div className="w-full mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dynamic Email Creator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Create, preview, and send customized emails to multiple leads using live data templates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <EmailConfiguration
              value={config}
              onChange={setConfig}
              onPreview={handlePreviewEmail}
              isLoadingPreview={isLoadingPreview}
              onSelectProjects={() => console.log("Project selection to implement")}
            />
          </div>

          <div>
            <LeadSelection
              selectedLeads={selectedLeads}
              onLeadsChange={setSelectedLeads}
              onSendTest={() => setShowTestModal(true)}
              onSendBulk={handleCreateCampaign}
              campaignPayload={campaignPayload}
              isSending={isSending}
            />
          </div>

          <div>
            <PreviewPanel
              subject={config.subject}
              previewHtml={previewHtml}
              isLoadingPreview={isLoadingPreview}
              onOpenPreview={openPreviewWindow}
            />
          </div>
        </div>

        {showTestModal && (
          <TestEmailModal
            onClose={() => setShowTestModal(false)}
            campaignPayload={campaignPayload}
            onSendTestApi={handleSendTestApi}
          />
        )}
      </div>
    </div>
  );
};

export default DynamicEmail;
