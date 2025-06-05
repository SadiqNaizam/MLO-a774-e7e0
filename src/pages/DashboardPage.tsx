import React from 'react';
import Header from '@/components/layout/Header';
import PremiumAccountSummaryCard from '@/components/PremiumAccountSummaryCard';
import InteractiveFinancialOverviewChart from '@/components/InteractiveFinancialOverviewChart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CreditCard, Send } from 'lucide-react';

// Placeholder data for chart
const sampleChartData = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
];

const chartLines = [
    { dataKey: "income", stroke: "#22c55e", name: "Income" }, // green-500
    { dataKey: "expenses", stroke: "#ef4444", name: "Expenses" }, // red-500
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleViewAccountDetails = (accountId: string) => {
    console.log('Viewing details for account:', accountId);
    navigate(`/accounts/${accountId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 space-y-8">
          <section aria-labelledby="account-summaries-title">
            <h2 id="account-summaries-title" className="text-2xl font-semibold mb-4">
              Account Summaries
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PremiumAccountSummaryCard
                accountId="premium-001"
                accountName="Premium Checking"
                balance={25340.75}
                currency="USD"
                onViewDetailsClick={handleViewAccountDetails}
              />
              <PremiumAccountSummaryCard
                accountId="savings-002"
                accountName="High-Yield Savings"
                balance={102500.00}
                currency="USD"
                onViewDetailsClick={handleViewAccountDetails}
              />
              {/* Add more summary cards as needed */}
            </div>
          </section>

          <section aria-labelledby="quick-actions-title">
            <Card>
              <CardHeader>
                <CardTitle id="quick-actions-title" className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button onClick={() => navigate('/payments')} variant="outline">
                  <Send className="mr-2 h-4 w-4" /> Transfer Funds
                </Button>
                <Button onClick={() => navigate('/payments')} variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" /> Pay Bills
                </Button>
                <Button onClick={() => navigate('/joint-account-creation')} variant="default">
                  Open Joint Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="financial-overview-title">
             <h2 id="financial-overview-title" className="text-2xl font-semibold mb-4 sr-only">
              Financial Overview
            </h2>
            <InteractiveFinancialOverviewChart
              data={sampleChartData}
              title="Monthly Financial Overview"
              description="Track your income and expenses over the past six months."
              lines={chartLines}
            />
          </section>
        </main>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;