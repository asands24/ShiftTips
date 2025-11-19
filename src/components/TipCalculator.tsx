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

  const [results, setResults] = useState({
    tipAmount: 0,
    totalAmount: 0,
    perPersonAmount: 0,
  });

  const predefinedTips = [5, 10, 15, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state.billAmount, state.tipPercentage, state.numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = state.tipPercentage || 0;
    const people = parseInt(state.numberOfPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonAmount = totalAmount / people;

    setResults({
      tipAmount: parseFloat(tipAmount.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      perPersonAmount: parseFloat(perPersonAmount.toFixed(2)),
    });
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipSelect = (percentage: number) => {
    setState({ ...state, tipPercentage: percentage, customTip: '' });
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, customTip: value, tipPercentage: parseFloat(value) || 0 });
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
      customTip: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Tip Calculator
          </h1>
          <p className="text-purple-100 text-lg">
            Calculate tips and split bills with ease
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
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
                    type="text"
                    value={state.billAmount}
                    onChange={handleBillChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
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
                      className={`py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                        state.tipPercentage === tip && state.customTip === ''
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                  <div className="relative">
                    <input
                      type="text"
                      value={state.customTip}
                      onChange={handleCustomTipChange}
                      placeholder="Custom"
                      className="w-full py-3 px-4 text-lg text-center border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 font-semibold"
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
                    type="text"
                    value={state.numberOfPeople}
                    onChange={handlePeopleChange}
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2">
                  Summary
                </h2>

                {/* Tip Amount */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Tip Amount</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-700">
                      ${results.tipAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-700">
                      ${results.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Per Person Amount - Highlighted */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 mt-4 shadow-lg transform transition-all duration-200 hover:scale-105">
                  <div className="text-center">
                    <p className="text-sm text-purple-100 font-semibold mb-2 uppercase tracking-wide">
                      Amount Per Person
                    </p>
                    <p className="text-5xl font-bold text-white">
                      ${results.perPersonAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset Calculator
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-100 text-sm">
            Made with ❤️ for better dining experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;