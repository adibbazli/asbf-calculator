import React from 'react';
import { CalculationInputs } from '../types';
import { Settings, Calculator, DollarSign, Calendar, Percent } from 'lucide-react';

interface InputSectionProps {
  inputs: CalculationInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculationInputs>>;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const handleChange = (field: keyof CalculationInputs, value: string) => {
    const numValue = parseFloat(value);
    setInputs((prev) => ({
      ...prev,
      [field]: isNaN(numValue) ? 0 : numValue,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">Assumptions & Parameters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Loan Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> Loan Amount (RM)
          </label>
          <input
            type="number"
            value={inputs.loanAmount}
            onChange={(e) => handleChange('loanAmount', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        {/* Initial Cash */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> Initial Cash / Fee (RM)
          </label>
          <input
            type="number"
            value={inputs.initialCash}
            onChange={(e) => handleChange('initialCash', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        {/* Loan Tenure */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Loan Tenure (Years)
          </label>
          <input
            type="number"
            value={inputs.loanTenure}
            onChange={(e) => handleChange('loanTenure', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <Percent className="w-3.5 h-3.5" /> Loan Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={inputs.annualInterestRate}
            onChange={(e) => handleChange('annualInterestRate', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        {/* Dividend Rate */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <Percent className="w-3.5 h-3.5" /> ASB Dividend Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={inputs.annualDividendRate}
            onChange={(e) => handleChange('annualDividendRate', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

         {/* Analysis Years */}
         <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5" /> Analysis Duration (Years)
          </label>
          <input
            type="number"
            max={inputs.loanTenure}
            value={inputs.analysisDuration}
            onChange={(e) => handleChange('analysisDuration', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

      </div>
    </div>
  );
};

export default InputSection;