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
    perPerson: 0
  });

  const predefinedTips = [5, 10, 15, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state.billAmount, state.tipPercentage, state.numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = state.tipPercentage;
    const people = parseInt(state.numberOfPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;

    setResults({
      tipAmount,
      totalAmount,
      perPerson
    });
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipSelect = (percentage: number) => {
    setState({ ...state, tipPercentage: percentage, customTip: '' });
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setState({ ...state, customTip: value });
      if (value !== '') {
        setState({ ...state, customTip: value, tipPercentage: parseInt(value) });
      }
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setState({ ...state, numberOfPeople: value || '1' });
    }
  };

  const resetCalculator = () => {
    setState({
      billAmount: '',
      tipPercentage: 15,
      numberOfPeople: '1',
      customTip: ''
    });
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
                    className="w-full pl-10 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedTips.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => handleTipSelect(tip)}
                      className={`py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        state.tipPercentage === tip && state.customTip === ''
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                  <input
                    type="text"
                    value={state.customTip}
                    onChange={handleCustomTipChange}
                    placeholder="Custom"
                    className="py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-center border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
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
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetCalculator}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Reset Calculator
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Calculation Results
                </h3>
                
                <div className="space-y-4">
                  {/* Tip Amount */}
                  <div className="flex justify-between items-center py-3 border-b border-purple-200">
                    <span className="text-gray-600 font-medium">Tip Amount:</span>
                    <span className="text-2xl font-bold text-purple-700">
                      ${results.tipAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Total Amount */}
                  <div className="flex justify-between items-center py-3 border-b border-purple-200">
                    <span className="text-gray-600 font-medium">Total Amount:</span>
                    <span className="text-2xl font-bold text-indigo-700">
                      ${results.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Per Person - Highlighted */}
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 mt-4">
                    <div className="text-center">
                      <p className="text-purple-100 text-sm font-semibold uppercase tracking-wider mb-2">
                        Amount Per Person
                      </p>
                      <p className="text-5xl sm:text-6xl font-bold text-white mb-1">
                        ${results.perPerson.toFixed(2)}
                      </p>
                      <p className="text-purple-200 text-xs mt-2">
                        Split between {state.numberOfPeople || 1} {parseInt(state.numberOfPeople) === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💡</span>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm mb-1">Quick Tip</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Standard tipping ranges from 15-20% for good service. 
                      Adjust based on your experience!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;