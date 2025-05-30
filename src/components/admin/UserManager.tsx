import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, UserPlus, Shield, Mail, Calendar, 
  Clock, BookOpen, Award, Activity, Settings,
  Search, Filter, Download, MoreVertical,
  BookOpenCheck, Target, Trophy, History,
  FileText, Star, CheckCircle, XCircle,
  LogIn
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc, onSnapshot, Timestamp, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { logActivity, ActivityLogData } from '@/lib/activity-logger';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  grade: string;
  isOnboarded: boolean;
  createdAt: any;
  updatedAt: any;
  selectedSubjects: Array<{
    id: string;
    name: string;
  }>;
  progress?: {
    completedLessons: string[];
    earnedBadges: string[];
    lastLoginDate: string;
    streakDays: number;
    xp: number;
    mathematics?: {
      overall: number;
      topics: {
        [topicId: string]: {
          completed: number;
          total: number;
          score: number;
        };
      };
    };
    'physical-sciences'?: {
      overall: number;
      topics: {
        [topicId: string]: {
          completed: number;
          total: number;
          score: number;
        };
      };
    };
  };
}

interface UserManagerProps {
  users: User[];
  onToggleAdmin: (userId: string, currentAdminStatus: boolean) => void;
  currentUserId: string;
}

interface UserActivity {
  id: string;
  type: 'login' | 'lesson_complete' | 'badge_earned' | 'xp_earned';
  timestamp: any;
  details: any;
  lessonId?: string;
  subjectId?: string;
  xpAmount?: number;
  badgeId?: string;
}

interface UserProgress {
  moduleId: string;
  moduleName: string;
  status: 'completed' | 'in_progress' | 'not_started';
  score?: number;
  lastAccessed: any;
  timeSpent: number;
}

interface ActivityLog {
  id: string;
  type: 'login' | 'lesson_complete' | 'badge_earned' | 'xp_earned' | 'content_view' | 'quiz_attempt' | 'profile_update';
  userId: string;
  userEmail: string;
  timestamp: Timestamp;
  details: {
    lessonId?: string;
    subjectId?: string;
    topicId?: string;
    lessonName?: string;
    xpAmount?: number;
    badgeId?: string;
    score?: number;
    contentId?: string;
    changes?: any;
  };
}

