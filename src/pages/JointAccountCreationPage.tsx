import React from 'react';
import Header from '@/components/layout/Header';
import JointAccountSetupStepper from '@/components/JointAccountSetupStepper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const JointAccountCreationPage = () => {
  console.log('JointAccountCreationPage loaded');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJointAccountSetupComplete = (formData: Record<string, any>) => {
    console.log('Joint account setup completed with data:', formData);
    // API call to finalize account creation would happen here
    toast({
      title: "Joint Account Initiated!",
      description: `Successfully started the process with ${formData.coholderEmail || 'co-holder'}.`,
      variant: "default",
    });
    // Navigate to dashboard or relevant page after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-2">Create a Joint Account</h1>
            <p className="text-muted-foreground text-center mb-8">
                Seamlessly set up a shared account with another person. Follow the steps below.
            </p>
            <JointAccountSetupStepper onComplete={handleJointAccountSetupComplete} />
        </div>
      </main>
    </div>
  );
};

export default JointAccountCreationPage;