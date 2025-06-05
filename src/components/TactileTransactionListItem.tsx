import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils'; // For conditional classes
import { ArrowDownLeft, ArrowUpRight, ShoppingCart } from 'lucide-react'; // Example icons

type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'purchase';

interface TactileTransactionListItemProps {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  currency: string;
  date: string; // Or Date object, formatted as string
  status?: 'pending' | 'completed' | 'failed';
  merchantLogoUrl?: string; // Optional logo for purchases
  onClick?: (id: string) => void;
}

const TransactionIcon: React.FC<{ type: TransactionType }> = ({ type }) => {
    switch (type) {
        case 'deposit': return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
        case 'withdrawal': return <ArrowUpRight className="h-5 w-5 text-red-500" />;
        case 'purchase': return <ShoppingCart className="h-5 w-5 text-blue-500" />;
        case 'transfer': return <ArrowDownLeft className="h-5 w-5 text-yellow-500" />; // Could be ArrowUpRight too
        default: return <ArrowDownLeft className="h-5 w-5 text-gray-500" />;
    }
};

const TactileTransactionListItem: React.FC<TactileTransactionListItemProps> = ({
  id,
  type,
  description,
  amount,
  currency,
  date,
  status,
  merchantLogoUrl,
  onClick,
}) => {
  console.log("Rendering TactileTransactionListItem for ID:", id);

  const amountColor = type === 'deposit' ? 'text-green-600' : type === 'withdrawal' || type === 'purchase' ? 'text-red-600' : 'text-foreground';
  const formattedAmount = `${type === 'deposit' ? '+' : '-'}${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(Math.abs(amount))}`;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border-b hover:bg-muted/50 transition-colors",
        onClick ? "cursor-pointer" : ""
      )}
      onClick={() => onClick?.(id)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick(id) : undefined}
    >
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          {merchantLogoUrl ? <AvatarImage src={merchantLogoUrl} alt={description} /> : null}
          <AvatarFallback className={cn(
             type === 'deposit' && 'bg-green-100 text-green-700',
             (type === 'withdrawal' || type === 'purchase') && 'bg-red-100 text-red-700',
             type === 'transfer' && 'bg-yellow-100 text-yellow-700'
          )}>
            <TransactionIcon type={type} />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{description}</p>
          <p className="text-xs text-muted-foreground">{date} {status && `(${status})`}</p>
        </div>
      </div>
      <div className={cn("text-sm font-semibold", amountColor)}>
        {formattedAmount}
      </div>
    </div>
  );
};

export default TactileTransactionListItem;