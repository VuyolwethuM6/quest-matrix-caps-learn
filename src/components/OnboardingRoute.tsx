import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';

interface OnboardingRouteProps {
  children: React.ReactNode;
}

const OnboardingRoute: React.FC<OnboardingRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { isOnboarded } = useUser();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isOnboarded) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default OnboardingRoute; 