import React, { useState, useEffect } from 'react';

interface TipCalculatorProps {
  className?: string;
}

const TipCalculator: React.FC<TipCalculatorProps> = ({ className = '' }) => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [customTip, setCustomTip] = useState<string>('');
  const [isCustomTip, setIsCustomTip] = useState<boolean>(false);

  const tipOptions = [10, 15, 18, 20, 25];

  const calculateTip = (): number => {
    const bill = parseFloat(billAmount) || 0;
    const tip = isCustomTip ? (parseFloat(customTip) || 0) : tipPercentage;
    return (bill * tip) / 100;
  };

  const calculateTotal = (): number => {
    const bill = parseFloat(billAmount) || 0;
    return bill + calculateTip();
  };

  const calculatePerPerson = (): number => {
    const people = parseInt(numberOfPeople) || 1;
    return calculateTotal() / people;
  };

  const calculateTipPerPerson = (): number => {
    const people = parseInt(numberOfPeople) || 1;
    return calculateTip() / people;
  };

  const handleTipSelect = (tip: number) => {
    setTipPercentage(tip);
    setIsCustomTip(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setIsCustomTip(true);
  };

  const resetCalculator = () => {
    setBillAmount('');
    setTipPercentage(15);
    setNumberOfPeople('1');
    setCustomTip('');
    setIsCustomTip(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Tip Calculator
          </h1>
          <p className="text-purple-200 text-lg">
            Calculate tips and split bills with ease
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm bg-opacity-95">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Bill Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bill Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {tipOptions.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => handleTipSelect(tip)}
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        !isCustomTip && tipPercentage === tip
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                  <div className="relative col-span-3">
                    <input
                      type="number"
                      value={customTip}
                      onChange={(e) => handleCustomTipChange(e.target.value)}
                      placeholder="Custom %"
                      className={`w-full py-3 px-4 border-2 rounded-xl text-lg font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                        isCustomTip
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of People
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-lg">
                    👥
                  </span>
                  <input
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    min="1"
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetCalculator}
                className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Reset Calculator
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Results Card */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Summary
                </h2>

                {/* Tip Amount */}
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-100 font-medium">Tip Amount</span>
                    <span className="text-2xl font-bold text-white">
                      ${calculateTip().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-100 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-white">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white border-opacity-20 my-6"></div>

                {/* Per Person Section - Highlighted */}
                <div className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:scale-105">
                  <div className="text-center mb-4">
                    <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">
                      Amount Per Person
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        ${calculatePerPerson().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">Tip per person</span>
                      <span className="text-gray-800 font-semibold">
                        ${calculateTipPerPerson().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">Quick Tip</h3>
                    <p className="text-sm text-purple-700">
                      The standard tip range is 15-20% for good service. Adjust based on your experience!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-200 text-sm">
            Made with ❤️ for better dining experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;