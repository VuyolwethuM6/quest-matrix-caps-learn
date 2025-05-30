import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { UserProvider } from "./contexts/UserContext";
import { ProgressProvider, useProgress } from "./contexts/ProgressContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LevelUpModal from "./components/LevelUpModal";
import BadgeEarnedModal from "@/components/BadgeEarnedModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import SEO from "@/components/SEO";

// Lazy load pages
const SplashScreen = lazy(() => import("./pages/SplashScreen"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CurriculumNavigator = lazy(() => import("./pages/CurriculumNavigator"));
const LearningModule = lazy(() => import("./pages/LearningModule"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const TutorPage = lazy(() => import("./pages/TutorPage"));
const ExamsPage = lazy(() => import("./pages/ExamsPage"));
const ExamPage = lazy(() => import("./pages/ExamPage"));
const TopicsPage = lazy(() => import("./pages/TopicsPage"));
const TopicPracticePage = lazy(() => import("./pages/TopicPracticePage"));
const CAPSBuddyPage = lazy(() => import("./pages/CAPSBuddyPage"));
const BadgesPage = lazy(() => import("./pages/BadgesPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppContent = () => {
  const { 
    showLevelUp, 
    setShowLevelUp, 
    newLevel,
    showBadgeEarned,
    setShowBadgeEarned,
    newBadgeId 
  } = useProgress();

  return (
    <TooltipProvider>
      <SEO />
      <Toaster />
      <Sonner />
      <LevelUpModal 
        isOpen={showLevelUp} 
        onClose={() => setShowLevelUp(false)} 
        newLevel={newLevel}
      />
      <BadgeEarnedModal
        isOpen={showBadgeEarned}
        onClose={() => setShowBadgeEarned(false)}
        badgeId={newBadgeId || ''}
      />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/curriculum" element={<ProtectedRoute><CurriculumNavigator /></ProtectedRoute>} />
            <Route path="/learn/:subjectId/:topicId/:subtopicId" element={<ProtectedRoute><LearningModule /></ProtectedRoute>} />
            <Route path="/quiz/:subjectId/:topicId/:subtopicId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/tutor" element={<ProtectedRoute><TutorPage /></ProtectedRoute>} />
            <Route path="/badges" element={<ProtectedRoute><BadgesPage /></ProtectedRoute>} />
            <Route path="/exams" element={<ProtectedRoute><ExamsPage /></ProtectedRoute>} />
            <Route path="/exam/:examId" element={<ProtectedRoute><ExamPage /></ProtectedRoute>} />
            <Route path="/topics" element={<ProtectedRoute><TopicsPage /></ProtectedRoute>} />
            <Route path="/topic-practice/:practiceId" element={<ProtectedRoute><TopicPracticePage /></ProtectedRoute>} />
            <Route path="/caps-buddy" element={<ProtectedRoute><CAPSBuddyPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <HelmetProvider>
    {import.meta.env.PROD && <Analytics />}
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <ProgressProvider>
              <AppContent />
            </ProgressProvider>
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
