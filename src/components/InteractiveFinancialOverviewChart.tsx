import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Sample data structure - replace with actual data fetching and props
const sampleData = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
];

interface ChartDataPoint {
    name: string; // Typically time period like Month, Day, Year
    [key: string]: number | string; // Lines on the chart e.g. income, expenses
}

interface InteractiveFinancialOverviewChartProps {
  data: ChartDataPoint[];
  title?: string;
  description?: string;
  lines: { dataKey: string; stroke: string; name?: string }[]; // Defines lines to plot
}

const InteractiveFinancialOverviewChart: React.FC<InteractiveFinancialOverviewChartProps> = ({
    data = sampleData, // Default to sampleData if none provided
    title = "Financial Overview",
    description = "Income vs. Expenses over time",
    lines = [
        { dataKey: "income", stroke: "#82ca9d", name: "Income" },
        { dataKey: "expenses", stroke: "#8884d8", name: "Expenses" },
    ]
}) => {
  console.log("Rendering InteractiveFinancialOverviewChart with data points:", data.length);

  if (!data || data.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">No data available to display chart.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                {lines.map(line => (
                    <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.stroke} name={line.name || line.dataKey} activeDot={{ r: 8 }} />
                ))}
            </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
};

export default InteractiveFinancialOverviewChart;