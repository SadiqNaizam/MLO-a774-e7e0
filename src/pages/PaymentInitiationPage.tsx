import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; // Assuming shadcn default toast

const paymentFormSchema = z.object({
  sourceAccount: z.string().min(1, "Please select a source account."),
  recipientName: z.string().min(2, "Recipient name is required."),
  recipientAccount: z.string().min(5, "Recipient account number is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
  paymentDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date." }),
  notes: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentInitiationPage = () => {
  console.log('PaymentInitiationPage loaded');
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentFormValues | null>(null);
  const { toast } = useToast();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      sourceAccount: '',
      recipientName: '',
      recipientAccount: '',
      amount: 0,
      paymentDate: new Date().toISOString().split('T')[0], // Today's date
      notes: '',
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Payment form submitted:', data);
    setPaymentDetails(data);
    setCurrentStep(2); // Move to confirmation step
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmPayment = () => {
    console.log('Payment confirmed:', paymentDetails);
    // Here you would typically call an API
    setIsConfirmDialogOpen(false);
    setCurrentStep(3); // Move to success/processing step
    toast({
      title: "Payment Processing",
      description: "Your payment is being processed. You'll be notified upon completion.",
      variant: "default",
    });
    form.reset(); // Reset form after successful submission
     // Simulate redirect or further action after a delay
    setTimeout(() => {
        setCurrentStep(1); // Reset to initial step
    }, 3000);
  };

  const progressValue = (currentStep / 3) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Initiate Payment</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Fill in the details to send a payment."}
              {currentStep === 2 && "Please review and confirm your payment details."}
              {currentStep === 3 && "Your payment is being processed."}
            </CardDescription>
            <Progress value={progressValue} className="mt-2" />
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="sourceAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Account</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="acc_checking_001">Checking - XXXX1234 ($25,340.75)</SelectItem>
                            <SelectItem value="acc_savings_002">Savings - XXXX5678 ($102,500.00)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Account Number</FormLabel>
                        <FormControl><Input placeholder="000-123-456" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (USD)</FormLabel>
                        <FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl><Input placeholder="E.g., Rent for July" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Review Payment</Button>
                </form>
              </Form>
            )}

            {currentStep === 3 && (
                 <div className="text-center py-8">
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold">Payment Processing</h3>
                    <p className="text-muted-foreground">Your payment has been submitted successfully and is now processing.</p>
                </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Payment</DialogTitle>
              <DialogDescription>
                Please review the payment details below before confirming.
              </DialogDescription>
            </DialogHeader>
            {paymentDetails && (
              <div className="space-y-2 my-4">
                <p><strong>From:</strong> {paymentDetails.sourceAccount === "acc_checking_001" ? "Checking - XXXX1234" : "Savings - XXXX5678"}</p>
                <p><strong>To:</strong> {paymentDetails.recipientName} ({paymentDetails.recipientAccount})</p>
                <p><strong>Amount:</strong> ${paymentDetails.amount.toFixed(2)} USD</p>
                <p><strong>Date:</strong> {new Date(paymentDetails.paymentDate).toLocaleDateString()}</p>
                {paymentDetails.notes && <p><strong>Notes:</strong> {paymentDetails.notes}</p>}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsConfirmDialogOpen(false); setCurrentStep(1); }}>Cancel</Button>
              <Button onClick={handleConfirmPayment}>Confirm & Send</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default PaymentInitiationPage;