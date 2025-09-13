import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ArrowLeft, AlertTriangle, TrendingDown, Clock, MessageSquare, UserPlus, Calendar, Send } from "lucide-react";
import { type Student } from "./mock-data";

interface StudentDetailProps {
  student: Student;
  onNavigate: (page: string, data?: any) => void;
}

export function StudentDetail({ student, onNavigate }: StudentDetailProps) {
  const [selectedIntervention, setSelectedIntervention] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [actionTaken, setActionTaken] = useState<string | null>(null);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Low': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return '';
    }
  };

  const handleSendMessage = () => {
    if (!customMessage.trim()) return;
    setActionTaken('message');
    setTimeout(() => setActionTaken(null), 3000);
    setCustomMessage('');
  };

  const handleAssignMentor = () => {
    setActionTaken('mentor');
    setTimeout(() => setActionTaken(null), 3000);
  };

  const handleScheduleCounseling = () => {
    setActionTaken('counseling');
    setTimeout(() => setActionTaken(null), 3000);
  };

  const handleApplyIntervention = () => {
    if (!selectedIntervention) return;
    setActionTaken('intervention');
    setTimeout(() => setActionTaken(null), 3000);
    setSelectedIntervention('');
  };

  // Risk factors analysis
  const riskFactors = [];
  if (student.attendance < 60) {
    riskFactors.push({
      icon: <Clock className="h-4 w-4" />,
      title: 'Low Attendance',
      description: `Current attendance: ${student.attendance}% (Target: 75%+)`,
      severity: 'high'
    });
  }
  if (student.gpa < student.previousGpa) {
    const drop = (student.previousGpa - student.gpa).toFixed(1);
    riskFactors.push({
      icon: <TrendingDown className="h-4 w-4" />,
      title: 'GPA Decline',
      description: `GPA dropped by ${drop} points (${student.previousGpa} → ${student.gpa})`,
      severity: student.gpa < 2.0 ? 'high' : 'medium'
    });
  }
  if (student.lastActive !== 'today' && student.lastActive !== '1 day ago') {
    riskFactors.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      title: 'Online Inactivity',
      description: `Last active: ${student.lastActive}`,
      severity: 'medium'
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('teacher-dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-2xl font-bold text-gray-900">Student Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback className="text-2xl">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>
                  {student.rollNo} • {student.department}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className={getRiskBadgeColor(student.riskLevel)}>
                    {student.riskLevel} Risk
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm text-gray-600">{student.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Attendance:</span>
                    <span className="text-sm text-gray-600">{student.attendance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current GPA:</span>
                    <span className="text-sm text-gray-600">{student.gpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Previous GPA:</span>
                    <span className="text-sm text-gray-600">{student.previousGpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Active:</span>
                    <span className="text-sm text-gray-600">{student.lastActive}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleAssignMentor}
                  disabled={actionTaken === 'mentor'}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {actionTaken === 'mentor' ? 'Mentor Assigned!' : 'Assign Peer Mentor'}
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleScheduleCounseling}
                  disabled={actionTaken === 'counseling'}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {actionTaken === 'counseling' ? 'Counseling Scheduled!' : 'Schedule Counseling'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Risk Analysis & Interventions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Meter */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>
                  Probability of dropout based on current indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-4xl font-bold mb-2 ${getRiskColor(student.riskLevel)}`}>
                    {student.riskScore}%
                  </div>
                  <p className="text-gray-600">Chance of dropout</p>
                </div>
                <Progress value={student.riskScore} className="h-3 mb-4" />
                <div className="text-center">
                  <Badge className={getRiskBadgeColor(student.riskLevel)}>
                    {student.riskLevel} Risk Student
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors Identified</CardTitle>
                <CardDescription>
                  Key indicators contributing to dropout risk
                </CardDescription>
              </CardHeader>
              <CardContent>
                {riskFactors.length > 0 ? (
                  <div className="space-y-4">
                    {riskFactors.map((factor, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className={`mt-0.5 ${
                          factor.severity === 'high' ? 'text-red-500' : 
                          factor.severity === 'medium' ? 'text-yellow-500' : 'text-gray-500'
                        }`}>
                          {factor.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{factor.title}</h4>
                          <p className="text-sm text-gray-600">{factor.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No significant risk factors identified.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Suggested Interventions */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Interventions</CardTitle>
                <CardDescription>
                  AI-recommended actions to help this student succeed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.interventions.map((intervention, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{intervention}</h4>
                        <p className="text-sm text-gray-600">
                          {intervention === 'Assign Peer Mentor' && 'Connect with a successful student in the same department'}
                          {intervention === 'Suggest Scholarship Aid' && 'Help with financial support applications'}
                          {intervention === 'Recommend Counseling Session' && 'Professional guidance for academic and personal challenges'}
                          {intervention === 'Academic Support' && 'Tutoring and study skills development'}
                          {intervention === 'Financial Aid Consultation' && 'Explore available financial assistance options'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <Label>Apply Additional Intervention</Label>
                  <div className="flex gap-2">
                    <Select value={selectedIntervention} onValueChange={setSelectedIntervention}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select intervention..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="study-skills">Study Skills Workshop</SelectItem>
                        <SelectItem value="time-management">Time Management Training</SelectItem>
                        <SelectItem value="career-guidance">Career Guidance Session</SelectItem>
                        <SelectItem value="mental-health">Mental Health Support</SelectItem>
                        <SelectItem value="academic-probation">Academic Probation Program</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleApplyIntervention}
                      disabled={!selectedIntervention || actionTaken === 'intervention'}
                    >
                      {actionTaken === 'intervention' ? 'Applied!' : 'Apply'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Send Message */}
            <Card>
              <CardHeader>
                <CardTitle>Send Alert Message</CardTitle>
                <CardDescription>
                  Send a personalized message to the student
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write a supportive message to the student..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!customMessage.trim() || actionTaken === 'message'}
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {actionTaken === 'message' ? 'Message Sent!' : 'Send Message'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}