import React, { useState, useEffect } from 'react';

interface CalculationResults {
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
  const [results, setResults] = useState<CalculationResults>({
    tipPerPerson: 0,
    totalPerPerson: 0,
    totalTip: 0,
    totalAmount: 0,
  });

  const tipOptions = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = tipPercentage || 0;

    if (bill > 0 && people > 0) {
      const totalTip = (bill * tip) / 100;
      const totalAmount = bill + totalTip;
      const tipPerPerson = totalTip / people;
      const totalPerPerson = totalAmount / people;

      setResults({
        tipPerPerson,
        totalPerPerson,
        totalTip,
        totalAmount,
      });
    } else {
      setResults({
        tipPerPerson: 0,
        totalPerPerson: 0,
        totalTip: 0,
        totalAmount: 0,
      });
    }
  };

  const handleTipSelect = (percentage: number) => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    const customValue = parseFloat(value);
    if (!isNaN(customValue) && customValue >= 0) {
      setTipPercentage(customValue);
      setIsCustom(true);
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

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople('1');
    setIsCustom(false);
    setResults({
      tipPerPerson: 0,
      totalPerPerson: 0,
      totalTip: 0,
      totalAmount: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white text-center">
              💰 Tip Calculator
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Calculate tips and split bills easily
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8">
            {/* Bill Amount Input */}
            <div className="mb-6">
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
                  className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            {/* Tip Percentage Buttons */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Tip Percentage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tipOptions.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipSelect(percentage)}
                    className={`py-3 px-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                      tipPercentage === percentage && !isCustom
                        ? 'bg-blue-600 text-white shadow-lg'
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
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-lg border-2 transition-all outline-none ${
                      isCustom
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 bg-gray-100 text-gray-700'
                    } focus:ring-2 focus:ring-blue-500`}
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
            <div className="mb-8">
              <label
                htmlFor="numberOfPeople"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Number of People
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                  👥
                </span>
                <input
                  id="numberOfPeople"
                  type="text"
                  inputMode="numeric"
                  value={numberOfPeople}
                  onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
                  placeholder="1"
                  min="1"
                  className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Tip Per Person
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                    ${formatCurrency(results.tipPerPerson)}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Total Per Person
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
                    ${formatCurrency(results.totalPerPerson)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Total Tip
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-700">
                    ${formatCurrency(results.totalTip)}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Total Amount
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-700">
                    ${formatCurrency(results.totalAmount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-[1.02] shadow-md"
            >
              Reset Calculator
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>Split bills fairly and calculate tips accurately</p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;