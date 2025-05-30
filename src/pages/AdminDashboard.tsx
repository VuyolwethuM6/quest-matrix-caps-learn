import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, collection, getDocs, updateDoc, query, where, orderBy, limit, setDoc, deleteDoc, serverTimestamp, onSnapshot, Timestamp, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, BookOpen, Settings, LogOut, 
  Activity, BarChart3, UserPlus, BookOpenCheck, 
  GraduationCap, Clock, TrendingUp, AlertCircle,
  AlertTriangle, Info, CheckCircle
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cleanupContent } from '@/scripts/cleanupContent';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QuickStats } from '@/components/admin/QuickStats';
import { ContentManager } from '@/components/admin/ContentManager';
import { UserManager } from '@/components/admin/UserManager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import LoadingSpinner from '@/components/LoadingSpinner';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  grade?: string;
  isAdmin?: boolean;
  isOnboarded?: boolean;
  createdAt?: any;
  updatedAt?: any;
  lastLogin?: any;
  sessionStats?: {
    lastLogin: any;
    lastLogout: any;
    totalSessions: number;
    totalTimeSpent: number; // in minutes
    averageSessionDuration: number; // in minutes
    currentSessionStart?: any;
  };
  selectedSubjects?: Array<{
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

interface RecentActivity {
  id: string;
  email: string;
  isAdmin: boolean;
  lastLogin: Date;
}

interface Progress {
  id: string;
  completed: boolean;
}

interface PlatformStats {
  totalUsers: number;
  totalDocuments: number;
  totalStudyPlans: number;
  totalBadges: number;
  activeUsers: number;
  totalAdmins: number;
  totalContent: number;
  recentActivity: RecentActivity[];
  userGrowth: number;
  completionRate: number;
  systemHealth: {
    userGrowth: number;
    contentCoverage: number;
    systemUptime: number;
  };
}

interface ActivityLog {
  id: string;
  type: 'login' | 'lesson_complete' | 'badge_earned' | 'xp_earned' | 'content_view' | 'quiz_attempt' | 'profile_update' | 'user_update' | 'content_update' | 'system_event';
  userId: string;
  userEmail: string;
  timestamp: Timestamp;
  details: {
    lessonId?: string;
    subjectId?: string;
    topicId?: string;
    subtopicId?: string;
    lessonName?: string;
    subjectName?: string;
    topicName?: string;
    subtopicName?: string;
    xpAmount?: number;
    badgeId?: string;
    score?: number;
    contentId?: string;
    contentType?: string;
    targetUserId?: string;
    newStatus?: string;
    description?: string;
    alertId?: string;
    changes?: any;
  };
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: any;
  status: 'active' | 'resolved' | 'acknowledged';
  priority: 'low' | 'medium' | 'high';
  source: string;
  details?: any;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PlatformStats>({
    totalUsers: 0,
    totalDocuments: 0,
    totalStudyPlans: 0,
    totalBadges: 0,
    activeUsers: 0,
    totalAdmins: 0,
    totalContent: 0,
    recentActivity: [],
    userGrowth: 0,
    completionRate: 0,
    systemHealth: {
      userGrowth: 0,
      contentCoverage: 0,
      systemUptime: 0
    }
  });
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [subtopics, setSubtopics] = useState<any[]>([]);
  const [isCleaning, setIsCleaning] = useState(false);
  const [showCleanupDialog, setShowCleanupDialog] = useState(false);
  const [duplicateCount, setDuplicateCount] = useState({ modules: 0, subjects: 0, quizzes: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  const [alertFilter, setAlertFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [alertPriority, setAlertPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        
        if (!userDoc.exists() || !userData?.isAdmin) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        setIsAdmin(true);
        // Initialize all data fetching
        await Promise.all([
          fetchUsers(),
          fetchPlatformStats(),
          fetchContentBlocks(),
          fetchContentStructure(),
          fetchActivityLogs(),
          fetchSystemAlerts()
        ]);
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast({
          title: "Error",
          description: "Failed to verify admin status. Please try again.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate, toast]);

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(usersData || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
      setUsers([]);
    }
  };

  const fetchPlatformStats = async () => {
    try {
      // Get total users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const totalUsers = usersSnapshot.size;
      const totalAdmins = usersSnapshot.docs.filter(doc => doc.data().isAdmin).length;

      // Get total documents
      const documentsSnapshot = await getDocs(collection(db, 'documents'));
      const totalDocuments = documentsSnapshot.size;

      // Get total study plans
      const studyPlansSnapshot = await getDocs(collection(db, 'studyPlans'));
      const totalStudyPlans = studyPlansSnapshot.size;

      // Get total badges
      const badgesSnapshot = await getDocs(collection(db, 'badges'));
      const totalBadges = badgesSnapshot.size;

      // Get recent activity with session stats
      const recentActivity = usersSnapshot.docs
        .map(doc => {
          const data = doc.data();
          const sessionStats = data.sessionStats || {};
          const lastLogin = sessionStats.lastLogin || data.lastLogin;
          
          // Calculate current session duration if user is currently logged in
          let currentSessionDuration = 0;
          if (sessionStats.currentSessionStart) {
            const startTime = sessionStats.currentSessionStart.toDate();
            const endTime = new Date();
            currentSessionDuration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
          }

          // Calculate total time including current session
          const totalTimeSpent = (sessionStats.totalTimeSpent || 0) + currentSessionDuration;
          
          // Calculate average session duration
          const totalSessions = sessionStats.totalSessions || 1; // Avoid division by zero
          const averageSessionDuration = Math.round(totalTimeSpent / totalSessions);

          return {
            id: doc.id,
            email: data.email || 'Unknown',
            isAdmin: data.isAdmin || false,
            lastLogin: lastLogin,
            sessionStats: {
              totalSessions: sessionStats.totalSessions || 0,
              totalTimeSpent: totalTimeSpent,
              averageSessionDuration: averageSessionDuration,
              currentSessionStart: sessionStats.currentSessionStart
            }
          };
        })
        .sort((a, b) => {
          const dateA = a.lastLogin instanceof Date ? a.lastLogin : new Date(a.lastLogin);
          const dateB = b.lastLogin instanceof Date ? b.lastLogin : new Date(b.lastLogin);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 5);

      // Calculate user growth (example: last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newUsers = usersSnapshot.docs.filter(doc => {
        const createdAt = doc.data().createdAt?.toDate?.() || doc.data().createdAt;
        return createdAt && new Date(createdAt) > thirtyDaysAgo;
      }).length;
      const userGrowth = totalUsers > 0 ? (newUsers / totalUsers) * 100 : 0;

      setStats(prevStats => ({
        ...prevStats,
        totalUsers,
        totalDocuments,
        totalStudyPlans,
        totalBadges,
        totalAdmins,
        activeUsers: totalUsers,
        recentActivity,
        userGrowth,
        completionRate: 0,
        systemHealth: {
          userGrowth,
          contentCoverage: 0,
          systemUptime: 100
        }
      }));
    } catch (error) {
      console.error('Error fetching platform stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch platform statistics. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleAdmin = async (userId: string, currentAdminStatus: boolean) => {
    try {
      if (userId === user?.uid) {
        toast({
          title: "Error",
          description: "You cannot demote yourself from admin.",
          variant: "destructive",
        });
        return;
      }

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        isAdmin: !currentAdminStatus
      });

      // Log the activity
      await logActivity({
        type: 'user_update',
        description: `User ${currentAdminStatus ? 'demoted from' : 'promoted to'} admin`,
        userId: user?.uid,
        userEmail: user?.email,
        details: {
          targetUserId: userId,
          newStatus: !currentAdminStatus
        }
      });

      setUsers(users.map(u => 
        u.id === userId ? { ...u, isAdmin: !currentAdminStatus } : u
      ));

      toast({
        title: "Success",
        description: `User ${currentAdminStatus ? 'demoted from' : 'promoted to'} admin successfully.`,
      });

      await fetchPlatformStats();
    } catch (error) {
      console.error('Error updating admin status:', error);
      toast({
        title: "Error",
        description: "Failed to update admin status.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchContentBlocks = async () => {
    try {
      const contentSnapshot = await getDocs(collection(db, 'modules'));
      const contentData = contentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContentBlocks(contentData || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content blocks.",
        variant: "destructive",
      });
      setContentBlocks([]);
    }
  };

  const fetchContentStructure = async () => {
    try {
      const subjectsSnapshot = await getDocs(collection(db, 'subjects'));
      const subjectsData = subjectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Deduplicate subjects based on id
      const uniqueSubjects = Array.from(
        new Map(subjectsData.map(item => [item.id, item])).values()
      );
      setSubjects(uniqueSubjects || []);

      // If there's a selected subject, fetch its topics
      if (selectedSubject) {
        await handleSubjectChange(selectedSubject);
      }
    } catch (error) {
      console.error('Error fetching content structure:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content structure.",
        variant: "destructive",
      });
      setSubjects([]);
    }
  };

  const handleSubjectChange = async (subjectId: string) => {
    try {
      console.log('Fetching topics for subject:', subjectId);
      // Clear existing topics and subtopics
      setTopics([]);
      setSubtopics([]);
      
      if (!subjectId) return;

      // Update the selected subject
      setSelectedSubject(subjectId);

      // Fetch topics from the correct path
      const topicsRef = collection(db, 'subjects', subjectId, 'topics');
      const topicsSnapshot = await getDocs(topicsRef);
      const topicsData = topicsSnapshot.docs.map(doc => ({
        id: doc.id,
        subjectId: subjectId, // Ensure subjectId is set
        ...doc.data()
      }));

      console.log('Fetched topics:', topicsData);

      // Remove duplicates based on id
      const uniqueTopics = Array.from(
        new Map(topicsData.map(item => [item.id, item])).values()
      );
      setTopics(uniqueTopics || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch topics.",
        variant: "destructive",
      });
      setTopics([]);
    }
  };

  const handleTopicChange = async (topicId: string) => {
    try {
      console.log('Fetching subtopics for topic:', topicId, 'subject:', selectedSubject);
      // Clear existing subtopics
      setSubtopics([]);
      
      if (!topicId || !selectedSubject) {
        console.log('Missing topicId or selectedSubject:', { topicId, selectedSubject });
        return;
      }

      // Fetch subtopics from the correct path
      const subtopicsRef = collection(db, 'subjects', selectedSubject, 'topics', topicId, 'subtopics');
      const subtopicsSnapshot = await getDocs(subtopicsRef);
      const subtopicsData = subtopicsSnapshot.docs.map(doc => ({
        id: doc.id,
        topicId: topicId, // Ensure topicId is set
        ...doc.data()
      }));

      console.log('Fetched subtopics:', subtopicsData);

      // Remove duplicates based on id
      const uniqueSubtopics = Array.from(
        new Map(subtopicsData.map(item => [item.id, item])).values()
      );
      setSubtopics(uniqueSubtopics || []);
    } catch (error) {
      console.error('Error fetching subtopics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subtopics.",
        variant: "destructive",
      });
      setSubtopics([]);
    }
  };

  const handleAddContent = async (content: any) => {
    try {
      const newContentRef = doc(collection(db, 'modules'));
      await setDoc(newContentRef, {
        ...content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Log the activity
      await logActivity({
        type: 'content_update',
        description: 'New content added',
        userId: user?.uid,
        userEmail: user?.email,
        details: {
          contentId: newContentRef.id,
          contentType: content.type,
          subjectId: content.subjectId,
          topicId: content.topicId,
          subtopicId: content.subtopicId
        }
      });

      await fetchContentBlocks();
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: "Error",
        description: "Failed to add content.",
        variant: "destructive",
      });
    }
  };

  const handleEditContent = async (id: string, content: any) => {
    try {
      await updateDoc(doc(db, 'modules', id), {
        ...content,
        updatedAt: serverTimestamp()
      });

      // Log the activity
      await logActivity({
        type: 'content_update',
        description: 'Content updated',
        userId: user?.uid,
        userEmail: user?.email,
        details: {
          contentId: id,
          contentType: content.type,
          subjectId: content.subjectId,
          topicId: content.topicId,
          subtopicId: content.subtopicId
        }
      });

      await fetchContentBlocks();
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'modules', id));

      // Log the activity
      await logActivity({
        type: 'content_update',
        description: 'Content deleted',
        userId: user?.uid,
        userEmail: user?.email,
        details: {
          contentId: id
        }
      });

      await fetchContentBlocks();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content.",
        variant: "destructive",
      });
    }
  };

  const handleAddSubject = async (subject: any) => {
    try {
      const subjectRef = doc(collection(db, 'subjects'));
      await setDoc(subjectRef, {
        ...subject,
        id: subjectRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Log the activity
      await logActivity({
        type: 'content_update',
        description: 'New subject added',
        userId: user?.uid,
        userEmail: user?.email,
        details: {
          subjectId: subjectRef.id,
          subjectName: subject.name
        }
      });

      await fetchContentStructure();
    } catch (error) {
      console.error('Error adding subject:', error);
      throw error;
    }
  };

  const handleAddTopic = async (topic: any) => {
    try {
      const topicRef = doc(collection(db, `subjects/${topic.subjectId}/topics`));
      await setDoc(topicRef, {
        ...topic,
        id: topicRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Log the activity
      await logActivity({
        type: 'content_update',
        description: 'New topic added',
        userId: user?.uid,
        userEmail: user?.email,
        details: {
          topicId: topicRef.id,
          topicName: topic.name,
          subjectId: topic.subjectId
        }
      });

      await fetchContentStructure();
    } catch (error) {
      console.error('Error adding topic:', error);
      throw error;
    }
  };

  const handleAddSubtopic = async (subtopic: any) => {
    try {
      const topic = topics.find(t => t.id === subtopic.topicId);
      if (!topic) throw new Error('Topic not found');

      const subtopicRef = doc(collection(db, `subjects/${topic.subjectId}/topics/${subtopic.topicId}/subtopics`));
      await setDoc(subtopicRef, {
        ...subtopic,
        id: subtopicRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Log the activity
      await logActivity({
        type: 'content_update',
        description: 'New subtopic added',
        userId: user?.uid,
        userEmail: user?.email,
        details: {
          subtopicId: subtopicRef.id,
          subtopicName: subtopic.name,
          topicId: subtopic.topicId,
          subjectId: topic.subjectId
        }
      });

      await fetchContentStructure();
    } catch (error) {
      console.error('Error adding subtopic:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchContentBlocks();
      fetchContentStructure();
      fetchActivityLogs();
      fetchSystemAlerts();
    }
  }, [isAdmin]);

  const analyzeDuplicates = async () => {
    try {
      setIsAnalyzing(true);
      const modulesSnapshot = await getDocs(collection(db, 'modules'));
      const subjectsSnapshot = await getDocs(collection(db, 'subjects'));
      const quizzesSnapshot = await getDocs(collection(db, 'quizzes'));

      const seenContent = new Map();
      const seenSubjects = new Set();
      const seenQuizzes = new Set();

      let duplicateModules = 0;
      let duplicateSubjects = 0;
      let duplicateQuizzes = 0;

      for (const doc of modulesSnapshot.docs) {
        const data = doc.data();
        const contentKey = `${data.subjectId}-${data.topicId}-${data.subtopicId}-${data.id}`;
        if (seenContent.has(contentKey)) {
          duplicateModules++;
        } else {
          seenContent.set(contentKey, doc.id);
        }
      }

      for (const doc of subjectsSnapshot.docs) {
        const data = doc.data();
        if (seenSubjects.has(data.id)) {
          duplicateSubjects++;
        } else {
          seenSubjects.add(data.id);
        }
      }

      for (const doc of quizzesSnapshot.docs) {
        const data = doc.data();
        if (seenQuizzes.has(data.id)) {
          duplicateQuizzes++;
        } else {
          seenQuizzes.add(data.id);
        }
      }

      setDuplicateCount({
        modules: duplicateModules,
        subjects: duplicateSubjects,
        quizzes: duplicateQuizzes
      });
    } catch (error) {
      console.error('Error analyzing duplicates:', error);
      toast({
        title: "Error",
        description: "Failed to analyze duplicate content.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCleanupContent = async () => {
    try {
      setIsCleaning(true);
      await cleanupContent();
      toast({
        title: "Cleanup Complete",
        description: "Duplicate content has been removed.",
      });
      await fetchContentBlocks();
      await fetchContentStructure();
      setShowCleanupDialog(false);
    } catch (error) {
      console.error('Cleanup error:', error);
      toast({
        title: "Cleanup Failed",
        description: "There was an error cleaning up the content.",
        variant: "destructive",
      });
    } finally {
      setIsCleaning(false);
    }
  };

  const fetchActivityLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const logsRef = collection(db, 'activity_logs');
      const q = query(
        logsRef,
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      
      const snapshot = await getDocs(q);
      const logs = await Promise.all(snapshot.docs.map(async (docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
        const data = docSnapshot.data();
        let userEmail = 'Unknown User';
        
        if (data.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', data.userId));
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              userEmail = userData.email || 'Unknown User';
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }

        return {
          id: docSnapshot.id,
          type: data.type || 'profile_update',
          userId: data.userId || '',
          userEmail,
          timestamp: data.timestamp || Timestamp.now(),
          details: {
            ...data.details,
            contentType: data.details?.contentType || '',
            targetUserId: data.details?.targetUserId || '',
            subtopicId: data.details?.subtopicId || '',
            subjectName: data.details?.subjectName || '',
            topicName: data.details?.topicName || '',
            newStatus: data.details?.newStatus || '',
            description: data.details?.description || '',
            alertId: data.details?.alertId || ''
          }
        } as ActivityLog;
      }));

      setActivityLogs(logs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch activity logs. Please try again.",
        variant: "destructive",
      });
      setActivityLogs([]);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const fetchSystemAlerts = async () => {
    try {
      setIsLoadingAlerts(true);
      const alertsRef = collection(db, 'system_alerts');
      const q = query(alertsRef, orderBy('timestamp', 'desc'));
      const alertsSnapshot = await getDocs(q);
      
      const alerts = alertsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type || 'info',
          title: data.title || 'Untitled Alert',
          message: data.message || '',
          timestamp: data.timestamp || Timestamp.now(),
          status: data.status || 'active',
          priority: data.priority || 'low',
          source: data.source || 'system',
          details: data.details || {}
        } as SystemAlert;
      });

      setSystemAlerts(alerts);
    } catch (error) {
      console.error('Error fetching system alerts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch system alerts. Please try again.",
        variant: "destructive",
      });
      setSystemAlerts([]);
    } finally {
      setIsLoadingAlerts(false);
    }
  };

  const updateAlertStatus = async (alertId: string, newStatus: SystemAlert['status']) => {
    try {
      const alertRef = doc(db, 'system_alerts', alertId);
      await updateDoc(alertRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });

      // Log the activity
      await logActivity({
        type: 'system_event',
        userId: user?.uid || '',
        userEmail: user?.email || '',
        details: {
          description: `Alert ${newStatus}`,
          alertId,
          newStatus
        }
      });

      await fetchSystemAlerts();
    } catch (error) {
      console.error('Error updating alert status:', error);
      toast({
        title: "Error",
        description: "Failed to update alert status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const logActivity = async (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    try {
      const logRef = doc(collection(db, 'activity_logs'));
      await setDoc(logRef, {
        ...activity,
        timestamp: serverTimestamp()
      });
      await fetchActivityLogs(); // Refresh the activity logs
    } catch (error) {
      console.error('Error logging activity:', error);
      toast({
        title: "Error",
        description: "Failed to log activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'Never';
    
    try {
      if (date instanceof Timestamp) {
        return date.toDate().toLocaleString();
      }
      if (date instanceof Date) {
        return date.toLocaleString();
      }
      if (typeof date === 'string') {
        return new Date(date).toLocaleString();
      }
      if (typeof date === 'number') {
        return new Date(date).toLocaleString();
      }
      return 'Invalid date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const updateUserSession = async (userId: string, isLogin: boolean) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      const now = serverTimestamp();
      const sessionStats = userData?.sessionStats || {
        totalSessions: 0,
        totalTimeSpent: 0,
        averageSessionDuration: 0
      };

      if (isLogin) {
        // User is logging in
        await updateDoc(userRef, {
          lastLogin: now,
          'sessionStats.lastLogin': now,
          'sessionStats.currentSessionStart': now,
          'sessionStats.totalSessions': (sessionStats.totalSessions || 0) + 1
        });

        // Log the activity
        await logActivity({
          type: 'login',
          userId: userId,
          userEmail: userData?.email || 'Unknown',
          details: {
            description: 'User logged in'
          }
        });
      } else {
        // User is logging out
        const currentSessionStart = sessionStats.currentSessionStart;
        let sessionDuration = 0;

        if (currentSessionStart) {
          const startTime = currentSessionStart.toDate();
          const endTime = new Date();
          sessionDuration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // Convert to minutes
        }

        const newTotalTime = (sessionStats.totalTimeSpent || 0) + sessionDuration;
        const newAverageDuration = sessionStats.totalSessions > 0 
          ? Math.round(newTotalTime / sessionStats.totalSessions) 
          : sessionDuration;

        await updateDoc(userRef, {
          'sessionStats.lastLogout': now,
          'sessionStats.totalTimeSpent': newTotalTime,
          'sessionStats.averageSessionDuration': newAverageDuration,
          'sessionStats.currentSessionStart': null
        });

        // Log the activity
        await logActivity({
          type: 'system_event',
          userId: userId,
          userEmail: userData?.email || 'Unknown',
          details: {
            description: 'User logged out',
            sessionDuration
          }
        });
      }
    } catch (error) {
      console.error('Error updating user session:', error);
    }
  };

  const formatDuration = (minutes: number) => {
    if (!minutes || isNaN(minutes)) return '0m';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-quest-primary">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuickStats stats={stats} />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content">
              <BookOpen className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Activity className="mr-2 h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <AlertCircle className="mr-2 h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {stats.recentActivity?.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{activity.email}</p>
                            <p className="text-sm text-muted-foreground">
                              Last login: {formatDate(activity.lastLogin)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Total time: {formatDuration(activity.sessionStats?.totalTimeSpent || 0)}
                              {' • '}
                              Avg. session: {formatDuration(activity.sessionStats?.averageSessionDuration || 0)}
                            </p>
                          </div>
                          <Badge variant={activity.isAdmin ? "default" : "secondary"}>
                            {activity.isAdmin ? 'Admin' : 'User'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">User Growth</span>
                        <span className="text-sm text-muted-foreground">{stats.userGrowth.toFixed(1)}%</span>
                      </div>
                      <Progress value={stats.userGrowth} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Content Coverage</span>
                        <span className="text-sm text-muted-foreground">{stats.systemHealth.contentCoverage.toFixed(1)}%</span>
                      </div>
                      <Progress value={stats.systemHealth.contentCoverage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">System Uptime</span>
                        <span className="text-sm text-muted-foreground">{stats.systemHealth.systemUptime.toFixed(1)}%</span>
                      </div>
                      <Progress value={stats.systemHealth.systemUptime} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManager
              users={users}
              onToggleAdmin={handleToggleAdmin}
              currentUserId={user?.uid || ''}
            />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager
              contentBlocks={contentBlocks}
              subjects={subjects}
              topics={topics}
              subtopics={subtopics}
              onAddContent={handleAddContent}
              onEditContent={handleEditContent}
              onDeleteContent={handleDeleteContent}
              onSubjectChange={handleSubjectChange}
              onTopicChange={handleTopicChange}
              onAddSubject={handleAddSubject}
              onAddTopic={handleAddTopic}
              onAddSubtopic={handleAddSubtopic}
            />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>Monitor user activity and system events</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={fetchActivityLogs}
                    disabled={isLoadingLogs}
                  >
                    {isLoadingLogs ? 'Refreshing...' : 'Refresh'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {isLoadingLogs ? (
                    <LoadingSpinner variant="inline" text="Loading activity logs..." />
                  ) : !activityLogs?.length ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No activity logs found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activityLogs.map((log) => (
                        <div 
                          key={log.id} 
                          className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            {log.type === 'login' && <Users className="h-5 w-5" />}
                            {log.type === 'lesson_complete' && <BookOpen className="h-5 w-5" />}
                            {log.type === 'badge_earned' && <BookOpenCheck className="h-5 w-5" />}
                            {log.type === 'xp_earned' && <GraduationCap className="h-5 w-5" />}
                            {log.type === 'content_view' && <BookOpen className="h-5 w-5" />}
                            {log.type === 'quiz_attempt' && <BarChart3 className="h-5 w-5" />}
                            {log.type === 'profile_update' && <UserPlus className="h-5 w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{log.details?.description || 'No description'}</span>
                              <Badge variant="outline">
                                {log.type?.replace('_', ' ') || 'Unknown'}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {log.userEmail && (
                                <span className="mr-2">By: {log.userEmail}</span>
                              )}
                              <span>
                                {formatDate(log.timestamp)}
                              </span>
                            </div>
                            {log.details && Object.keys(log.details).length > 0 && (
                              <div className="mt-2 text-sm">
                                <pre className="bg-background p-2 rounded">
                                  {JSON.stringify(log.details, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>View and manage system alerts and notifications</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={alertFilter}
                      onValueChange={(value: 'all' | 'active' | 'resolved') => setAlertFilter(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Alerts</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={alertPriority}
                      onValueChange={(value: 'all' | 'low' | 'medium' | 'high') => setAlertPriority(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      onClick={fetchSystemAlerts}
                      disabled={isLoadingAlerts}
                    >
                      {isLoadingAlerts ? 'Refreshing...' : 'Refresh'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {isLoadingAlerts ? (
                    <LoadingSpinner variant="inline" text="Loading alerts..." />
                  ) : !systemAlerts?.length ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No system alerts found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {systemAlerts
                        .filter(alert => {
                          if (!alert) return false;
                          if (alertFilter === 'all') return true;
                          return alert.status === alertFilter;
                        })
                        .filter(alert => {
                          if (!alert) return false;
                          if (alertPriority === 'all') return true;
                          return alert.priority === alertPriority;
                        })
                        .map((alert) => (
                          <div 
                            key={alert.id} 
                            className={cn(
                              "flex items-start gap-4 p-4 rounded-lg border",
                              alert.type === 'error' && "bg-red-50 border-red-200",
                              alert.type === 'warning' && "bg-yellow-50 border-yellow-200",
                              alert.type === 'info' && "bg-blue-50 border-blue-200",
                              alert.type === 'success' && "bg-green-50 border-green-200"
                            )}
                          >
                            <div className="flex-shrink-0">
                              {alert.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                              {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                              {alert.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                              {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{alert.title || 'Untitled Alert'}</span>
                                  <Badge 
                                    variant="outline"
                                    className={cn(
                                      alert.priority === 'high' && "border-red-200 text-red-700",
                                      alert.priority === 'medium' && "border-yellow-200 text-yellow-700",
                                      alert.priority === 'low' && "border-green-200 text-green-700"
                                    )}
                                  >
                                    {alert.priority || 'low'}
                                  </Badge>
                                  <Badge 
                                    variant="outline"
                                    className={cn(
                                      alert.status === 'active' && "border-blue-200 text-blue-700",
                                      alert.status === 'resolved' && "border-green-200 text-green-700",
                                      alert.status === 'acknowledged' && "border-gray-200 text-gray-700"
                                    )}
                                  >
                                    {alert.status || 'active'}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  {alert.status === 'active' && (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateAlertStatus(alert.id, 'acknowledged')}
                                      >
                                        Acknowledge
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateAlertStatus(alert.id, 'resolved')}
                                      >
                                        Resolve
                                      </Button>
                                    </>
                                  )}
                                  {alert.status === 'acknowledged' && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => updateAlertStatus(alert.id, 'resolved')}
                                    >
                                      Resolve
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{alert.message || 'No message'}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Source: {alert.source || 'system'}</span>
                                <span>{formatDate(alert.timestamp)}</span>
                              </div>
                              {alert.details && Object.keys(alert.details).length > 0 && (
                                <div className="mt-2 text-sm">
                                  <pre className="bg-background p-2 rounded">
                                    {JSON.stringify(alert.details, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Clean up duplicate content in the database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={() => {
                      analyzeDuplicates();
                      setShowCleanupDialog(true);
                    }}
                    disabled={isCleaning || isAnalyzing}
                    variant="destructive"
                    className="w-full"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Clean Up Duplicates'}
                  </Button>

                  <AlertDialog open={showCleanupDialog} onOpenChange={setShowCleanupDialog}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clean Up Duplicate Content</AlertDialogTitle>
                        <AlertDialogDescription>
                          {isAnalyzing ? (
                            <div className="flex items-center justify-center py-4">
                              <LoadingSpinner variant="inline" size="md" />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p>The following duplicates were found:</p>
                              <ul className="list-disc pl-4">
                                <li>{duplicateCount.modules} duplicate modules</li>
                                <li>{duplicateCount.subjects} duplicate subjects</li>
                                <li>{duplicateCount.quizzes} duplicate quizzes</li>
                              </ul>
                              <p className="text-sm text-muted-foreground mt-2">
                                This action cannot be undone. Would you like to proceed with the cleanup?
                              </p>
                            </div>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleCleanupContent}
                          disabled={isCleaning || isAnalyzing}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isCleaning ? 'Cleaning Up...' : 'Proceed with Cleanup'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard; 