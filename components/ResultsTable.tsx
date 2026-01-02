import React from 'react';
import { YearResult } from '../types';
import { formatCurrency } from '../utils/calculations';
import { Table } from 'lucide-react';

interface ResultsTableProps {
  results: YearResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
       <div className="p-6 border-b border-slate-100 flex items-center gap-2">
        <Table className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-800">Detailed Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-center w-24">Year</th>
              <th className="px-6 py-4 font-semibold text-right">Outstanding Loan</th>
              <th className="px-6 py-4 font-semibold text-right text-blue-700 bg-blue-50/50">ASBF Net Profit</th>
              <th className="px-6 py-4 font-semibold text-right text-emerald-700 bg-emerald-50/50">Cash Net Profit</th>
              <th className="px-6 py-4 font-semibold text-right">Difference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((row) => (
              <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 text-center">{row.year}</td>
                <td className="px-6 py-4 text-right text-slate-600 font-mono">
                  {formatCurrency(row.outstandingBalance)}
                </td>
                <td className="px-6 py-4 text-right font-bold text-blue-600 font-mono bg-blue-50/20">
                  {formatCurrency(row.asbfNetProfit)}
                </td>
                <td className="px-6 py-4 text-right font-bold text-emerald-600 font-mono bg-emerald-50/20">
                  {formatCurrency(row.cashMonthlyNetProfit)}
                </td>
                <td className={`px-6 py-4 text-right font-bold font-mono ${row.difference > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {row.difference > 0 ? '+' : ''}{formatCurrency(row.difference)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;