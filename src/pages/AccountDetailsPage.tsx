import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import TactileTransactionListItem from '@/components/TactileTransactionListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Download, Settings } from 'lucide-react';

// Placeholder transaction type
type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'purchase';

// Placeholder data for transactions
const allTransactions = [
  { id: 'txn_1', type: 'deposit' as TransactionType, description: 'Salary Deposit', amount: 3500, currency: 'USD', date: '2024-07-15', status: 'completed' as const, merchantLogoUrl: 'https://via.placeholder.com/40/0000FF/FFFFFF?Text=Comp' },
  { id: 'txn_2', type: 'purchase' as TransactionType, description: 'Groceries at QuickMart', amount: -75.50, currency: 'USD', date: '2024-07-14', status: 'completed' as const, merchantLogoUrl: 'https://via.placeholder.com/40/FF0000/FFFFFF?Text=QM' },
  { id: 'txn_3', type: 'withdrawal' as TransactionType, description: 'ATM Withdrawal', amount: -100, currency: 'USD', date: '2024-07-12', status: 'completed' as const },
  { id: 'txn_4', type: 'transfer' as TransactionType, description: 'Transfer to Savings', amount: -500, currency: 'USD', date: '2024-07-10', status: 'completed' as const },
  { id: 'txn_5', type: 'purchase' as TransactionType, description: 'Online Shopping - TechGadgets', amount: -199.99, currency: 'USD', date: '2024-07-09', status: 'pending' as const, merchantLogoUrl: 'https://via.placeholder.com/40/008000/FFFFFF?Text=TG' },
];

// Placeholder account details
const accountDetailsMap: Record<string, { name: string; balance: number; currency: string }> = {
    "premium-001": { name: "Premium Checking", balance: 25340.75, currency: "USD" },
    "savings-002": { name: "High-Yield Savings", balance: 102500.00, currency: "USD" },
    "default-acc": { name: "My Account", balance: 5000, currency: "USD" }
};


const AccountDetailsPage = () => {
  const { accountId = "default-acc" } = useParams<{ accountId?: string }>(); // Provide default if no ID
  console.log(`AccountDetailsPage loaded for account ID: ${accountId}`);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);

  const accountInfo = accountDetailsMap[accountId] || accountDetailsMap["default-acc"];


  useEffect(() => {
    setFilteredTransactions(
      allTransactions.filter(tx =>
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(tx.amount).includes(searchTerm)
      )
    );
  }, [searchTerm, accountId]); // Re-filter if accountId changes, though typically this page is for one account.

  const handleTransactionClick = (id: string) => {
    console.log('Transaction clicked:', id);
    // Potentially navigate to a transaction detail view or show a modal
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/dashboard')}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{accountInfo.name} Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl">{accountInfo.name}</CardTitle>
                        <CardDescription>Account ID: {accountId}</CardDescription>
                    </div>
                    <div className="text-right">
                         <p className="text-3xl font-bold text-primary">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: accountInfo.currency }).format(accountInfo.balance)}
                        </p>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                 <Button variant="outline"><Download className="mr-2 h-4 w-4" /> View Statements</Button>
                 <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Manage Account</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                 <div className="mt-4 flex gap-2 items-center">
                    <Input
                        type="search"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] border rounded-md">
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(tx => (
                    <TactileTransactionListItem
                        key={tx.id}
                        {...tx}
                        onClick={handleTransactionClick}
                    />
                    ))
                ) : (
                    <p className="p-4 text-center text-muted-foreground">No transactions found.</p>
                )}
                </ScrollArea>
            </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AccountDetailsPage;