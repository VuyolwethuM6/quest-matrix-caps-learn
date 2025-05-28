import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface ActivityLogData {
  userId: string;
  userEmail: string;
  type: 'login' | 'lesson_complete' | 'badge_earned' | 'xp_earned' | 'content_view' | 'quiz_attempt' | 'profile_update';
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

export const logActivity = async (data: ActivityLogData) => {
  try {
    const activityLogsRef = collection(db, 'activity_logs');
    await addDoc(activityLogsRef, {
      ...data,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}; 