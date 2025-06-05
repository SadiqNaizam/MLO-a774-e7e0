import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Bell, Palette, FileText, HelpCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ProfileSettingsPage = () => {
  console.log('ProfileSettingsPage loaded');
  const { toast } = useToast();

  // Example state for form fields - in a real app, this would come from user data
  const [profileInfo, setProfileInfo] = useState({
    fullName: 'Johnathan Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
  });
  const [notifications, setNotifications] = useState({
    emailPush: true,
    smsAlerts: false,
    promotionalOffers: true,
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    biometricLogin: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (section: string) => {
    console.log(`Saving changes for ${section}:`, section === 'profile' ? profileInfo : (section === 'notifications' ? notifications : security));
    toast({
        title: "Settings Updated",
        description: `${section.charAt(0).toUpperCase() + section.slice(1)} settings have been saved.`,
    });
  };


  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>
          <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1">
            <AccordionItem value="item-1">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">Personal Information</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" name="fullName" value={profileInfo.fullName} onChange={handleProfileChange} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" value={profileInfo.email} onChange={handleProfileChange} disabled />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input id="phoneNumber" name="phoneNumber" value={profileInfo.phoneNumber} onChange={handleProfileChange} />
                    </div>
                    <Button onClick={() => handleSaveChanges('profile')}>Save Changes</Button>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="item-2">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">Security Settings</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="twoFactorAuth" className="font-medium">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Enhance your account security.</p>
                        </div>
                        <Switch
                            id="twoFactorAuth"
                            checked={security.twoFactorAuth}
                            onCheckedChange={(checked) => setSecurity(s => ({...s, twoFactorAuth: checked}))}
                        />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="biometricLogin" className="font-medium">Biometric Login</Label>
                            <p className="text-sm text-muted-foreground">Use fingerprint or face ID to log in.</p>
                        </div>
                        <Switch
                            id="biometricLogin"
                            checked={security.biometricLogin}
                            onCheckedChange={(checked) => setSecurity(s => ({...s, biometricLogin: checked}))}
                        />
                    </div>
                    <Button variant="outline">Change Password</Button>
                    <Button onClick={() => handleSaveChanges('security')}>Save Security Settings</Button>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="item-3">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">Notification Preferences</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="space-y-4">
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="emailPush" className="font-medium">Email & Push Notifications</Label>
                        <Switch
                            id="emailPush"
                            checked={notifications.emailPush}
                            onCheckedChange={(checked) => setNotifications(n => ({...n, emailPush: checked}))}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="smsAlerts" className="font-medium">SMS Alerts for Transactions</Label>
                        <Switch
                            id="smsAlerts"
                            checked={notifications.smsAlerts}
                            onCheckedChange={(checked) => setNotifications(n => ({...n, smsAlerts: checked}))}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="promotionalOffers" className="font-medium">Promotional Offers</Label>
                        <Switch
                            id="promotionalOffers"
                            checked={notifications.promotionalOffers}
                            onCheckedChange={(checked) => setNotifications(n => ({...n, promotionalOffers: checked}))}
                        />
                    </div>
                    <Button onClick={() => handleSaveChanges('notifications')}>Save Notification Settings</Button>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                     <div className="flex items-center space-x-3">
                        <Palette className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">Appearance</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground">Theme selection (e.g., Light/Dark mode) options would go here.</p>
                  {/* Example: <Select> for theme, or radio buttons */}
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="item-5">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">Legal & Documents</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <ul className="space-y-2">
                    <li><Button variant="link" className="p-0 h-auto">Terms of Service</Button></li>
                    <li><Button variant="link" className="p-0 h-auto">Privacy Policy</Button></li>
                  </ul>
                </AccordionContent>
              </Card>
            </AccordionItem>

             <AccordionItem value="item-6">
                <Card>
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center space-x-3">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            <span className="text-lg font-medium">Support</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                        <p className="text-muted-foreground mb-2">Need help? Contact our support team.</p>
                        <Button variant="outline">Contact Support</Button>
                    </AccordionContent>
                </Card>
            </AccordionItem>
          </Accordion>
        </main>
      </ScrollArea>
    </div>
  );
};

export default ProfileSettingsPage;