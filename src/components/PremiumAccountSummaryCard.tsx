import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface PremiumAccountSummaryCardProps {
  accountId: string;
  accountName: string;
  balance: number;
  currency: string;
  onViewDetailsClick: (accountId: string) => void;
}

const PremiumAccountSummaryCard: React.FC<PremiumAccountSummaryCardProps> = ({
  accountId,
  accountName,
  balance,
  currency,
  onViewDetailsClick,
}) => {
  console.log("Rendering PremiumAccountSummaryCard for account:", accountId);

  return (
    <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{accountName}</CardTitle>
            <TrendingUp className="h-6 w-6 text-green-500" />
        </div>
        <CardDescription>Your premium account overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-3xl font-bold text-primary">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(balance)}
        </p>
        <p className="text-sm text-muted-foreground">Available Balance</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onViewDetailsClick(accountId)}>
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumAccountSummaryCard;