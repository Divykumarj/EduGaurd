// Mock data for the Student Dropout Prevention System

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  department: string;
  attendance: number;
  gpa: number;
  previousGpa: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastActive: string;
  avatar?: string;
  mood?: 'happy' | 'neutral' | 'sad' | 'stressed';
  interventions: string[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@college.edu',
    rollNo: 'CS2021001',
    department: 'Computer Science',
    attendance: 45,
    gpa: 1.4,
    previousGpa: 1.8,
    riskScore: 85,
    riskLevel: 'High',
    lastActive: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    mood: 'stressed',
    interventions: ['Assign Peer Mentor', 'Suggest Scholarship Aid', 'Recommend Counseling Session']
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@college.edu',
    rollNo: 'EE2021045',
    department: 'Electrical Engineering',
    attendance: 78,
    gpa: 2.8,
    previousGpa: 2.9,
    riskScore: 35,
    riskLevel: 'Medium',
    lastActive: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b412bda4?w=150&h=150&fit=crop&crop=face',
    mood: 'neutral',
    interventions: ['Regular Check-ins', 'Study Group Recommendation']
  },
  {
    id: '3',
    name: 'David Chen',
    email: 'david.chen@college.edu',
    rollNo: 'ME2021078',
    department: 'Mechanical Engineering',
    attendance: 92,
    gpa: 3.7,
    previousGpa: 3.6,
    riskScore: 15,
    riskLevel: 'Low',
    lastActive: 'today',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    mood: 'happy',
    interventions: []
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@college.edu',
    rollNo: 'BIO2021023',
    department: 'Biology',
    attendance: 55,
    gpa: 2.1,
    previousGpa: 2.6,
    riskScore: 70,
    riskLevel: 'High',
    lastActive: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    mood: 'sad',
    interventions: ['Academic Support', 'Financial Aid Consultation', 'Peer Mentor Assignment']
  },
  {
    id: '5',
    name: 'James Thompson',
    email: 'james.thompson@college.edu',
    rollNo: 'CHEM2021067',
    department: 'Chemistry',
    attendance: 82,
    gpa: 3.2,
    previousGpa: 3.1,
    riskScore: 25,
    riskLevel: 'Low',
    lastActive: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    mood: 'happy',
    interventions: []
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'Dr. Patricia Johnson',
    email: 'p.johnson@college.edu',
    department: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1559582927-62cddd64dbe4?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'alert',
    message: '2 new students flagged as High Risk today.',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'n2',
    type: 'info',
    message: 'Weekly risk assessment report is ready.',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: 'n3',
    type: 'success',
    message: 'Student Maria Rodriguez showed improvement in attendance.',
    timestamp: '3 days ago',
    read: true
  }
];

export const mockChatResponses = {
  stressed: [
    "I understand you're feeling stressed. This is completely normal, and you're not alone. Let's work through this together.",
    "Here's a quick 5-minute breathing exercise that can help: Take 4 deep breaths, hold for 4 seconds, exhale for 6 seconds. Repeat 3 times.",
    "Would you like me to connect you with a peer mentor or suggest some study techniques that might help reduce your stress?"
  ],
  sad: [
    "I'm sorry you're feeling this way. Your feelings are valid, and it's okay to have difficult days.",
    "Remember that seeking help is a sign of strength, not weakness. Have you considered talking to someone about how you're feeling?",
    "Would you like me to schedule a counseling session or connect you with a peer mentor who can offer support?"
  ],
  help: [
    "I'm here to help! You can talk to me about academic challenges, personal struggles, or anything that's on your mind.",
    "I can also connect you with resources like tutoring, financial aid, counseling services, or peer mentors.",
    "What specifically would you like assistance with today?"
  ],
  default: [
    "Thank you for sharing that with me. How can I best support you right now?",
    "I'm here to listen and help. What's the most important thing you'd like to work on today?",
    "Every challenge is an opportunity to grow. Let's find the right resources to help you succeed."
  ]
};

export const riskFactors = {
  attendance: 'Low attendance (below 60%)',
  gpa: 'Declining GPA trend',
  inactivity: 'Extended period of online inactivity',
  financial: 'Financial difficulties',
  social: 'Limited social engagement',
  academic: 'Academic performance below expectations'
};

export const interventionTemplates = [
  'Assign Peer Mentor',
  'Suggest Scholarship Aid',
  'Recommend Counseling Session',
  'Academic Support Program',
  'Financial Aid Consultation',
  'Study Skills Workshop',
  'Time Management Training',
  'Career Guidance Session'
];