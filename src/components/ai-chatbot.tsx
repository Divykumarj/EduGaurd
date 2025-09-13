import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowLeft, Send, Bot, User, Heart, ExternalLink } from "lucide-react";
import { mockChatResponses, type ChatMessage } from "./mock-data";

interface AIChatbotProps {
  user: any;
  onNavigate: (page: string, data?: any) => void;
}

export function AIChatbot({ user, onNavigate }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: `Hi ${user.name.split(' ')[0]}! I'm your AI counseling assistant. I'm here to listen and support you through any challenges you're facing. How are you feeling today?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      sentiment: 'positive'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const detectSentiment = (message: string): 'positive' | 'negative' | 'neutral' => {
    const lowerMessage = message.toLowerCase();
    
    const negativeWords = ['stressed', 'sad', 'worried', 'anxious', 'depressed', 'down', 'overwhelmed', 'tired', 'failing', 'struggle', 'difficult', 'hard', 'problem', 'issue'];
    const positiveWords = ['good', 'great', 'happy', 'excited', 'confident', 'motivated', 'better', 'improved', 'success', 'grateful'];
    
    const hasNegative = negativeWords.some(word => lowerMessage.includes(word));
    const hasPositive = positiveWords.some(word => lowerMessage.includes(word));
    
    if (hasNegative && !hasPositive) return 'negative';
    if (hasPositive && !hasNegative) return 'positive';
    return 'neutral';
  };

  const generateBotResponse = (userMessage: string, sentiment: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and respond accordingly
    if (lowerMessage.includes('stressed') || lowerMessage.includes('stress')) {
      const responses = mockChatResponses.stressed;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      const responses = mockChatResponses.sad;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      const responses = mockChatResponses.help;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('grade') || lowerMessage.includes('gpa') || lowerMessage.includes('study')) {
      return "I understand academic challenges can be overwhelming. Let's break this down together. What specific subject or area are you struggling with? I can connect you with tutoring resources or study groups.";
    }
    
    if (lowerMessage.includes('attendance') || lowerMessage.includes('class')) {
      return "Attendance can be challenging sometimes. What's making it difficult for you to attend classes? Is it health, transportation, motivation, or something else? Let's find solutions together.";
    }
    
    if (lowerMessage.includes('financial') || lowerMessage.includes('money')) {
      return "Financial concerns are a major stressor for many students. Have you explored the financial aid office? I can help you find information about scholarships, grants, and work-study programs available at your college.";
    }
    
    // Sentiment-based responses
    if (sentiment === 'negative') {
      return "I hear that you're going through a tough time right now. Your feelings are completely valid, and it's okay to not be okay sometimes. What's weighing on your mind the most today?";
    }
    
    if (sentiment === 'positive') {
      return "That's wonderful to hear! I'm glad you're feeling positive. It's great to celebrate these moments. Is there anything specific that's contributing to your good mood today?";
    }
    
    // Default responses
    const responses = mockChatResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
      sentiment: detectSentiment(inputMessage)
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.message, userMessage.sentiment || 'neutral');
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        sentiment: 'positive'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Add follow-up resource suggestions for certain topics
      setTimeout(() => {
        if (userMessage.sentiment === 'negative' || userMessage.message.toLowerCase().includes('stressed')) {
          const resourceMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            message: "Would you like me to connect you with a peer mentor, schedule a counseling session, or provide some immediate stress-relief resources?",
            sender: 'bot',
            timestamp: new Date().toISOString(),
            sentiment: 'positive'
          };
          setMessages(prev => [...prev, resourceMessage]);
        }
      }, 2000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResourceAction = (action: string) => {
    const resourceMessage: ChatMessage = {
      id: Date.now().toString(),
      message: `I'd like to ${action}`,
      sender: 'user',
      timestamp: new Date().toISOString(),
      sentiment: 'neutral'
    };

    setMessages(prev => [...prev, resourceMessage]);

    setTimeout(() => {
      let response = '';
      switch (action) {
        case 'connect with a peer mentor':
          response = "Great! I'm connecting you with Sarah, a senior Computer Science student who has helped many students overcome similar challenges. She'll reach out to you within 24 hours via email.";
          break;
        case 'schedule a counseling session':
          response = "I've scheduled you for a counseling session with Dr. Martinez tomorrow at 2 PM in the Student Wellness Center (Room 201). You'll receive a confirmation email shortly.";
          break;
        case 'get stress-relief resources':
          response = "Here are some immediate stress-relief resources: 1) 5-minute guided breathing exercise (link sent to your email), 2) Campus meditation room in Library basement, 3) 24/7 crisis support: 1-800-273-8255";
          break;
        default:
          response = "I'm here to help with whatever you need. Feel free to ask me anything!";
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        sentiment: 'positive'
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const quickActions = [
    { label: "Connect with peer mentor", action: "connect with a peer mentor" },
    { label: "Schedule counseling", action: "schedule a counseling session" },
    { label: "Get stress resources", action: "get stress-relief resources" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('student-dashboard', user)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">AI Counseling Support</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online & Ready to Help</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          {/* Chat Header */}
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <span>EduGuard AI Counselor</span>
                <p className="text-sm text-gray-600 font-normal">
                  Confidential • Supportive • Available 24/7
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <Avatar className="h-6 w-6 flex-shrink-0">
                        {message.sender === 'user' ? (
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-green-100 text-green-600">
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-green-100 text-green-600">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="px-4 py-2 rounded-2xl bg-gray-100">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Scroll to bottom anchor */}
                <div ref={scrollAreaRef} />
              </div>
            </ScrollArea>

            {/* Quick Action Buttons */}
            <div className="my-4">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleResourceAction(action.action)}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex items-center space-x-2 pt-4 border-t">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... I'm here to listen and help."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Heart className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p><strong>Remember:</strong> This AI counselor provides support and resources, but is not a replacement for professional mental health services. If you're experiencing a crisis, please contact emergency services or the crisis hotline: 988.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}