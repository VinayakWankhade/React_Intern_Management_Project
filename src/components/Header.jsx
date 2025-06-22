import React from 'react';
import { Users, Search, PlusCircle, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = ({
  searchTerm,
  onSearchChange,
  totalInterns,
  onAddInternClick,
  onMenuClick,
  theme,
  toggleTheme,
}) => {
  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-1 text-gray-600 dark:text-gray-300">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white hidden sm:block">
              Purplerain
            </h1>
          </div>
        </div>

        {/* Middle section (Search) */}
        <div className="flex-1 min-w-0 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search interns..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-4 mr-2">
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{totalInterns}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total Interns</div>
            </div>
          </div>
          <button
            onClick={onAddInternClick}
            className="hidden sm:flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Add Intern</span>
          </button>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
      
      {/* Search bar for medium and small screens */}
      <div className="mt-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search interns..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>

       {/* Add intern button for small screens */}
      <div className="mt-4 sm:hidden">
         <button
            onClick={onAddInternClick}
            className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Add Intern</span>
          </button>
      </div>
    </header>
  );
};