import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ProgressProvider, useProgress } from "./contexts/ProgressContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LevelUpModal from "./components/LevelUpModal";
import BadgeEarnedModal from "@/components/BadgeEarnedModal";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CurriculumNavigator from "./pages/CurriculumNavigator";
import LearningModule from "./pages/LearningModule";
import QuizPage from "./pages/QuizPage";
import ProfilePage from "./pages/ProfilePage";
import TutorPage from "./pages/TutorPage";
import ExamsPage from "./pages/ExamsPage";
import ExamPage from "./pages/ExamPage";
import TopicsPage from "./pages/TopicsPage";
import TopicPracticePage from "./pages/TopicPracticePage";
import CAPSBuddyPage from "./pages/CAPSBuddyPage";
import BadgesPage from "./pages/BadgesPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

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
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
