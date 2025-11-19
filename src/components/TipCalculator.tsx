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
    customTip: ''
  });

  const [results, setResults] = useState({
    tipAmount: 0,
    totalAmount: 0,
    perPersonAmount: 0
  });

  const [isCustomTip, setIsCustomTip] = useState(false);

  const tipOptions = [10, 15, 18, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = isCustomTip 
      ? parseFloat(state.customTip) || 0 
      : state.tipPercentage;
    const people = parseInt(state.numberOfPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonAmount = totalAmount / people;

    setResults({
      tipAmount: parseFloat(tipAmount.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      perPersonAmount: parseFloat(perPersonAmount.toFixed(2))
    });
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipSelect = (percentage: number) => {
    setIsCustomTip(false);
    setState({ ...state, tipPercentage: percentage, customTip: '' });
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setIsCustomTip(true);
      setState({ ...state, customTip: value });
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setState({ ...state, numberOfPeople: value });
    }
  };

  const handleReset = () => {
    setState({
      billAmount: '',
      tipPercentage: 15,
      numberOfPeople: '1',
      customTip: ''
    });
    setIsCustomTip(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-purple-500/20 hover:shadow-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center tracking-tight">
            💰 Tip Calculator
          </h1>
          <p className="text-purple-100 text-center mt-2 text-sm sm:text-base">
            Calculate tips and split bills with ease
          </p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Bill Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bill Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">
                    $
                  </span>
                  <input
                    type="text"
                    value={state.billAmount}
                    onChange={handleBillChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Tip Percentage
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {tipOptions.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => handleTipSelect(tip)}
                      className={`py-3 px-4 rounded-xl font-semibold text-base transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        !isCustomTip && state.tipPercentage === tip
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white hover:shadow-md'
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
                  className={`w-full px-4 py-3 sm:py-4 text-lg border-2 rounded-xl focus:outline-none transition-all duration-200 placeholder-gray-400 ${
                    isCustomTip
                      ? 'border-purple-500 ring-4 ring-purple-100'
                      : 'border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
                  }`}
                />
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of People
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">
                    👥
                  </span>
                  <input
                    type="text"
                    value={state.numberOfPeople}
                    onChange={handlePeopleChange}
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 sm:py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Reset Calculator
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Summary
                </h2>
                
                <div className="space-y-4">
                  {/* Tip Amount */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="text-gray-600 font-medium">Tip Amount</span>
                    <span className="text-2xl font-bold text-gray-800">
                      ${results.tipAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Total Amount */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="text-gray-600 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-800">
                      ${results.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Per Person Amount - Highlighted */}
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 mt-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="text-center">
                      <p className="text-purple-100 text-sm font-medium mb-1">
                        Amount Per Person
                      </p>
                      <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        ${results.perPersonAmount.toFixed(2)}
                      </p>
                      {parseInt(state.numberOfPeople) > 1 && (
                        <p className="text-purple-200 text-xs mt-2">
                          Split between {state.numberOfPeople} people
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Card */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-1">Quick Tip</h3>
                    <p className="text-sm text-indigo-700">
                      Standard tipping in restaurants is typically 15-20% of the bill before tax.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Made with <span className="text-red-500">♥</span> for better bill splitting
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;