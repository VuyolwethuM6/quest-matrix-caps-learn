import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
  text = 'Loading...',
  className
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = cn(
    'flex items-center justify-center',
    fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50' : 'w-full h-full min-h-[200px]',
    className
  );

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className={cn(
          "animate-spin rounded-full border-b-2 border-quest-primary",
          sizeClasses[size]
        )} />
        {text && (
          <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 