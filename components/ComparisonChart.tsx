import React from 'react';
import { YearResult } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/calculations';

interface ComparisonChartProps {
  data: YearResult[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[450px]">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Profit Trajectory</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} 
            tick={{fontSize: 12}}
            stroke="#94a3b8"
          />
          <YAxis 
            tickFormatter={(value) => `RM ${(value / 1000).toFixed(0)}k`} 
            stroke="#94a3b8"
            tick={{fontSize: 12}}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="asbfNetProfit"
            name="ASBF Net Profit"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4, fill: '#2563eb' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="cashMonthlyNetProfit"
            name="Cash Investment Profit"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;