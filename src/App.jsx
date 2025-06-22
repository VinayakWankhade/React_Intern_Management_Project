import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InternCard } from './components/InternCard';
import { DocumentModal } from './components/DocumentModal';
import { AddInternModal } from './components/AddInternModal';
import { EditInternModal } from './components/EditInternModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { mockInterns } from './data/mockData';

function App() {
  const [interns, setInterns] = useState(mockInterns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalState, setModalState] = useState({
    type: null, // 'add', 'edit', 'delete', 'documents'
    data: null, // The intern object for edit, delete, documents
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Filter and search interns
  const filteredInterns = useMemo(() => {
    return interns.filter(intern => {
      const matchesSearch = 
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || intern.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [interns, searchTerm, statusFilter]);

  const handleStatusChange = (internId, newStatus) => {
    setInterns(prevInterns =>
      prevInterns.map(intern =>
        intern.id === internId ? { ...intern, status: newStatus } : intern
      )
    );
  };

  const handleDocumentUpload = (internId, documentType, newDocument) => {
    setInterns(prevInterns =>
      prevInterns.map(intern =>
        intern.id === internId
          ? {
              ...intern,
              documents: {
                ...intern.documents,
                [documentType]: newDocument
              }
            }
          : intern
      )
    );
  };

  const handleDocumentRemove = (internId, documentType) => {
    setInterns(prevInterns =>
      prevInterns.map(intern =>
        intern.id === internId
          ? {
              ...intern,
              documents: {
                ...intern.documents,
                [documentType]: null
              }
            }
          : intern
      )
    );
  };

  const handleAddIntern = (newInternData) => {
    const newIntern = {
      id: Date.now(), // Simple unique ID
      ...newInternData,
      status: 'Onboarding',
      avatar: '',
      documents: {
        resume: null,
        governmentId: null,
        signedAgreement: null,
        joiningLetter: null,
      },
    };
    setInterns(prevInterns => [newIntern, ...prevInterns]);
    setModalState({ type: null, data: null });
  };
  
  const handleUpdateIntern = (internId, updatedData) => {
    setInterns(prevInterns =>
      prevInterns.map(intern =>
        intern.id === internId ? { ...intern, ...updatedData } : intern
      )
    );
    setModalState({ type: null, data: null });
  };

  const handleDeleteIntern = (internId) => {
    setInterns(prevInterns => prevInterns.filter(intern => intern.id !== internId));
    setModalState({ type: null, data: null });
  };
  
  const closeModal = () => {
    setModalState({ type: null, data: null });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      <Sidebar 
        interns={interns}
        statusFilter={statusFilter}
        onStatusFilterChange={(status) => {
          setStatusFilter(status);
          setIsSidebarOpen(false); // Close sidebar on mobile after selection
        }}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalInterns={interns.length}
          onAddInternClick={() => setModalState({ type: 'add', data: null })}
          onMenuClick={() => setIsSidebarOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {filteredInterns.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No interns found</div>
                <div className="text-gray-500 text-sm">
                  {searchTerm || statusFilter !== 'All' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'No interns have been added yet'
                  }
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 items-start">
                {filteredInterns.map(intern => (
                  <InternCard
                    key={intern.id}
                    intern={intern}
                    onStatusChange={handleStatusChange}
                    onOpenDocumentModal={() => setModalState({ type: 'documents', data: intern })}
                    onEdit={() => setModalState({ type: 'edit', data: intern })}
                    onDelete={() => setModalState({ type: 'delete', data: intern })}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {modalState.type === 'documents' && (
        <DocumentModal
          intern={modalState.data}
          onClose={closeModal}
          onDocumentUpload={handleDocumentUpload}
          onDocumentRemove={handleDocumentRemove}
        />
      )}

      {modalState.type === 'add' && (
        <AddInternModal
          onClose={closeModal}
          onAddIntern={handleAddIntern}
        />
      )}
      
      {modalState.type === 'edit' && (
        <EditInternModal
          intern={modalState.data}
          onClose={closeModal}
          onUpdateIntern={handleUpdateIntern}
        />
      )}

      {modalState.type === 'delete' && (
        <ConfirmDeleteModal
          intern={modalState.data}
          onClose={closeModal}
          onConfirmDelete={handleDeleteIntern}
        />
      )}
    </div>
  );
}

export default App;