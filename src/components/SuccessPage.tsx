import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 bg-background text-foreground">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <img 
            src="/viva-logo.png"
            alt="Logo" 
            className="w-25 h-25"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground">
            Application Submitted Successfully!
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Thank you for submitting your application to Viva Tutoring. We have received your details and will contact you shortly.
          </p>

          <div className="pt-6">
            <Link to="/">
              <Button 
                className="w-full bg-quest-purple hover:bg-quest-secondary text-white"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 