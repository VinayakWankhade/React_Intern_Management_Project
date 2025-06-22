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
    if (!file) return;

    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600 transition-colors"
    >
      <div className="flex flex-col items-center justify-center">
        <Upload className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" />
        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{accept}</p>
      </div>
      <input id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`} type="file" className="hidden" onChange={handleFileChange} accept={accept} />
    </label>
  );

  const renderUploadedState = () => (
    <div className="w-full h-28 p-3 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-500/30 rounded-lg flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <Check className="w-5 h-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate" title={file.name}>
            {file.name}
          </p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
          <button onClick={handleDownload} className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/60 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={onFileRemove} className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/60 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-2 pl-7 text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <div className="flex items-center">
          <FileText className="w-3 h-3 mr-1.5" />
          <span>{(file.size / 1024).toFixed(1)} KB</span>
        </div>
        {document.uploadDate && (
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1.5" />
            <span>{formatUploadDate(document.uploadDate)}</span>
          </div>
        )}
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