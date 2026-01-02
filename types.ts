export interface CalculationInputs {
  loanAmount: number;
  initialCash: number;
  annualDividendRate: number; // percentage, e.g., 5.5
  annualInterestRate: number; // percentage, e.g., 4.05
  loanTenure: number; // years
  analysisDuration: number; // years to simulate
}

export interface YearResult {
  year: number;
  monthlyPayment: number;
  outstandingBalance: number;
  asbfNetProfit: number;
  cashMonthlyNetProfit: number;
  difference: number;
  totalPaid: number;
  asbValue: number;
}