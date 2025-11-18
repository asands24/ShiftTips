import React, { useState, useEffect } from 'react';

interface TipCalculatorState {
  billAmount: string;
  tipPercentage: number;
  numberOfPeople: string;
  customTip: string;
}

const TipCalculator: React.FC = () => {
  const [state, setState] = useState<TipCalculatorState>({
    billAmount: '',
    tipPercentage: 15,
    numberOfPeople: '1',
    customTip: '',
  });

  const [isCustomTip, setIsCustomTip] = useState(false);

  const tipOptions = [10, 15, 18, 20, 25];

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setState({ ...state, numberOfPeople: value });
    }
  };

  const handleTipSelection = (percentage: number) => {
    setIsCustomTip(false);
    setState({ ...state, tipPercentage: percentage, customTip: '' });
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setState({ ...state, customTip: value });
      setIsCustomTip(true);
      if (value !== '') {
        setState({ ...state, customTip: value, tipPercentage: parseFloat(value) });
      }
    }
  };

  const calculateTip = (): number => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = isCustomTip ? parseFloat(state.customTip) || 0 : state.tipPercentage;
    return (bill * tip) / 100;
  };

  const calculateTotal = (): number => {
    const bill = parseFloat(state.billAmount) || 0;
    return bill + calculateTip();
  };

  const calculatePerPerson = (): number => {
    const people = parseInt(state.numberOfPeople) || 1;
    return calculateTotal() / people;
  };

  const calculateTipPerPerson = (): number => {
    const people = parseInt(state.numberOfPeople) || 1;
    return calculateTip() / people;
  };

  const handleReset = () => {
    setState({
      billAmount: '',
      tipPercentage: 15,
      numberOfPeople: '1',
      customTip: '',
    });
    setIsCustomTip(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center tracking-tight">
            💰 Tip Calculator
          </h1>
          <p className="text-purple-100 text-center mt-2 text-sm sm:text-base">
            Calculate tips and split bills with ease
          </p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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
                    type="text"
                    value={state.billAmount}
                    onChange={handleBillChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
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
                      onClick={() => handleTipSelection(tip)}
                      className={`py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        !isCustomTip && state.tipPercentage === tip
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Tip */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Custom Tip %
                </label>
                <input
                  type="text"
                  value={state.customTip}
                  onChange={handleCustomTipChange}
                  placeholder="Enter custom %"
                  className="w-full px-4 py-3 sm:py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                />
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
                    type="text"
                    value={state.numberOfPeople}
                    onChange={handlePeopleChange}
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 sm:py-4 bg-gray-200 text-gray-700 font-bold text-base sm:text-lg rounded-xl hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Reset
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {/* Tip Amount */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Tip Amount</p>
                    <p className="text-xs text-gray-500 mt-1">Total tip</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-600">
                      ${calculateTip().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Total Amount</p>
                    <p className="text-xs text-gray-500 mt-1">Bill + tip</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-indigo-600">
                      ${calculateTotal().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tip Per Person */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Tip Per Person</p>
                    <p className="text-xs text-gray-500 mt-1">Individual tip</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">
                      ${calculateTipPerPerson().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Per Person - Highlighted */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-xl transform transition-all duration-200 hover:shadow-2xl hover:scale-105">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-purple-100">Total Per Person</p>
                    <p className="text-xs text-purple-200 mt-1">Amount each person pays</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl sm:text-5xl font-bold text-white">
                      ${calculatePerPerson().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-xs font-semibold text-amber-800">Quick Tip</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Standard tipping ranges from 15% to 20% for good service. Adjust based on your experience!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            Made with ❤️ • Split bills fairly and tip generously
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;