
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ProgressProvider } from "./contexts/ProgressContext";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CurriculumNavigator from "./pages/CurriculumNavigator";
import LearningModule from "./pages/LearningModule";
import QuizPage from "./pages/QuizPage";
import ProfilePage from "./pages/ProfilePage";
import BadgesPage from "./pages/BadgesPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <ProgressProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/curriculum" element={<CurriculumNavigator />} />
              <Route path="/learn/:subjectId/:topicId/:subtopicId" element={<LearningModule />} />
              <Route path="/quiz/:subjectId/:topicId/:subtopicId" element={<QuizPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/badges" element={<BadgesPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProgressProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
