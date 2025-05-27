import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CurriculumNavigator from "./pages/CurriculumNavigator";
import LearningModule from "./pages/LearningModule";
import QuizPage from "./pages/QuizPage";
import ProfilePage from "./pages/ProfilePage";
import BadgesPage from "./pages/BadgesPage";
import ExamsPage from "./pages/ExamsPage";
import ExamPage from "./pages/ExamPage";
import CAPSBuddyPage from "./pages/CAPSBuddyPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <ProgressProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/curriculum" element={<ProtectedRoute><CurriculumNavigator /></ProtectedRoute>} />
                <Route path="/learn/:subjectId/:topicId/:subtopicId" element={<ProtectedRoute><LearningModule /></ProtectedRoute>} />
                <Route path="/quiz/:subjectId/:topicId/:subtopicId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/badges" element={<ProtectedRoute><BadgesPage /></ProtectedRoute>} />
                <Route path="/exams" element={<ProtectedRoute><ExamsPage /></ProtectedRoute>} />
                <Route path="/exam/:examId" element={<ProtectedRoute><ExamPage /></ProtectedRoute>} />
                <Route path="/caps-buddy" element={<ProtectedRoute><CAPSBuddyPage /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProgressProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
