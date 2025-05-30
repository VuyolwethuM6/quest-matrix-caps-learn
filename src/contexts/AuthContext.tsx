import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Update last login time when auth state changes to logged in
        try {
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            lastLogin: serverTimestamp(),
            'sessionStats.lastLogin': serverTimestamp(),
            'sessionStats.currentSessionStart': serverTimestamp(),
            'sessionStats.totalSessions': increment(1)
          });
        } catch (error) {
          console.error('Error updating last login:', error);
        }
      }
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      const userRef = doc(db, 'users', userCredential.user.uid);
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        'sessionStats.lastLogin': serverTimestamp(),
        'sessionStats.currentSessionStart': serverTimestamp(),
        'sessionStats.totalSessions': increment(1)
      });

      return userCredential;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create a new user document in Firestore with initial session stats
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isOnboarded: false,
        isAdmin: false,
        sessionStats: {
          lastLogin: serverTimestamp(),
          lastLogout: null,
          totalSessions: 1,
          totalTimeSpent: 0,
          averageSessionDuration: 0,
          currentSessionStart: serverTimestamp()
        }
      });
      
      return userCredential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        // Update session stats before logging out
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        const sessionStats = userData?.sessionStats || {};
        const currentSessionStart = sessionStats.currentSessionStart;

        if (currentSessionStart) {
          const startTime = currentSessionStart.toDate();
          const endTime = new Date();
          const sessionDuration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // Convert to minutes

          const newTotalTime = (sessionStats.totalTimeSpent || 0) + sessionDuration;
          const newAverageDuration = sessionStats.totalSessions > 0 
            ? Math.round(newTotalTime / sessionStats.totalSessions) 
            : sessionDuration;

          await updateDoc(userRef, {
            'sessionStats.lastLogout': serverTimestamp(),
            'sessionStats.totalTimeSpent': newTotalTime,
            'sessionStats.averageSessionDuration': newAverageDuration,
            'sessionStats.currentSessionStart': null
          });
        }
      }
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if this is a new user
      const isNewUser = (result as any).additionalUserInfo?.isNewUser;
      if (isNewUser) {
        // Create a new user document in Firestore with initial session stats
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          isOnboarded: false,
          sessionStats: {
            lastLogin: serverTimestamp(),
            lastLogout: null,
            totalSessions: 1,
            totalTimeSpent: 0,
            averageSessionDuration: 0,
            currentSessionStart: serverTimestamp()
          }
        });
      } else {
        // Update last login time for existing users
        const userRef = doc(db, 'users', result.user.uid);
        await updateDoc(userRef, {
          lastLogin: serverTimestamp(),
          'sessionStats.lastLogin': serverTimestamp(),
          'sessionStats.currentSessionStart': serverTimestamp(),
          'sessionStats.totalSessions': increment(1)
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 