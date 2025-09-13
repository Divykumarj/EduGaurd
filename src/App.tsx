import { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { LoginPage } from "./components/login-page";
import { TeacherDashboard } from "./components/teacher-dashboard";
import { StudentDetail } from "./components/student-detail";
import { StudentDashboard } from "./components/student-dashboard";
import { AIChatbot } from "./components/ai-chatbot";
import { AdminDashboard } from "./components/admin-dashboard";
import { NotificationSystem } from "./components/notification-system";

type Page = 'landing' | 'login' | 'teacher-dashboard' | 'student-detail' | 'student-dashboard' | 'chatbot' | 'admin-dashboard';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [initialRole, setInitialRole] = useState<string>('student');

  const handleNavigate = (page: string, data?: any) => {
    if (data && (page === 'teacher-dashboard' || page === 'student-dashboard' || page === 'admin-dashboard')) {
      setUser(data);
    }
    
    if (page === 'login' && data) {
      setInitialRole(data);
    }
    
    setPageData(data);
    setCurrentPage(page as Page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginPage onNavigate={handleNavigate} initialRole={initialRole} />;
      
      case 'teacher-dashboard':
        return user ? <TeacherDashboard user={user} onNavigate={handleNavigate} /> : null;
      
      case 'student-detail':
        return pageData ? <StudentDetail student={pageData} onNavigate={handleNavigate} /> : null;
      
      case 'student-dashboard':
        return user ? <StudentDashboard user={user} onNavigate={handleNavigate} /> : null;
      
      case 'chatbot':
        return user ? <AIChatbot user={user} onNavigate={handleNavigate} /> : null;
      
      case 'admin-dashboard':
        return user ? <AdminDashboard user={user} onNavigate={handleNavigate} /> : null;
      
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
      
      {/* Notification System - only show when user is logged in */}
      {user && (
        <div className="fixed top-4 right-4 z-40">
          <NotificationSystem userRole={user.role} onNavigate={handleNavigate} />
        </div>
      )}
    </div>
  );
}