import React, { useMemo } from 'react';
import { LayoutDashboard, CheckCircle, Clock, FileWarning, Users, X } from 'lucide-react';

export const Sidebar = ({ interns, statusFilter, onStatusFilterChange, isSidebarOpen, setIsSidebarOpen }) => {

  const statusCounts = useMemo(() => {
    const counts = {
      All: interns.length,
      Onboarding: 0,
      Completed: 0,
      'Pending Docs': 0,
    };
    for (const intern of interns) {
      if (counts[intern.status] !== undefined) {
        counts[intern.status]++;
      }
    }
    return counts;
  }, [interns]);

  const navItems = [
    { name: 'All', icon: Users, status: 'All' },
    { name: 'Onboarding', icon: Clock, status: 'Onboarding' },
    { name: 'Pending Docs', icon: FileWarning, status: 'Pending Docs' },
    { name: 'Completed', icon: CheckCircle, status: 'Completed' },
  ];

  const getNavItemClasses = (status) => {
    const baseClasses = 'flex items-center px-4 py-3 text-sm font-medium rounded-lg cursor-pointer transition-colors';
    if (status === statusFilter) {
      return `${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300`;
    }
    return `${baseClasses} text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white`;
  };

  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-2 mb-6">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-gray-600 dark:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <a
              key={item.name}
              onClick={() => onStatusFilterChange(item.status)}
              className={getNavItemClasses(item.status)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="flex-1">{item.name}</span>
              <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full dark:bg-gray-600 dark:text-gray-200">
                {statusCounts[item.status]}
              </span>
            </a>
          ))}
        </nav>
        <div className="mt-auto text-center text-xs text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Purplerain Inc.</p>
            <p>Intern Management System</p>
        </div>
      </aside>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"></div>}
    </>
  );
}; 