import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast'; // Assuming useToast hook exists
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserPlus, ShieldCheck, Hourglass, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Invite Co-holder', icon: UserPlus, description: 'Enter the email of the person you want to share this account with.' },
  { id: 2, title: 'Your Verification', icon: ShieldCheck, description: 'Confirm your identity to proceed.' },
  { id: 3, title: 'Awaiting Co-holder', icon: Hourglass, description: 'Waiting for the co-holder to accept and verify.' },
  { id: 4, title: 'Finalize Terms', icon: CheckCircle2, description: 'Review and agree to the joint account terms.' },
] as const;

type StepId = typeof STEPS[number]['id'];

interface JointAccountSetupStepperProps {
  onComplete: (formData: Record<string, any>) => void; // Callback when setup is complete
}

const JointAccountSetupStepper: React.FC<JointAccountSetupStepperProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [formData, setFormData] = useState({ coholderEmail: '', termsAgreed: false });
  const { toast } = useToast(); // Initialize toast

  console.log("Rendering JointAccountSetupStepper, current step:", currentStep);

  const handleNext = () => {
    console.log("Next button clicked, current step:", currentStep, "Form data:", formData);
    if (currentStep === 1 && !formData.coholderEmail) {
        toast({ title: "Error", description: "Please enter co-holder's email.", variant: "destructive" });
        return;
    }
    // Add more validation per step if needed

    if (currentStep === STEPS.length) {
      if (!formData.termsAgreed && currentStep === 4) {
        toast({ title: "Error", description: "Please agree to the terms and conditions.", variant: "destructive" });
        return;
      }
      console.log("Stepper completed. Final data:", formData);
      toast({ title: "Success!", description: "Joint account setup initiated!" });
      onComplete(formData);
    } else {
      setCurrentStep(prev => (prev + 1) as StepId);
      if (currentStep === 1) { // After sending invitation
         toast({ title: "Invitation Sent", description: `Invitation sent to ${formData.coholderEmail}.` });
      }
    }
  };

  const handleBack = () => {
    console.log("Back button clicked, current step:", currentStep);
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1) as StepId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const progressValue = (currentStep / STEPS.length) * 100;
  const activeStepInfo = STEPS.find(s => s.id === currentStep);
  const ActiveIcon = activeStepInfo?.icon || UserPlus;

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
            <ActiveIcon className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">{activeStepInfo?.title}</CardTitle>
        </div>
        {activeStepInfo?.description && <CardDescription>{activeStepInfo.description}</CardDescription>}
        <Progress value={progressValue} className="w-full mt-2" />
      </CardHeader>

      <CardContent className="min-h-[200px] py-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <Label htmlFor="coholderEmail">Co-holder's Email</Label>
            <Input
              id="coholderEmail"
              name="coholderEmail"
              type="email"
              placeholder="name@example.com"
              value={formData.coholderEmail}
              onChange={handleChange}
            />
          </div>
        )}
        {currentStep === 2 && (
          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Identity Verification</AlertTitle>
            <AlertDescription>
              To ensure security, please complete the verification step.
              (Placeholder for OTP input, biometric prompt, etc.)
              <Button className="mt-4 w-full">Verify My Identity</Button>
            </AlertDescription>
          </Alert>
        )}
        {currentStep === 3 && (
          <Alert>
            <Hourglass className="h-4 w-4" />
            <AlertTitle>Pending Co-holder</AlertTitle>
            <AlertDescription>
              We've notified your co-holder. We'll let you know once they've completed their part.
              You can close this window; your progress is saved.
            </AlertDescription>
          </Alert>
        )}
        {currentStep === 4 && (
          <div className="space-y-4">
            <Label>Terms and Conditions</Label>
            <div className="p-4 border rounded-md max-h-40 overflow-y-auto text-sm bg-muted/30">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... (Full terms text here)</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsAgreed"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onCheckedChange={(checked) => setFormData(prev => ({...prev, termsAgreed: Boolean(checked)}))}
              />
              <Label htmlFor="termsAgreed" className="text-sm font-normal">
                I agree to the terms and conditions for the joint account.
              </Label>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1 || currentStep === 3}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={currentStep === 3}>
          {currentStep === STEPS.length ? 'Complete Setup' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JointAccountSetupStepper;