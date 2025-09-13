import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Shield, ArrowLeft } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string, data?: any) => void;
  initialRole?: string;
}

export function LoginPage({ onNavigate, initialRole = 'student' }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    collegeId: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    collegeId: '',
    department: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    const userData = {
      id: selectedRole === 'teacher' ? 't1' : '1',
      name: selectedRole === 'teacher' ? 'Dr. Patricia Johnson' : 'Alex Johnson',
      email: loginData.email || (selectedRole === 'teacher' ? 'p.johnson@college.edu' : 'alex.johnson@college.edu'),
      role: selectedRole,
      department: selectedRole === 'teacher' ? 'Computer Science' : 'Computer Science'
    };

    if (selectedRole === 'teacher') {
      onNavigate('teacher-dashboard', userData);
    } else if (selectedRole === 'student') {
      onNavigate('student-dashboard', userData);
    } else if (selectedRole === 'admin') {
      onNavigate('admin-dashboard', userData);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Mock registration - redirect to login
    setActiveTab('login');
    alert('Registration successful! Please log in.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EduGuard</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a:</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher/Administrator</SelectItem>
                        <SelectItem value="admin">System Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collegeId">College ID (Optional)</Label>
                    <Input
                      id="collegeId"
                      placeholder="Enter your college ID"
                      value={loginData.collegeId}
                      onChange={(e) => setLoginData({...loginData, collegeId: e.target.value})}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => alert('Password reset link sent to your email!')}
                  >
                    Forgot Password?
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join EduGuard to get started
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-register">I am a:</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher/Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input
                      id="email-register"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={registerData.department} 
                      onValueChange={(value) => setRegisterData({...registerData, department: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                        <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collegeId-register">College ID</Label>
                    <Input
                      id="collegeId-register"
                      placeholder="Enter your college ID"
                      value={registerData.collegeId}
                      onChange={(e) => setRegisterData({...registerData, collegeId: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-register">Password</Label>
                    <Input
                      id="password-register"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Demo Login Buttons */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-3 text-center">Quick Demo Access:</p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRole('teacher');
                const userData = {
                  id: 't1',
                  name: 'Dr. Patricia Johnson',
                  email: 'p.johnson@college.edu',
                  role: 'teacher',
                  department: 'Computer Science'
                };
                onNavigate('teacher-dashboard', userData);
              }}
            >
              Demo as Teacher
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRole('student');
                const userData = {
                  id: '1',
                  name: 'Alex Johnson',
                  email: 'alex.johnson@college.edu',
                  role: 'student',
                  department: 'Computer Science'
                };
                onNavigate('student-dashboard', userData);
              }}
            >
              Demo as Student
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRole('admin');
                const userData = {
                  id: 'admin1',
                  name: 'System Administrator',
                  email: 'admin@college.edu',
                  role: 'admin',
                  department: 'Administration'
                };
                onNavigate('admin-dashboard', userData);
              }}
            >
              Demo as Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}