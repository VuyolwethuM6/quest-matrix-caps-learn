import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ProgressSteps from './ProgressSteps'; // Import ProgressSteps
import { ArrowLeft, ArrowRight, GraduationCap, Calendar, MapPin, CreditCard } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FORM_STEPS = [
  'Person Info',
  'Sub Selection',
  'Marks',
  'Review'
];

const SUBJECTS = [
  { id: 'mathematics', name: 'Mathematics', schedule: 'Monday & Wednesday, 09:00-11:00' },
  { id: 'physics', name: 'Physics', schedule: 'Tuesday & Thursday, 09:00-11:00' },
  { id: 'chemistry', name: 'Maths Literacy', schedule: 'Monday & Wednesday, 11:00-13:00' },
  { id: 'biology', name: 'Life Sciences', schedule: 'Tuesday & Thursday, 11:00-13:00' }
];

const VENUE_ADDRESS = "16 T Mfelane Street";

const ACCOUNT_DETAILS = {
  bankName: "Capitec Bank",
  accountHolder: "Mr V Mabhuleka",
  accountNumber: "1614497182",
  branchCode: "0733913206",
  reference: "Student Name + Subject"
};

const COST_PER_SUBJECT = 400; // R400 per subject

interface SubjectMarks {
  currentMarks: string;
  targetMarks: string;
}

type MarksData = {
  [key: string]: SubjectMarks;
};

const StudentIntakeForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    guardianName: '', 
    guardianContact: '',
    selectedSubjects: [] as string[],
    marks: {} as MarksData,
    paymentDate: '',
    
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subjectId: string) => {
    setFormData(prev => {
      const currentSubjects = prev.selectedSubjects;
      const isSelected = currentSubjects.includes(subjectId);
      
      const updatedSubjects = isSelected
        ? currentSubjects.filter(id => id !== subjectId)
        : [...currentSubjects, subjectId];
      
      return { ...prev, selectedSubjects: updatedSubjects };
    });
  };

  const handleMarksChange = (subjectId: string, field: 'currentMarks' | 'targetMarks', value: string) => {
    setFormData(prev => ({
      ...prev,
      marks: {
        ...prev.marks,
        [subjectId]: {
          ...prev.marks[subjectId],
          [field]: value
        }
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Use the correct API endpoint based on environment
      const apiUrl = import.meta.env.PROD 
        ? '/api/submit-application'  // Production URL
        : '/api/submit-application'; // Development URL (Vite proxy will handle this)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subjects: SUBJECTS, // Include subjects data
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to submit application');
      }

      setSubmitSuccess(true);
      // Redirect to success page after a short delay
      setTimeout(() => {
        navigate('/success');
      }, 1500);
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitError(err instanceof Error ? err.message : 'An error occurred while submitting your application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalCost = () => {
    return formData.selectedSubjects.length * COST_PER_SUBJECT;
  };

  const getPaymentReference = () => {
    return `${formData.firstName} ${formData.lastName}`;
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.school;
      case 2:
        return formData.selectedSubjects.length > 0;
      case 3:
        return formData.selectedSubjects.every(subject => 
          formData.marks[subject]?.currentMarks && 
          formData.marks[subject]?.targetMarks
        );
      case 4:
        return formData.paymentDate !== '';
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 bg-background text-foreground">
      {/* Branding */}
      <div className="flex justify-center">
        <img 
          src="/viva-logo.png" // Updated logo path
          alt="Logo" 
          className="w-25 h-25"
        />
      </div>

      <div className="w-full max-w-3xl space-y-10 px-4">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-foreground">
            Student Upgrade Form
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <i>Please fill in your details, select the subjects you wish to upgrade (Physics, Mathematics, Maths Lit, or Life Sciences), and provide your current and desired marks. This will help us assist you in achieving your academic goals.</i>
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps steps={FORM_STEPS} currentStep={currentStep} />

        {/* Form Card */}
        <Card className="p-8 glass">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your contact number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School Name</Label>
                  <Input
                    id="school"
                    name="school"
                    placeholder="Enter your school name"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">Parent/Guardian Name</Label>
                  <Input
                    id="guardianName"
                    name="guardianName"
                    placeholder="Enter parent/guardian name"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianContact">Parent/Guardian Contact</Label>
                  <Input
                    id="guardianContact"
                    name="guardianContact"
                    type="tel"
                    placeholder="Enter parent/guardian contact number"
                    value={formData.guardianContact}
                    onChange={handleInputChange}
                    className="bg-secondary/50"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Select Subjects for Upgrade</Label>
                  <p className="text-muted-foreground">Choose the subjects you want to improve</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SUBJECTS.map((subject) => (
                      <div
                        key={subject.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          formData.selectedSubjects.includes(subject.id)
                            ? 'border-quest-purple bg-quest-purple/10' // Using quest.purple
                            : 'border-border hover:border-quest-purple/50' // Using quest.purple
                        }`}
                      >
                        <RadioGroup
                          value={formData.selectedSubjects.includes(subject.id) ? subject.id : ""}
                          onValueChange={() => handleSubjectChange(subject.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={subject.id} id={subject.id} />
                            <Label htmlFor={subject.id} className="cursor-pointer">
                              {subject.name}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Enter Your Marks</Label>
                  <p className="text-muted-foreground">For each selected subject, enter your current marks and target marks</p>
                  <div className="grid gap-6">
                    {formData.selectedSubjects.map((subjectId) => {
                      const subject = SUBJECTS.find(s => s.id === subjectId);
                      return (
                        <div key={subjectId} className="p-4 rounded-lg border border-border">
                          <Label className="text-base mb-4 block">{subject?.name}</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`current-${subjectId}`}>Current Marks (%)</Label>
                              <Input
                                id={`current-${subjectId}`}
                                type="number"
                                min="0"
                                max="100"
                                value={formData.marks[subjectId]?.currentMarks || ''}
                                onChange={(e) => handleMarksChange(subjectId, 'currentMarks', e.target.value)}
                                className="bg-secondary/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`target-${subjectId}`}>Target Marks (%)</Label>
                              <Input
                                id={`target-${subjectId}`}
                                type="number"
                                min="0"
                                max="100"
                                value={formData.marks[subjectId]?.targetMarks || ''}
                                onChange={(e) => handleMarksChange(subjectId, 'targetMarks', e.target.value)}
                                className="bg-secondary/50"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Your Information</h3>
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-quest-purple">Personal Information</h4> {/* Using quest.purple */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <p><span className="text-muted-foreground">Name:</span> {formData.firstName} {formData.lastName}</p>
                          <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                          <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                          <p><span className="text-muted-foreground">School:</span> {formData.school}</p>
                          <p><span className="text-muted-foreground">Guardian Contact:</span> {formData.guardianContact}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-quest-purple">Selected Subjects and Marks</h4> {/* Using quest.purple */}
                        <div className="grid gap-4">
                          {formData.selectedSubjects.map((subjectId) => {
                            const subject = SUBJECTS.find(s => s.id === subjectId);
                            const marks = formData.marks[subjectId];
                            return (
                              <div key={subjectId} className="p-4 rounded-lg border border-border">
                                <p className="font-medium mb-2">{subject?.name}</p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <p><span className="text-muted-foreground">Current Marks:</span> {marks?.currentMarks}%</p>
                                  <p><span className="text-muted-foreground">Target Marks:</span> {marks?.targetMarks}%</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Venue Card */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-quest-purple">Venue Information</h4> {/* Using quest.purple */}
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-quest-purple flex-shrink-0 mt-0.5" /> {/* Using quest.purple */}
                            <div>
                              <h5 className="font-medium">VTS Academy</h5>
                              <p className="text-sm text-muted-foreground">{VENUE_ADDRESS}</p>
                              <p className="text-xs text-muted-foreground mt-2">All classes and assessments will be held at this venue.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Class Schedule */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-quest-purple">Class Schedule</h4> {/* Using quest.purple */}
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left pb-2">Subject</th>
                                <th className="text-left pb-2">Schedule</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.selectedSubjects.map((subjectId) => {
                                const subject = SUBJECTS.find(s => s.id === subjectId);
                                return (
                                  <tr key={subjectId} className="border-b border-border/50">
                                    <td className="py-2">{subject?.name}</td>
                                    <td className="py-2">{subject?.schedule}</td>
                                  </tr>
                                );
                              })}
                              {/* Friday Assessment Row */}
                              <tr>
                                <td className="py-3 font-medium text-quest-purple">Friday Assessments</td> {/* Using quest.purple */}
                                <td className="py-3">
                                  {formData.selectedSubjects.length > 0 ? (
                                    <div className="flex flex-col space-y-2">
                                      <p className="text-sm text-muted-foreground mb-1">We will be writing on the selected subjects:</p>
                                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                        {formData.selectedSubjects.map((subjectId) => {
                                          const subject = SUBJECTS.find(s => s.id === subjectId);
                                          return subject ? <li key={subjectId} className="text-white">{subject.name}</li> : null;
                                        })}
                                      </ul>
                                      <p className="text-xs text-muted-foreground">Friday, 09:00-11:00</p>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">No subjects selected</p>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {/* Cost Calculation Section */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-quest-purple">Cost Summary</h4> {/* Using quest.purple */}
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <div className="space-y-2">
                            {formData.selectedSubjects.map((subjectId) => {
                              const subject = SUBJECTS.find(s => s.id === subjectId);
                              return (
                                <div key={subjectId} className="flex justify-between">
                                  <span>{subject?.name}</span>
                                  <span>R{COST_PER_SUBJECT}</span>
                                </div>
                              );
                            })}
                            <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium">
                              <span>Total Cost</span>
                              <span>R{calculateTotalCost()}</span>
                            </div>
                          </div>
                          
                          {/* Account Details */}
                          <div className="mt-6 space-y-4">
                            <div className="flex items-start space-x-3">
                              <CreditCard className="h-5 w-5 text-quest-purple flex-shrink-0 mt-0.5" /> {/* Using quest.purple */}
                              <div>
                                <h5 className="font-medium">Payment Information</h5>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Please make payment to the following account:
                                </p>
                              </div>
                            </div>
                            
                            <div className="bg-secondary/30 rounded-lg p-4 border border-border/70">
                              <table className="w-full text-sm">
                                <tbody>
                                  <tr>
                                    <td className="py-1 text-muted-foreground">Bank:</td>
                                    <td className="py-1 font-medium">{ACCOUNT_DETAILS.bankName}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-muted-foreground">Account Holder:</td>
                                    <td className="py-1 font-medium">{ACCOUNT_DETAILS.accountHolder}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-muted-foreground">Account Number:</td>
                                    <td className="py-1 font-medium">{ACCOUNT_DETAILS.accountNumber}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-muted-foreground">Phone Number:</td>
                                    <td className="py-1 font-medium">{ACCOUNT_DETAILS.branchCode}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-muted-foreground">Reference:</td>
                                    <td className="py-1 font-medium">{getPaymentReference()}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              Please use your name as a reference when making the payment. After payment, please email proof of payment to <span className="font-medium">payments@vtsacademy.co.za</span>.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Date Section */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-quest-purple">Payment Date</h4> {/* Using quest.purple */}
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <div className="space-y-4">
                            <p className="text-sm">Please select a date when you will be able to make the payment:</p>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-5 w-5 text-muted-foreground" />
                              <Input
                                type="date"
                                name="paymentDate"
                                value={formData.paymentDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="bg-secondary/50"
                                required
                              />
                            </div>
                            {formData.paymentDate && (
                              <p className="text-sm">Payment scheduled for: <span className="font-medium">{new Date(formData.paymentDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="w-[120px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {currentStep === FORM_STEPS.length ? (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isSubmitting}
                  className="w-[120px] bg-quest-purple hover:bg-quest-secondary text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="w-[120px] bg-quest-purple hover:bg-quest-secondary text-white" // Using quest.purple and quest.secondary
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            {submitError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                Your application has been submitted successfully! We will contact you shortly.
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default StudentIntakeForm;