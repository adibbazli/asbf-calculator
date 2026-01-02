import React, { useState, useMemo } from 'react';
import { CalculationInputs } from './types';
import { calculateReturns, formatCurrency } from './utils/calculations';
import InputSection from './components/InputSection';
import ComparisonChart from './components/ComparisonChart';
import ResultsTable from './components/ResultsTable';
import SummaryCards from './components/SummaryCards';
import { Landmark } from 'lucide-react';

const App: React.FC = () => {
  // Default values from the Python script
  const [inputs, setInputs] = useState<CalculationInputs>({
    loanAmount: 195000,
    initialCash: 5000,
    annualDividendRate: 5.5,
    annualInterestRate: 4.05,
    loanTenure: 35,
    analysisDuration: 5,
  });

  const results = useMemo(() => calculateReturns(inputs), [inputs]);
  const lastResult = results[results.length - 1];

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">ASBF<span className="text-indigo-600">Analyzer</span></h1>
          </div>
          <div className="text-sm text-slate-500 font-medium hidden sm:block">
            Current Monthly Payment: <span className="text-slate-900">{formatCurrency(lastResult.monthlyPayment)}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <InputSection inputs={inputs} setInputs={setInputs} />
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-800">
               <h4 className="font-semibold mb-2 flex items-center gap-2">
                 ℹ️ Calculation Logic
               </h4>
               <ul className="list-disc pl-4 space-y-1 opacity-90">
                 <li><strong>ASBF:</strong> Loan + Initial Cash invested. Interest calculated monthly.</li>
                 <li><strong>Cash Invest:</strong> The monthly installment amount is invested into ASB instead.</li>
                 <li><strong>Dividend:</strong> Applied annually. Cash investment assumes 92% principal utilization for dividend calculation (average balance approximation).</li>
               </ul>
            </div>
          </div>

          {/* Main Content - Results */}
          <div className="lg:col-span-8">
            <SummaryCards lastResult={lastResult} />
            
            <div className="space-y-8">
              <ComparisonChart data={results} />
              <ResultsTable results={results} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;