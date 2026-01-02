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
    loanAmount: 200000,
    initialCash: 0,
    annualDividendRate: 5.5,
    annualInterestRate: 4.85,
    loanTenure: 40,
    analysisDuration: 5,
  });

  // show/hide top warning banner
  const [showWarning, setShowWarning] = useState(true);

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

      {/* Warning banner (light red) */}
      {showWarning && (
        <div className="bg-red-100 border border-red-500 text-red-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
            <button
              onClick={() => setShowWarning(false)}
              aria-label="Dismiss warning"
              className="absolute top-3 right-3 text-red-600 hover:text-red-800"
            >
              ✕
            </button>
            <p className="text-sm font-medium">
              <b>Disclaimer:</b> This calculator is provided without warranty of any kind. The user assumes all responsibility for its use.
            </p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <InputSection inputs={inputs} setInputs={setInputs} />
            
            {/* ASB Dividend Record (inserted) */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 text-sm text-yellow-900">
              <h4 className="font-semibold mb-2">ASB Dividend Record</h4>
              <ul className="space-y-1">
                <li>2025: 5.75 sen (5.50 sen dividend + 0.25 sen bonus)</li>
                <li>2024: 5.75 sen (5.50 sen dividend + 0.25 sen bonus)</li>
                <li>2023: 5.25 sen (4.25 sen dividend + 1.00 sen bonus)</li>
                <li>2022: 5.10 sen (4.60 sen dividend + 0.50 sen bonus)</li>
                <li>2021: 5.00 sen (4.25 sen dividend + 0.75 sen bonus)</li>
              </ul>
            </div>

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