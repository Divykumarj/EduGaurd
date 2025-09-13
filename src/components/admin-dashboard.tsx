import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Download, Users, TrendingUp, AlertTriangle, Bell, LogOut, UserPlus, Search, Filter } from "lucide-react";
import { mockStudents, mockTeachers } from "./mock-data";

interface AdminDashboardProps {
  user: any;
  onNavigate: (page: string, data?: any) => void;
}

export function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Department-wise breakdown
  const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Biology', 'Chemistry'];
  const departmentData = departments.map(dept => {
    const deptStudents = mockStudents.filter(s => s.department === dept);
    return {
      name: dept,
      total: deptStudents.length,
      highRisk: deptStudents.filter(s => s.riskLevel === 'High').length,
      mediumRisk: deptStudents.filter(s => s.riskLevel === 'Medium').length,
      lowRisk: deptStudents.filter(s => s.riskLevel === 'Low').length,
      avgAttendance: Math.round(deptStudents.reduce((sum, s) => sum + s.attendance, 0) / deptStudents.length),
      avgGPA: (deptStudents.reduce((sum, s) => sum + s.gpa, 0) / deptStudents.length).toFixed(2)
    };
  });

  // Risk distribution data
  const riskDistribution = [
    { name: 'Low Risk', value: mockStudents.filter(s => s.riskLevel === 'Low').length, color: '#10B981' },
    { name: 'Medium Risk', value: mockStudents.filter(s => s.riskLevel === 'Medium').length, color: '#F59E0B' },
    { name: 'High Risk', value: mockStudents.filter(s => s.riskLevel === 'High').length, color: '#EF4444' }
  ];

  // Monthly trend data (mock)
  const monthlyTrends = [
    { month: 'Jan', highRisk: 8, mediumRisk: 12, lowRisk: 25, totalDropouts: 2 },
    { month: 'Feb', highRisk: 10, mediumRisk: 15, lowRisk: 20, totalDropouts: 3 },
    { month: 'Mar', highRisk: 12, mediumRisk: 18, lowRisk: 15, totalDropouts: 4 },
    { month: 'Apr', highRisk: 15, mediumRisk: 20, lowRisk: 10, totalDropouts: 5 },
  ];

  // Filter students by department
  const filteredStudents = selectedDepartment === 'all' 
    ? mockStudents 
    : mockStudents.filter(s => s.department === selectedDepartment);

  const handleExportReport = (type: string) => {
    // Mock export functionality
    alert(`Exporting ${type} report... This would download a ${type.toUpperCase()} file in a real application.`);
  };

  const overallStats = {
    totalStudents: mockStudents.length,
    highRiskStudents: mockStudents.filter(s => s.riskLevel === 'High').length,
    averageAttendance: Math.round(mockStudents.reduce((sum, s) => sum + s.attendance, 0) / mockStudents.length),
    averageGPA: (mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(2),
    predictedDropouts: mockStudents.filter(s => s.riskScore > 70).length,
    interventionsActive: mockStudents.reduce((sum, s) => sum + s.interventions.length, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>System Administrator</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AD</AvatarFallback>
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
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Across all departments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Students</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overallStats.highRiskStudents}</div>
              <p className="text-xs text-muted-foreground">
                Requiring immediate attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.averageAttendance}%</div>
              <p className="text-xs text-muted-foreground">
                Institution-wide average
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Interventions</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{overallStats.interventionsActive}</div>
              <p className="text-xs text-muted-foreground">
                Support measures in place
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="management">Account Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Risk Distribution */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Student risk level breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Risk Level Trends</CardTitle>
                  <CardDescription>Monthly progression of student risk levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="highRisk" stroke="#EF4444" strokeWidth={2} name="High Risk" />
                        <Line type="monotone" dataKey="mediumRisk" stroke="#F59E0B" strokeWidth={2} name="Medium Risk" />
                        <Line type="monotone" dataKey="lowRisk" stroke="#10B981" strokeWidth={2} name="Low Risk" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Analysis</CardTitle>
                <CardDescription>Performance metrics by academic department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="highRisk" stackId="a" fill="#EF4444" name="High Risk" />
                      <Bar dataKey="mediumRisk" stackId="a" fill="#F59E0B" name="Medium Risk" />
                      <Bar dataKey="lowRisk" stackId="a" fill="#10B981" name="Low Risk" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Department</th>
                        <th className="text-center p-2">Total Students</th>
                        <th className="text-center p-2">High Risk</th>
                        <th className="text-center p-2">Avg Attendance</th>
                        <th className="text-center p-2">Avg GPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentData.map((dept, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{dept.name}</td>
                          <td className="text-center p-2">{dept.total}</td>
                          <td className="text-center p-2">
                            <Badge variant={dept.highRisk > 0 ? "destructive" : "default"}>
                              {dept.highRisk}
                            </Badge>
                          </td>
                          <td className="text-center p-2">{dept.avgAttendance}%</td>
                          <td className="text-center p-2">{dept.avgGPA}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Teachers Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Teachers & Staff</CardTitle>
                  <CardDescription>Manage educator accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Input placeholder="Search teachers..." className="w-48" />
                        <Button size="sm" variant="outline">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Teacher
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {mockTeachers.map((teacher) => (
                        <div key={teacher.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={teacher.avatar} />
                              <AvatarFallback>
                                {teacher.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{teacher.name}</p>
                              <p className="text-sm text-gray-600">{teacher.department}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Deactivate</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Manage system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Assessment Threshold</Label>
                    <Select defaultValue="70">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60% - More Sensitive</SelectItem>
                        <SelectItem value="70">70% - Balanced</SelectItem>
                        <SelectItem value="80">80% - Conservative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Notification Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Retention Period</Label>
                    <Select defaultValue="2years">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full mt-4">
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>Generate and download comprehensive reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Risk Assessment Report</h4>
                      <p className="text-sm text-gray-600">
                        Complete analysis of all student risk levels and factors
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleExportReport('csv')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Department Analytics</h4>
                      <p className="text-sm text-gray-600">
                        Performance metrics breakdown by department
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleExportReport('pdf')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Intervention Effectiveness</h4>
                      <p className="text-sm text-gray-600">
                        Success rates of different support interventions
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleExportReport('xlsx')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Excel
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Monthly Trends</h4>
                      <p className="text-sm text-gray-600">
                        Historical data showing risk level progression
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleExportReport('pdf')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Custom Report</h4>
                      <p className="text-sm text-gray-600">
                        Generate reports with specific parameters and filters
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Configure Report
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}