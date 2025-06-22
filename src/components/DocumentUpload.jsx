import React from 'react';
import { Upload, FileText, Check, Download, Trash2, Calendar } from 'lucide-react';

export const DocumentUpload = ({ 
  label, 
  document, 
  onFileSelect,
  onFileRemove,
  accept = ".pdf,.doc,.docx" 
}) => {
  const file = document ? document.file : null;
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };
  
  const handleDownload = () => {
    // In a real app, this would trigger a download from a URL.
    // For this mock, we'll just log a message.
    console.log(`Downloading ${file.name}...`);
    alert(`Simulating download for: ${file.name}`);
  };

  const formatUploadDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderInitialState = () => (
    <label
      htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{accept}</p>
      </div>
      <input id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`} type="file" className="hidden" onChange={handleFileChange} accept={accept} />
    </label>
  );

  const renderUploadedState = () => (
    <div className="w-full h-32 p-4 border-2 border-green-300 bg-green-50 dark:bg-green-500/10 dark:border-green-500/50 rounded-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center text-green-700 dark:text-green-300">
          <Check className="w-5 h-5 mr-2" />
          <p className="text-sm font-semibold truncate" title={file.name}>{file.name}</p>
        </div>
        <div className="mt-2 ml-7 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <FileText className="w-3 h-3 mr-1.5" />
            {(file.size / 1024).toFixed(1)} KB
          </div>
          {document.uploadDate && (
            <div className="flex items-center mt-1">
              <Calendar className="w-3 h-3 mr-1.5" />
              {formatUploadDate(document.uploadDate)}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <button onClick={handleDownload} className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Download className="w-4 h-4" />
        </button>
        <button onClick={onFileRemove} className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {file ? renderUploadedState() : renderInitialState()}
    </div>
  );
};