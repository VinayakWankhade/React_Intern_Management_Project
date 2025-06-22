import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, Building, ChevronDown, ArrowRight, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const InternCard = ({ 
  intern, 
  onStatusChange, 
  onOpenDocumentModal,
  onEdit,
  onDelete
}) => {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const statusRef = useRef(null);
  const actionsRef = useRef(null);

  const statusOptions = ['Onboarding', 'Completed', 'Pending Docs'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusDropdownOpen(false);
      }
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setIsActionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusSelect = (newStatus) => {
    onStatusChange(intern.id, newStatus);
    setIsStatusDropdownOpen(false);
  };

  const toggleStatusDropdown = useCallback(() => {
    setIsStatusDropdownOpen(prev => !prev);
    if(isActionsDropdownOpen) setIsActionsDropdownOpen(false);
  }, [isActionsDropdownOpen]);
  
  const toggleActionsDropdown = useCallback(() => {
    setIsActionsDropdownOpen(prev => !prev);
    if(isStatusDropdownOpen) setIsStatusDropdownOpen(false);
  }, [isStatusDropdownOpen]);
  
  const handleEdit = () => {
    onEdit(intern);
    setIsActionsDropdownOpen(false);
  };

  const handleDelete = () => {
    onDelete(intern);
    setIsActionsDropdownOpen(false);
  };

  const handleOpenModal = () => {
    onOpenDocumentModal(intern);
  };

  const renderInternInfo = useCallback(() => (
    <div className="flex items-center space-x-4">
      <img
        src={intern.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(intern.name)}&background=8B5CF6&color=fff`}
        alt={intern.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{intern.name}</h3>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
          <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{intern.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
          <Building className="w-4 h-4 mr-1 flex-shrink-0" />
          {intern.department}
        </div>
      </div>
    </div>
  ), [intern.name, intern.email, intern.department, intern.avatar]);

  const renderStatusDropdown = useCallback(() => (
    <div className="relative" ref={statusRef}>
      <button
        onClick={toggleStatusDropdown}
        className="flex items-center px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        Change Status
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      
      {isStatusDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusSelect(status)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${intern.status === status ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  ), [isStatusDropdownOpen, intern.status, handleStatusSelect, toggleStatusDropdown]);
  
  const renderActionsDropdown = useCallback(() => (
    <div className="relative" ref={actionsRef}>
      <button onClick={toggleActionsDropdown} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      
      {isActionsDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <button
            onClick={handleEdit}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center rounded-t-lg"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center rounded-b-lg"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  ), [isActionsDropdownOpen, handleEdit, handleDelete, toggleActionsDropdown]);

  const renderDocumentManagerButton = useCallback(() => (
    <button
      onClick={() => onOpenDocumentModal(intern)}
      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Document's Upload</span>
      <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
        View
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </button>
  ), [intern, onOpenDocumentModal]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="p-4 sm:p-6 flex-1">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
          <div className="min-w-0 flex-1">
            {renderInternInfo()}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0 w-full sm:w-auto justify-end">
            <StatusBadge status={intern.status} />
            {renderStatusDropdown()}
            {renderActionsDropdown()}
          </div>
        </div>
        {renderDocumentManagerButton()}
      </div>
    </div>
  );
};