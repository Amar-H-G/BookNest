import React, { useState } from "react";
import { X, Send, Mail, RefreshCw } from "lucide-react";

const TestEmailModal = ({ onClose, campaignPayload, onSendTestApi }) => {
  const [testEmail, setTestEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendTest = async () => {
    if (!testEmail || !/\S+@\S+\.\S+/.test(testEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    const testPayload = {
      ...campaignPayload,
      to_email: testEmail,
      subject: `TEST: ${campaignPayload.subject}`,
    };

    setIsSending(true);
    await onSendTestApi(testPayload);
    setIsSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl border border-blue-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-500" />
              Send Test Email
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Email Address</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Enter email address for testing"
                className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2.5 px-4 border transition-colors"
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-xl text-sm text-blue-800">
              <p>The current configuration will be sent to this address for review.</p>
              <p className="mt-1 font-medium">Subject: {campaignPayload.subject}</p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={onClose} disabled={isSending} className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button onClick={handleSendTest} disabled={isSending} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-sm text-sm font-medium flex items-center transition-colors disabled:opacity-50">
                {isSending ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
                {isSending ? "Sending..." : "Send Test"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEmailModal;
