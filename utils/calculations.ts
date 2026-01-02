import { CalculationInputs, YearResult } from '../types';

export const calculateReturns = (inputs: CalculationInputs): YearResult[] => {
  const {
    loanAmount,
    initialCash,
    annualDividendRate,
    annualInterestRate,
    loanTenure,
    analysisDuration
  } = inputs;

  // Convert percentages to decimals
  const annualDividend = annualDividendRate / 100;
  const annualRate = annualInterestRate / 100;
  const monthlyRate = annualRate / 12;

  // Calculate Monthly Payment (Amortization Formula)
  const totalMonths = loanTenure * 12;
  const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
  const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
  const monthlyPayment = numerator / denominator;

  // ASB Certificate Initial Value
  // Based on Python script: asb_initial = loan + initial_cash
  const asbInitial = loanAmount + initialCash;

  const results: YearResult[] = [];

  // Loop through each year from 1 to analysisDuration
  for (let y = 1; y <= analysisDuration; y++) {
    const months = y * 12;
    
    // --- 1. ASBF Calculation ---
    
    // Calculate Balance and Total Paid via simulation to match Python logic exactly
    let balance = loanAmount;
    let totalPaid = 0;
    
    for (let m = 0; m < months; m++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;
      totalPaid += monthlyPayment;
    }

    // Value of the ASB Certificate + Dividends Compounded
    const asbValue = asbInitial * Math.pow(1 + annualDividend, y);

    // Cash in hand if we surrender loan: (Certificate Value - Outstanding Loan)
    const cashAfterSettlement = asbValue - balance;
    
    // Net Profit: Cash in hand - Cost (Total installments paid + Initial cash put in)
    const asbfNetProfit = cashAfterSettlement - (totalPaid + initialCash);


    // --- 2. Cash Investment Comparison ---
    
    // Monthly cash investment scenario (Opportunity Cost)
    // Investing the 'monthly_payment' amount instead of paying the bank
    const monthlyCash = monthlyPayment;
    let cashAsb = 0;

    for (let m = 0; m < months; m++) {
      cashAsb += monthlyCash;
      // Apply dividend at the end of every 12th month
      // Python logic: if (m+1) % 12 == 0: cash_asb *= (1 + annual_dividend * 0.92)
      if ((m + 1) % 12 === 0) {
        cashAsb *= (1 + annualDividend * 0.92); // approx min balance effect
      }
    }

    const cashProfit = cashAsb - (monthlyCash * months);

    results.push({
      year: y,
      monthlyPayment: monthlyPayment,
      outstandingBalance: balance,
      asbfNetProfit: asbfNetProfit,
      cashMonthlyNetProfit: cashProfit,
      difference: asbfNetProfit - cashProfit,
      totalPaid: totalPaid,
      asbValue: asbValue
    });
  }

  return results;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};