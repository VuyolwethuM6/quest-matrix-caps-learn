import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
  className?: string;
  variant?: 'default' | 'inline';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
  text,
  className,
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = cn(
    'flex items-center justify-center',
    variant === 'default' && fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-md z-50' : 'w-full h-full min-h-[200px]',
    variant === 'inline' && 'inline-flex',
    className
  );

  const spinnerClasses = cn(
    "animate-spin rounded-full border-2 border-quest-primary/20 border-t-quest-primary",
    sizeClasses[size],
    variant === 'inline' && 'border-current'
  );

  return (
    <div className={containerClasses}>
      <div className={cn(
        "flex flex-col items-center justify-center space-y-3",
        variant === 'inline' && 'flex-row space-y-0 space-x-2'
      )}>
        <div className={spinnerClasses} />
        {text && (
          <p className={cn(
            "text-sm font-medium text-muted-foreground animate-pulse",
            variant === 'inline' && 'text-sm'
          )}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;