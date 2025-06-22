import React from 'react';
import { X } from 'lucide-react';
import { DocumentUpload } from './DocumentUpload';

export const DocumentModal = ({ intern, onClose, onDocumentUpload, onDocumentRemove }) => {
  if (!intern) {
    return null;
  }

  const handleFileUpload = (documentType, file) => {
    const newDocument = {
      file: file,
      uploadDate: new Date().toISOString(),
    };
    onDocumentUpload(intern.id, documentType, newDocument);
  };

  const handleFileRemove = (documentType) => {
    onDocumentRemove(intern.id, documentType);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Document Management for {intern.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DocumentUpload
              label="Resume"
              document={intern.documents.resume}
              onFileSelect={(file) => handleFileUpload('resume', file)}
              onFileRemove={() => handleFileRemove('resume')}
            />
            <DocumentUpload
              label="Government ID"
              document={intern.documents.governmentId}
              onFileSelect={(file) => handleFileUpload('governmentId', file)}
              onFileRemove={() => handleFileRemove('governmentId')}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <DocumentUpload
              label="Signed Agreement"
              document={intern.documents.signedAgreement}
              onFileSelect={(file) => handleFileUpload('signedAgreement', file)}
              onFileRemove={() => handleFileRemove('signedAgreement')}
            />
            <DocumentUpload
              label="Joining Letter"
              document={intern.documents.joiningLetter}
              onFileSelect={(file) => handleFileUpload('joiningLetter', file)}
              onFileRemove={() => handleFileRemove('joiningLetter')}
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-right rounded-b-lg sticky bottom-0">
           <button
             onClick={onClose}
             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
           >
             Close
           </button>
         </div>
      </div>
    </div>
  );
}; 