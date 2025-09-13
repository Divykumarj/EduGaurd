import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Smile, Meh, Frown, Zap, Bell, MessageCircle, Users, BookOpen, TrendingUp, LogOut, Play } from "lucide-react";
import { mockStudents } from "./mock-data";

interface StudentDashboardProps {
  user: any;
  onNavigate: (page: string, data?: any) => void;
}

export function StudentDashboard({ user, onNavigate }: StudentDashboardProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodSubmitted, setMoodSubmitted] = useState(false);
  
  // Find current student data
  const studentData = mockStudents.find(s => s.id === user.id) || mockStudents[0];
  
  // Mock progress data for charts
  const attendanceData = [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 78 },
    { month: 'Mar', attendance: 82 },
    { month: 'Apr', attendance: studentData.attendance },
  ];

  const gradeData = [
    { month: 'Jan', gpa: 2.1 },
    { month: 'Feb', gpa: 1.9 },
    { month: 'Mar', gpa: 1.7 },
    { month: 'Apr', gpa: studentData.gpa },
  ];

  const handleMoodSubmit = (mood: string) => {
    setSelectedMood(mood);
    setMoodSubmitted(true);
    setTimeout(() => setMoodSubmitted(false), 3000);
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="h-8 w-8 text-green-500" />;
      case 'neutral': return <Meh className="h-8 w-8 text-yellow-500" />;
      case 'sad': return <Frown className="h-8 w-8 text-blue-500" />;
      case 'stressed': return <Zap className="h-8 w-8 text-red-500" />;
      default: return <Meh className="h-8 w-8 text-gray-400" />;
    }
  };

  const personalizedRecommendations = [
    {
      title: "10-Minute Focus Session",
      description: "Try this guided meditation to improve concentration",
      action: "Start Session",
      icon: <Play className="h-4 w-4" />,
      type: "wellness"
    },
    {
      title: "Study Group - Computer Science",
      description: "Join your classmates for collaborative learning",
      action: "Join Group",
      icon: <Users className="h-4 w-4" />,
      type: "academic"
    },
    {
      title: "Time Management Workshop",
      description: "Learn effective strategies to balance your schedule",
      action: "Register",
      icon: <BookOpen className="h-4 w-4" />,
      type: "skill"
    }
  ];

  const quickStats = [
    {
      title: "Current GPA",
      value: studentData.gpa.toString(),
      target: "3.0",
      progress: (studentData.gpa / 4.0) * 100,
      color: studentData.gpa >= 2.5 ? "text-green-600" : "text-red-600"
    },
    {
      title: "Attendance",
      value: `${studentData.attendance}%`,
      target: "75%",
      progress: studentData.attendance,
      color: studentData.attendance >= 75 ? "text-green-600" : "text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>Welcome,</span>
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('chatbot', user)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Support
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={studentData.avatar} />
                  <AvatarFallback>
                    {user.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('landing')}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Good morning, {user.name.split(' ')[0]}! 👋</h2>
            <p className="text-blue-100">
              You're doing great! Remember, every small step counts towards your success.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{stat.title}</span>
                        <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                      <Progress value={stat.progress} className="h-2" />
                      <p className="text-xs text-gray-600">Target: {stat.target}</p>
                    </div>
                  ))}
                </div>

                {/* Attendance Chart */}
                <div className="h-48">
                  <h4 className="font-medium mb-2">Attendance Trend</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Personalized suggestions to help you succeed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalizedRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          rec.type === 'wellness' ? 'bg-green-100 text-green-600' :
                          rec.type === 'academic' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {rec.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{rec.title}</h4>
                          <p className="text-sm text-gray-600">{rec.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {rec.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Mood Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
                <CardDescription>Track your mood to get better support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { mood: 'happy', label: 'Great', color: 'hover:bg-green-50 border-green-200' },
                    { mood: 'neutral', label: 'Okay', color: 'hover:bg-yellow-50 border-yellow-200' },
                    { mood: 'sad', label: 'Down', color: 'hover:bg-blue-50 border-blue-200' },
                    { mood: 'stressed', label: 'Stressed', color: 'hover:bg-red-50 border-red-200' }
                  ].map(({ mood, label, color }) => (
                    <button
                      key={mood}
                      onClick={() => handleMoodSubmit(mood)}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${color} ${
                        selectedMood === mood ? 'ring-2 ring-blue-500' : ''
                      }`}
                      disabled={moodSubmitted}
                    >
                      {getMoodIcon(mood)}
                      <p className="text-sm font-medium mt-1">{label}</p>
                    </button>
                  ))}
                </div>
                
                {moodSubmitted && (
                  <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">Thanks for sharing! 💚</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Chatbot Widget */}
            <Card>
              <CardHeader>
                <CardTitle>Need Support?</CardTitle>
                <CardDescription>Chat with our AI counselor anytime</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-800">
                      I'm here 24/7 to listen and help with any challenges you're facing.
                    </p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => onNavigate('chatbot', user)}
                  >
                    Start Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Department</span>
                  <span className="text-sm text-gray-600">{studentData.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Roll Number</span>
                  <span className="text-sm text-gray-600">{studentData.rollNo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Active</span>
                  <span className="text-sm text-gray-600">{studentData.lastActive}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Support Level</span>
                  <Badge className={
                    studentData.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                    studentData.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {studentData.riskLevel === 'High' ? 'Extra Support' :
                     studentData.riskLevel === 'Medium' ? 'Some Support' : 'On Track'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}