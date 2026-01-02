import React from 'react';
import { YearResult } from '../types';
import { formatCurrency } from '../utils/calculations';
import { TrendingUp, Wallet, ArrowRightLeft } from 'lucide-react';

interface SummaryCardsProps {
  lastResult: YearResult;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ lastResult }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* ASBF Result */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
        <div className="flex items-center gap-2 mb-2 opacity-90">
          <TrendingUp className="w-5 h-5" />
          <span className="font-medium text-sm">ASBF Net Profit (Year {lastResult.year})</span>
        </div>
        <div className="text-3xl font-bold tracking-tight">
          {formatCurrency(lastResult.asbfNetProfit)}
        </div>
        <div className="text-xs mt-2 text-blue-100 opacity-80">
          After settling loan balance
        </div>
      </div>

      {/* Cash Investment Result */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-slate-500">
          <Wallet className="w-5 h-5 text-emerald-600" />
          <span className="font-medium text-sm">Cash Investment Profit</span>
        </div>
        <div className="text-3xl font-bold text-slate-800 tracking-tight">
          {formatCurrency(lastResult.cashMonthlyNetProfit)}
        </div>
        <div className="text-xs mt-2 text-slate-400">
          Investing monthly payment amount
        </div>
      </div>

      {/* Difference */}
      <div className={`rounded-xl p-6 border shadow-sm ${lastResult.difference > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
        <div className="flex items-center gap-2 mb-2 text-slate-600">
          <ArrowRightLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Difference (ASBF - Cash)</span>
        </div>
        <div className={`text-3xl font-bold tracking-tight ${lastResult.difference > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
          {lastResult.difference > 0 ? '+' : ''}{formatCurrency(lastResult.difference)}
        </div>
        <div className="text-xs mt-2 text-slate-500 opacity-80">
          {lastResult.difference > 0 ? 'ASBF outperforms Cash' : 'Cash outperforms ASBF'}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;