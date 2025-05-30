import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Star, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InlineWidget } from 'react-calendly';
import NavBar from '@/components/NavBar';

const InPersonTutoringPage: React.FC = () => {
  const navigate = useNavigate();
  const calendlyUrl = "https://calendly.com/vm-holdings-pty/30min";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/tutor')}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">In-Person Tutoring</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Schedule face-to-face sessions with expert tutors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="grid gap-4 sm:gap-6">
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card className="hover:shadow-sm transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Local Centers</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Convenient locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-sm transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Flexible Schedule</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Book sessions at your convenience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-sm transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Expert Tutors</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Qualified and experienced</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Section */}
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold">Our Locations</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Choose your preferred tutoring center</p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Main Center</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">123 Education Street, Cape Town</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Open: Mon-Fri 8:00 AM - 6:00 PM</p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Northern Branch</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">456 Learning Avenue, Bellville</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Open: Mon-Fri 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Section */}
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold">Book Your Session</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Select your preferred time and location</p>
                </div>
              </div>
              <div className="h-[400px] sm:h-[500px] lg:h-[600px]">
                <InlineWidget
                  url={calendlyUrl}
                  styles={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Why Choose In-Person Tutoring?</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Personal Interaction</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Direct face-to-face learning experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Dedicated Learning Space</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Quiet, focused environment for optimal learning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Immediate Feedback</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Real-time guidance and support
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default InPersonTutoringPage; 