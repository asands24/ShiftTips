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

  const handleTipSelect = (percentage: number) => {
    setIsCustom(false);
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setIsCustom(true);
    setCustomTip(value);
    const customValue = parseFloat(value) || 0;
    setTipPercentage(customValue);
  };

  const handleBillAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleNumberOfPeopleChange = (value: string) => {
    // Allow only positive integers
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setNumberOfPeople(value);
    }
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  const resetCalculator = () => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople('1');
    setIsCustom(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Tip Calculator
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Calculate tips and split bills easily
            </p>
          </div>

          {/* Main Content */}
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
                    inputMode="numeric"
                    value={customTip}
                    onChange={(e) => handleCustomTipChange(e.target.value)}
                    placeholder="Custom"
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-lg border-2 transition-all outline-none ${
                      isCustom
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
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
              <input
                id="numberOfPeople"
                type="text"
                inputMode="numeric"
                value={numberOfPeople}
                onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
                placeholder="1"
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Results Display */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Calculation Results
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Tip Per Person</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${formatCurrency(result.tipPerPerson)}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Per Person</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    ${formatCurrency(result.totalPerPerson)}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Tip</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${formatCurrency(result.totalTip)}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${formatCurrency(result.totalAmount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetCalculator}
              className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Reset Calculator
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Split bills fairly and calculate tips accurately
        </p>
      </div>
    </div>
  );
};

export default TipCalculator;