import React from 'react';

export const StatusBadge = ({ status }) => {
  const getStatusSpecificClasses = (currentStatus) => {
    switch (currentStatus) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Onboarding':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Pending Docs':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  const statusClasses = getStatusSpecificClasses(status);
  const combinedClasses = `${baseClasses} ${statusClasses}`;

  return (
    <span className={combinedClasses}>
      {status}
    </span>
  );
};