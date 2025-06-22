// Mock data for the intern management dashboard.
// Each intern object has the following structure:
// {
//   id: Number, (Unique identifier for the intern)
//   name: String, (Full name of the intern)
//   email: String, (Email address of the intern)
//   department: String, (Department the intern is assigned to)
//   status: String, ('Onboarding', 'Completed', 'Pending Docs')
//   avatar: String, (URL to an avatar image)
//   documents: {
//     resume: File | null,
//     governmentId: File | null,
//     signedAgreement: File | null,
//     joiningLetter: File | null,
//   }
// }

export const mockInterns = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    department: 'Frontend Development',
    status: 'Completed',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    documents: {
      resume: { file: { name: 'Sarah_Johnson_Resume.pdf', size: 1200000 }, uploadDate: '2023-10-15T10:00:00Z' },
      governmentId: { file: { name: 'Sarah_Johnson_ID.pdf', size: 800000 }, uploadDate: '2023-10-16T11:30:00Z' },
      signedAgreement: { file: { name: 'Sarah_Johnson_Agreement.pdf', size: 1500000 }, uploadDate: '2023-10-17T09:00:00Z' },
      joiningLetter: { file: { name: 'Sarah_Johnson_Joining_Letter.pdf', size: 500000 }, uploadDate: '2023-10-18T14:00:00Z' },
    },
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    department: 'Backend Development',
    status: 'Onboarding',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    documents: {
      resume: { file: { name: 'Michael_Chen_Resume.pdf', size: 1350000 }, uploadDate: '2023-11-01T12:00:00Z' },
      governmentId: null,
      signedAgreement: { file: { name: 'Michael_Chen_Agreement.pdf', size: 1600000 }, uploadDate: '2023-11-02T15:20:00Z' },
      joiningLetter: null,
    },
  },
  {
    id: 3,
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    department: 'Data Science',
    status: 'Pending Docs',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    documents: {
      resume: { file: { name: 'Priya_Patel_Resume.pdf', size: 1100000 }, uploadDate: '2023-11-05T18:00:00Z' },
      governmentId: null,
      signedAgreement: null,
      joiningLetter: null,
    },
  },
  {
    id: 4,
    name: 'David Lee',
    email: 'david.lee@example.com',
    department: 'UI/UX Design',
    status: 'Completed',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    documents: {
      resume: { file: { name: 'David_Lee_Resume.pdf', size: 1400000 }, uploadDate: '2023-09-20T10:00:00Z' },
      governmentId: { file: { name: 'David_Lee_ID.pdf', size: 900000 }, uploadDate: '2023-09-21T11:00:00Z' },
      signedAgreement: { file: { name: 'David_Lee_Agreement.pdf', size: 1700000 }, uploadDate: '2023-09-22T12:00:00Z' },
      joiningLetter: { file: { name: 'David_Lee_Joining_Letter.pdf', size: 600000 }, uploadDate: '2023-09-23T13:00:00Z' },
    },
  },
  {
    id: 5,
    name: 'Emily Carter',
    email: 'emily.carter@example.com',
    department: 'Marketing',
    status: 'Onboarding',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    documents: {
      resume: { file: { name: 'Emily_Carter_Resume.pdf', size: 1250000 }, uploadDate: '2023-11-10T09:30:00Z' },
      governmentId: { file: { name: 'Emily_Carter_ID.pdf', size: 850000 }, uploadDate: '2023-11-11T16:45:00Z' },
      signedAgreement: null,
      joiningLetter: null,
    },
  },
];