export const UserManager: React.FC<UserManagerProps> = ({
  users,
  onToggleAdmin,
  currentUserId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.grade === statusFilter;
    const matchesRole = roleFilter === 'all' || user.grade === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleUserAction = (action: string, userId: string) => {
    // Implement user actions (suspend, delete, etc.)
    console.log(`Action ${action} for user ${userId}`);
  };

  const exportUserData = () => {
    // Implement user data export
    console.log('Exporting user data...');
  };

  const fetchUserActivities = async (userId: string) => {
    if (!userId) return;
    
    setIsLoadingActivities(true);
    try {
      // Get user progress data
      const userDoc = await getDoc(doc(db, 'users', userId));
      const userData = userDoc.data();
      
      if (userData?.progress) {
        const activities: UserActivity[] = [];
        
        // Add completed lessons as activities
        userData.progress.completedLessons?.forEach((lessonId: string) => {
          const [subjectId, topicId, lessonName] = lessonId.split('-');
          activities.push({
            id: lessonId,
            type: 'lesson_complete',
            timestamp: userData.progress.updatedAt,
            details: { lessonId, subjectId, topicId, lessonName },
            lessonId,
            subjectId
          });
        });

        // Add earned badges as activities
        userData.progress.earnedBadges?.forEach((badgeId: string) => {
          activities.push({
            id: badgeId,
            type: 'badge_earned',
            timestamp: userData.progress.updatedAt,
            details: { badgeId },
            badgeId
          });
        });

        // Add XP earned as activity
        if (userData.progress.xp > 0) {
          activities.push({
            id: `xp-${userId}`,
            type: 'xp_earned',
            timestamp: userData.progress.updatedAt,
            details: { xp: userData.progress.xp },
            xpAmount: userData.progress.xp
          });
        }

        // Sort activities by timestamp
        activities.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
        setUserActivities(activities);
      }
    } catch (error) {
      console.error('Error fetching user activities:', error);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  const fetchUserProgress = async (userId: string) => {
    if (!userId) return;
    
    setIsLoadingProgress(true);
    try {
      const progressRef = collection(db, 'user_progress');
      const q = query(
        progressRef,
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const progress = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserProgress[];
      
      setUserProgress(progress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      // Set up real-time listener for user document
      const userRef = doc(db, 'users', selectedUser.id);
      const unsubscribeUser = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const previousData = selectedUser;
          
          // Log profile updates
          if (previousData && JSON.stringify(previousData) !== JSON.stringify(userData)) {
            logActivity({
              userId: selectedUser.id,
              userEmail: selectedUser.email,
              type: 'profile_update',
              details: {
                changes: {
                  before: previousData,
                  after: userData
                }
              }
            });
          }

          setSelectedUser(prev => ({
            ...prev!,
            ...userData,
            id: docSnapshot.id
          }));
        }
      });

      // Set up real-time listener for activity logs
      const activityLogsRef = collection(db, 'activity_logs');
      const q = query(
        activityLogsRef,
        where('userId', '==', selectedUser.id),
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      setIsLoadingActivities(true);
      const unsubscribeActivities = onSnapshot(q, 
        (snapshot) => {
          const logs: ActivityLog[] = [];
          snapshot.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
            const data = docSnapshot.data();
            logs.push({
              id: docSnapshot.id,
              ...data,
              timestamp: data.timestamp || Timestamp.now()
            } as ActivityLog);
          });
          setActivityLogs(logs);
          setIsLoadingActivities(false);
        }, 
        (error) => {
          console.error('Error listening to activity logs:', error);
          // If the error is about missing index, show a more helpful message
          if (error.message.includes('requires an index')) {
            toast({
              title: "Index Required",
              description: "Please create the required index in Firebase Console to view activity logs.",
              variant: "destructive"
            });
          }
          setIsLoadingActivities(false);
          setActivityLogs([]);
        }
      );

      // Cleanup subscriptions
      return () => {
        unsubscribeUser();
        unsubscribeActivities();
      };
    }
  }, [selectedUser?.id]);

  const refreshActivityLogs = async () => {
    if (!selectedUser) return;
    
    setIsLoadingActivities(true);
    try {
      const activityLogsRef = collection(db, 'activity_logs');
      const q = query(
        activityLogsRef,
        where('userId', '==', selectedUser.id),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      
      const snapshot = await getDocs(q);
      const logs: ActivityLog[] = [];
      snapshot.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
        const data = docSnapshot.data();
        logs.push({
          id: docSnapshot.id,
          ...data,
          timestamp: data.timestamp || Timestamp.now()
        } as ActivityLog);
      });
      setActivityLogs(logs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      // If the error is about missing index, show a more helpful message
      if (error.message.includes('requires an index')) {
        toast({
          title: "Index Required",
          description: "Please create the required index in Firebase Console to view activity logs.",
          variant: "destructive"
        });
      }
      setActivityLogs([]);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  const calculateOverallProgress = (user: User) => {
    if (!user.progress) return 0;
    
    const subjectProgress = user.selectedSubjects.map(subject => {
      const subjectData = user.progress?.[subject.id];
      return subjectData?.overall || 0;
    });
    
    return Math.round(subjectProgress.reduce((acc, curr) => acc + curr, 0) / subjectProgress.length);
  };

  const calculateSubjectProgress = (user: User, subjectId: string) => {
    if (!user.progress?.[subjectId]) return 0;
    
    const subjectData = user.progress[subjectId];
    const topics = Object.values(subjectData.topics || {});
    
    if (topics.length === 0) return 0;
    
    const totalProgress = topics.reduce((acc, topic) => {
      return acc + (topic.completed / topic.total) * 100;
    }, 0);
    
    return Math.round(totalProgress / topics.length);
  };

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-4 w-4" />;
      case 'lesson_complete':
        return <BookOpenCheck className="h-4 w-4" />;
      case 'badge_earned':
        return <Award className="h-4 w-4" />;
      case 'xp_earned':
        return <Star className="h-4 w-4" />;
      case 'content_view':
        return <FileText className="h-4 w-4" />;
      case 'quiz_attempt':
        return <Target className="h-4 w-4" />;
      case 'profile_update':
        return <Settings className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityDescription = (activity: ActivityLog) => {
    switch (activity.type) {
      case 'login':
        return 'Logged in to the platform';
      case 'lesson_complete':
        return `Completed lesson: ${activity.details.lessonName}`;
      case 'badge_earned':
        return `Earned badge: ${activity.details.badgeId}`;
      case 'xp_earned':
        return `Earned ${activity.details.xpAmount} XP`;
      case 'content_view':
        return `Viewed content: ${activity.details.contentId}`;
      case 'quiz_attempt':
        return `Attempted quiz with score: ${activity.details.score}%`;
      case 'profile_update':
        return 'Updated profile information';
      default:
        return 'Performed an action';
    }
  };

  const handleToggleAdmin = async (userId: string, currentAdminStatus: boolean) => {
    try {
      await onToggleAdmin(userId, currentAdminStatus);
      
      // Log the admin status change
      const user = users.find(u => u.id === userId);
      if (user) {
        logActivity({
          userId: user.id,
          userEmail: user.email,
          type: 'profile_update',
          details: {
            changes: {
              adminStatus: !currentAdminStatus
            }
          }
        });
      }
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportUserData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={(value: any) => setRoleFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || user.email}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className={cn(
                          "absolute -bottom-1 -right-1 h-4 w-4 rounded-full p-0",
                          user.grade === 'active' && "bg-green-500",
                          user.grade === 'inactive' && "bg-gray-500",
                          user.grade === 'suspended' && "bg-red-500"
                        )}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {user.name || user.email}
                        </span>
                        <Badge variant={user.grade === 'admin' ? "default" : "secondary"}>
                          {user.grade === 'admin' ? 'Admin' : 'User'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            Joined: {user.createdAt?.toDate().toLocaleDateString()}
                          </span>
                          {user.progress?.lastLoginDate && (
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              Last login: {new Date(user.progress.lastLoginDate).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.id !== currentUserId && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAdmin(user.id, user.grade === 'admin')}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        {user.grade === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setSelectedUser(user);
                          setShowUserDetails(true);
                        }}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction('suspend', user.id)}>
                          Suspend User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction('delete', user.id)}>
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about {selectedUser?.name || selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className="relative">
                      {selectedUser.avatar ? (
                        <img
                          src={selectedUser.avatar}
                          alt={selectedUser.name || selectedUser.email}
                          className="h-20 w-20 rounded-full"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-10 w-10 text-primary" />
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className={cn(
                          "absolute -bottom-1 -right-1 h-5 w-5 rounded-full p-0",
                          selectedUser.grade === 'active' && "bg-green-500",
                          selectedUser.grade === 'inactive' && "bg-gray-500",
                          selectedUser.grade === 'suspended' && "bg-red-500"
                        )}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedUser.name || selectedUser.email}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={selectedUser.grade === 'admin' ? "default" : "secondary"}>
                          {selectedUser.grade === 'admin' ? 'Admin' : 'User'}
                        </Badge>
                        <Badge variant="outline">{selectedUser.grade || 'Active'}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Account Information</h4>
                    <div className="grid gap-2">
                      <div>
                        <Label>Email</Label>
                        <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <p className="text-sm text-muted-foreground">{selectedUser.phoneNumber || 'Not set'}</p>
                      </div>
                      <div>
                        <Label>Account Created</Label>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.createdAt?.toDate().toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <Label>Last Login</Label>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.progress?.lastLoginDate 
                            ? new Date(selectedUser.progress.lastLoginDate).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                              })
                            : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Learning Statistics</h4>
                    {selectedUser?.progress ? (
                      <div className="grid gap-4">
                        <div>
                          <Label>Overall Progress</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress 
                              value={calculateOverallProgress(selectedUser)} 
                              className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground">
                              {calculateOverallProgress(selectedUser)}%
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Completed Lessons</Label>
                            <p className="text-sm text-muted-foreground">
                              {selectedUser.progress.completedLessons?.length || 0} lessons
                            </p>
                          </div>
                          <div>
                            <Label>XP Points</Label>
                            <p className="text-sm text-muted-foreground">
                              {selectedUser.progress.xp} points
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No learning statistics available</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Preferences</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Switch 
                        checked={selectedUser.preferences?.emailNotifications} 
                        disabled
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Push Notifications</Label>
                      <Switch 
                        checked={selectedUser.preferences?.pushNotifications} 
                        disabled
                      />
                    </div>
                    <div>
                      <Label>Theme Preference</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedUser.preferences?.theme || 'System'}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Learning Progress</h4>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Progress
                    </Button>
                  </div>
                  
                  {selectedUser?.progress ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {calculateOverallProgress(selectedUser)}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Across all subjects
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {selectedUser.progress.completedLessons?.length || 0}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Lessons completed
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">XP Points</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {selectedUser.progress.xp}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Total experience earned
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-sm font-medium">Subject Progress</h5>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedUser.selectedSubjects?.map((subject) => {
                            const subjectProgress = calculateSubjectProgress(selectedUser, subject.id);
                            return (
                              <Card key={subject.id}>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm font-medium">{subject.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Overall Progress</span>
                                      <span className="text-sm font-medium">
                                        {subjectProgress}%
                                      </span>
                                    </div>
                                    <Progress value={subjectProgress} className="h-2" />
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Completed Lessons</span>
                                      <span className="text-sm font-medium">
                                        {selectedUser.progress.completedLessons?.filter(
                                          lesson => lesson.startsWith(subject.id)
                                        ).length || 0}
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Completed Lessons</h5>
                        <div className="space-y-2">
                          {selectedUser.progress.completedLessons?.map((lessonId) => {
                            const [subjectId, topicId, lessonName] = lessonId.split('-');
                            const subject = selectedUser.selectedSubjects.find(s => s.id === subjectId);
                            return (
                              <div key={lessonId} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                  <BookOpenCheck className="h-4 w-4" />
                                  <div>
                                    <span className="font-medium">{lessonName.replace(/-/g, ' ')}</span>
                                    <p className="text-xs text-muted-foreground">{subject?.name}</p>
                                  </div>
                                </div>
                                <Badge variant="outline">{topicId.replace(/-/g, ' ')}</Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No progress data available</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Activity History</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={refreshActivityLogs}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Refresh Activity
                    </Button>
                  </div>

                  {isLoadingActivities ? (
                    <div className="flex items-center justify-center p-4">
                      <LoadingSpinner variant="inline" size="md" />
                    </div>
                  ) : activityLogs.length > 0 ? (
                    <div className="space-y-2">
                      {activityLogs.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-2 bg-muted rounded-lg">
                          <div className="flex-shrink-0">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">
                              {getActivityDescription(activity)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.timestamp instanceof Timestamp 
                                ? activity.timestamp.toDate().toLocaleString()
                                : new Date(activity.timestamp).toLocaleString()}
                            </p>
                            {activity.details.subjectId && (
                              <Badge variant="outline" className="mt-1">
                                {activity.details.subjectId}
                              </Badge>
                            )}
                            {activity.details.score && (
                              <Badge variant="outline" className="mt-1 ml-2">
                                Score: {activity.details.score}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-sm text-muted-foreground">No activity data available</p>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={refreshActivityLogs}
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Account Settings</h4>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Account Status</Label>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.grade || 'Active'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change Status
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Role</Label>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.grade === 'admin' ? 'Admin' : 'User'}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleAdmin(selectedUser.id, selectedUser.grade === 'admin')}
                        disabled={selectedUser.id === currentUserId}
                      >
                        {selectedUser.grade === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Delete Account</Label>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete this user's account
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 