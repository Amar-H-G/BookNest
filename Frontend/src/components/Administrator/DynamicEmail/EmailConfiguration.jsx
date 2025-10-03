import React, { useEffect, useMemo, useState } from "react";
import { Eye, Building2, RefreshCw, Plus, Trash2, CalendarClock } from "lucide-react";

const EmailConfiguration = ({
  value,
  onChange,
  onPreview,
  isLoadingPreview,
  onSelectProjects,
}) => {
  const { campaign_name, template_name, template_type, subject, scheduled_at, dynamic_fields } = value;

  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  // Template presets for quick-start
  const presets = useMemo(
    () => ({
      dynamic_sale_alert: {
        subject: "🎉 M3M FREEDOM SALE ALERT - Limited Time Offer!",
        dynamic_fields: [
          { key: "hero_title", value: "🎉 M3M FREEDOM SALE ALERT!" },
          { key: "price_drop_text", value: "Price Drop: ₹18,000/sq.ft (Was ₹22,000) + FREE 10g Gold! 🪙" },
          { key: "projects_text", value: "M3M Mansion | M3M Capital | M3M Crown" },
          { key: "location_text", value: "Sector 113, Dwarka Expressway" },
          { key: "benefits_title", value: "✨ Independence Day Festive Benefits:" },
          { key: "benefit_1", value: "All-Inclusive Price @ ₹18,000/sq.ft" },
          { key: "benefit_2", value: "25:25:25:25 Flexible Payment Plan" },
          { key: "benefit_3", value: "Free Modular Kitchen & Air Conditioners ❄️" },
          { key: "benefit_4", value: "No Floor Rise or PLC Charges 🚫" },
          { key: "benefit_5", value: "Free Club Membership & Car Parking 🚗" },
          { key: "benefit_6", value: "Assured Gifts on Booking (Gold Coin 🪙 / Smart Gadget 📱)" },
          { key: "benefit_7", value: "Home Loan Assistance from Leading Banks 🏦" },
          { key: "location_highlights_title", value: "📍 Location Highlights:" },
          { key: "location_highlight_1", value: "Bang on Dwarka Expressway 🛣️" },
          { key: "location_highlight_2", value: "Near IGI Airport ✈️ & Diplomatic Enclave" },
          { key: "location_highlight_3", value: "Close to India International Convention Centre 🏢" },
          { key: "location_highlight_4", value: "Located in a Smart City – High Growth Zone 🌆" },
          { key: "offer_validity", value: "1st August – 15th August 2025" },
          { key: "urgency_text", value: "⚠️ Limited Inventory – Hurry! Book before prices rise!" },
          { key: "cta_button_text", value: "Explore Now" },
          { key: "cta_button_url", value: "https://zonevalue.com" },
          { key: "contact_phone", value: "+91 99900 54827" },
          { key: "contact_email", value: "info@zonevalue.com" },
          { key: "website_url", value: "https://zonevalue.com/" },
          { key: "terms_text", value: "*T&C Apply. Offers valid for a limited inventory only." },
        ],
      },
      dynamic_welcome: {
        subject: "Welcome to ZoneValue - Your Real Estate Investment Journey Begins!",
        dynamic_fields: [
          { key: "greeting", value: "Hi" },
          { key: "intro_text", value: "Welcome to ZoneValue, your trusted partner in real estate investment and property management." },
        ],
      },
      dynamic_projects_showcase: {
        subject: "Latest Projects Showcase - Exclusive Investment Opportunities",
        dynamic_fields: [
          { key: "hero_title", value: "Latest Projects Showcase" },
          { key: "hero_subtitle", value: "Exclusive Investment Opportunities" },
        ],
      },
    }),
    []
  );

  // Apply template preset on template change
  useEffect(() => {
    const preset = presets[template_name];
    if (preset) {
      onChange({
        ...value,
        subject: preset.subject,
        template_type: template_name.includes("_") ? "dynamic" : template_name,
        dynamic_fields: preset.dynamic_fields,
      });
    } else {
      onChange({ ...value, template_type: template_name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template_name]);

  const updateField = (partial) => onChange({ ...value, ...partial });

  const addDynamicField = () => {
    const k = newFieldKey.trim();
    const v = newFieldValue;
    if (!k) return;
    const exists = (dynamic_fields || []).some((f) => f.key === k);
    const next = exists
      ? (dynamic_fields || []).map((f) => (f.key === k ? { ...f, value: v } : f))
      : [ ...(dynamic_fields || []), { key: k, value: v } ];
    updateField({ dynamic_fields: next });
    setNewFieldKey("");
    setNewFieldValue("");
  };

  const removeDynamicField = (key) => {
    updateField({ dynamic_fields: (dynamic_fields || []).filter((f) => f.key !== key) });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <div className="w-2 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2"></div>
        Email Configuration
      </h2>

      {/* Campaign Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
        <input
          type="text"
          value={campaign_name}
          onChange={(e) => updateField({ campaign_name: e.target.value })}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border transition-colors"
          placeholder="Summer Promo Campaign"
        />
      </div>

      {/* Template Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
        <select
          value={template_name}
          onChange={(e) => updateField({ template_name: e.target.value })}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border transition-colors"
        >
          <option value="dynamic_projects_showcase">Projects Showcase</option>
          <option value="dynamic_welcome">Welcome Email</option>
          <option value="dynamic_sale_alert">Sale Alert</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Template Type: <span className="font-medium">{template_type}</span></p>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => updateField({ subject: e.target.value })}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border transition-colors"
          placeholder="Big savings this week!"
        />
      </div>

      {/* Scheduled at */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><CalendarClock className="w-4 h-4"/>Schedule (optional)</label>
        <input
          type="datetime-local"
          value={scheduled_at || ""}
          onChange={(e) => updateField({ scheduled_at: e.target.value })}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border transition-colors"
        />
      </div>

      {/* Dynamic Fields Builder */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Dynamic Fields</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newFieldKey}
            onChange={(e) => setNewFieldKey(e.target.value)}
            placeholder="key"
            className="flex-1 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 py-2 px-3"
          />
          <input
            type="text"
            value={newFieldValue}
            onChange={(e) => setNewFieldValue(e.target.value)}
            placeholder="value"
            className="flex-1 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 py-2 px-3"
          />
          <button
            type="button"
            onClick={addDynamicField}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4"/> Add Field
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {(dynamic_fields || []).map((f) => (
            <div key={f.key} className="grid grid-cols-12 gap-2 items-center">
              <input
                className="col-span-4 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 py-2 px-3"
                value={f.key}
                readOnly
              />
              <input
                className="col-span-7 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 py-2 px-3"
                value={f.value}
                onChange={(e) => {
                  const next = (dynamic_fields || []).map((x) => x.key === f.key ? { ...x, value: e.target.value } : x);
                  updateField({ dynamic_fields: next });
                }}
              />
              <button
                type="button"
                onClick={() => removeDynamicField(f.key)}
                className="col-span-1 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
              >
                <Trash2 className="w-4 h-4"/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-6">
        {template_name === "dynamic_projects_showcase" && (
          <button
            onClick={onSelectProjects}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            <Building2 className="w-5 h-5 mr-2" />
            Select Projects
          </button>
        )}
        <button
          onClick={() => onPreview(value)}
          disabled={isLoadingPreview}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingPreview ? (
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Eye className="w-5 h-5 mr-2" />
          )}
          {isLoadingPreview ? "Loading Preview..." : "Preview Email"}
        </button>
      </div>
    </div>
  );
};

export default EmailConfiguration;
