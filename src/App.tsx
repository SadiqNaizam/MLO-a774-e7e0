import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Newly generated pages
import DashboardPage from "./pages/DashboardPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import PaymentInitiationPage from "./pages/PaymentInitiationPage";
import JointAccountCreationPage from "./pages/JointAccountCreationPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster /> {/* Use the renamed import */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Route for AccountDetailsPage with accountId parameter */}
          <Route path="/accounts/:accountId" element={<AccountDetailsPage />} />
          {/* Fallback route if no accountId is provided, or for a general accounts overview */}
          <Route path="/accounts" element={<AccountDetailsPage />} /> 
          <Route path="/payments" element={<PaymentInitiationPage />} />
          <Route path="/joint-account-creation" element={<JointAccountCreationPage />} />
          <Route path="/profile-settings" element={<ProfileSettingsPage />} />
          <Route path="/profile" element={<ProfileSettingsPage />} /> {/* To match header navigation link */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;