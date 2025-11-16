import React, { useState, useEffect } from 'react';

interface CalculationResult {
  tipPerPerson: number;
  totalPerPerson: number;
  totalTip: number;
  totalAmount: number;
}

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult>({
    tipPerPerson: 0,
    totalPerPerson: 0,
    totalTip: 0,
    totalAmount: 0,
  });

  const tipButtons = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = tipPercentage;

    if (bill > 0 && people > 0) {
      const totalTip = (bill * tip) / 100;
      const totalAmount = bill + totalTip;
      const tipPerPerson = totalTip / people;
      const totalPerPerson = totalAmount / people;

      setResult({
        tipPerPerson,
        totalPerPerson,
        totalTip,
        totalAmount,
      });
    } else {
      setResult({
        tipPerPerson: 0,
        totalPerPerson: 0,
        totalTip: 0,
        totalAmount: 0,
      });
    }
  };

  const handleTipButtonClick = (percentage: number) => {
    setIsCustom(false);
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    const customValue = parseFloat(value);
    if (!isNaN(customValue) && customValue >= 0) {
      setIsCustom(true);
      setTipPercentage(customValue);
    }
  };

  const handleBillAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleNumberOfPeopleChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value);
    }
  };

  const resetCalculator = () => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople('1');
    setIsCustom(false);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-8 sm:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
              Tip Calculator
            </h1>
            <p className="text-cyan-100 text-center mt-2">
              Calculate tips and split bills easily
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Bill Amount Input */}
            <div>
              <label
                htmlFor="billAmount"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Bill Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
                  $
                </span>
                <input
                  id="billAmount"
                  type="text"
                  inputMode="decimal"
                  value={billAmount}
                  onChange={(e) => handleBillAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Tip Percentage Buttons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Tip Percentage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tipButtons.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipButtonClick(percentage)}
                    className={`py-4 px-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                      !isCustom && tipPercentage === percentage
                        ? 'bg-cyan-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {percentage}%
                  </button>
                ))}
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={customTip}
                    onChange={(e) => handleCustomTipChange(e.target.value)}
                    placeholder="Custom"
                    className={`w-full py-4 px-4 rounded-xl font-semibold text-lg border-2 transition-all text-center ${
                      isCustom
                        ? 'border-cyan-600 bg-cyan-50 text-cyan-700'
                        : 'border-gray-300 bg-gray-100 text-gray-700'
                    } focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none`}
                  />
                  {customTip && (
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      %
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Number of People Input */}
            <div>
              <label
                htmlFor="numberOfPeople"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Number of People
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <input
                  id="numberOfPeople"
                  type="text"
                  inputMode="numeric"
                  value={numberOfPeople}
                  onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 space-y-4 border-2 border-cyan-100">
              <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
                Summary
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">
                    Tip Per Person
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-600">
                    {formatCurrency(result.tipPerPerson)}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">
                    Total Per Person
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {formatCurrency(result.totalPerPerson)}
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-cyan-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Total Tip:
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {formatCurrency(result.totalTip)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">
                    Total Amount:
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetCalculator}
              className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Reset Calculator
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6 opacity-90">
          Split bills fairly and calculate tips with ease
        </p>
      </div>
    </div>
  );
};

export default TipCalculator;