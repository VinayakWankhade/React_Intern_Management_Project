import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export const ConfirmDeleteModal = ({ intern, onClose, onConfirmDelete }) => {
  if (!intern) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
            Confirm Deletion
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the intern "<strong>{intern.name}</strong>"? 
            This action cannot be undone.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center rounded-b-lg space-x-3">
           <button
             onClick={onClose}
             className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
           >
             Cancel
           </button>
           <button
             onClick={() => onConfirmDelete(intern.id)}
             className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
           >
             Delete
           </button>
         </div>
      </div>
    </div>
  );
}; 