import React from "react";
import { Eye, ExternalLink } from "lucide-react";

const PreviewPanel = ({ subject, previewHtml, isLoadingPreview, onOpenPreview }) => {
  const getFallbackContent = () => (
    <div className="p-6 text-center h-full flex flex-col justify-center items-center">
      <Eye className="w-12 h-12 text-gray-300 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Email Preview</h2>
      <p className="text-gray-500 max-w-xs">Click 'Preview Email' in the Configuration panel to load the server-side generated HTML.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-blue-500" />
          Server-Side Preview
        </h2>
      </div>

      <div className="border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
        <div className="border-b border-gray-300 bg-gray-100 p-2">
          <div className="text-sm font-medium text-gray-700 truncate">Subject: {subject}</div>
        </div>
        <div className="h-96 overflow-y-auto">
          {isLoadingPreview ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500 text-sm py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                Loading Preview...
              </div>
            </div>
          ) : previewHtml ? (
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          ) : (
            getFallbackContent()
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button onClick={onOpenPreview} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center mx-auto transition-colors">
          <ExternalLink className="w-4 h-4 mr-1" />
          Open Fullscreen Preview
        </button>
      </div>
    </div>
  );
};

export default PreviewPanel;
