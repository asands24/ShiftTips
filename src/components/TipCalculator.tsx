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

  const tipPercentages = [5, 10, 15, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = isCustomTip ? parseFloat(state.customTip) || 0 : state.tipPercentage;
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Tip Calculator
          </h1>
          <p className="text-purple-100 text-lg">
            Calculate tips and split bills with ease
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Inputs */}
            <div className="space-y-6">
              {/* Bill Amount */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
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
                    className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {tipPercentages.map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => handleTipSelect(percentage)}
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                        !isCustomTip && state.tipPercentage === percentage
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white'
                      }`}
                    >
                      {percentage}%
                    </button>
                  ))}
                  <button
                    onClick={() => setIsCustomTip(true)}
                    className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                      isCustomTip
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white'
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Custom Tip Input */}
              {isCustomTip && (
                <div className="animate-fadeIn">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                    Custom Tip %
                  </label>
                  <input
                    type="text"
                    value={state.customTip}
                    onChange={handleCustomTipChange}
                    placeholder="Enter custom tip %"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              )}

              {/* Number of People */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
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
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 space-y-6 border-2 border-purple-100">
                {/* Tip Amount */}
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <div>
                    <p className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                      Tip Amount
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-700">
                      ${results.tipAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <div>
                    <p className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                      Total Amount
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-700">
                      ${results.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Per Person Amount - Highlighted */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-200">
                  <div className="text-center">
                    <p className="text-purple-100 font-semibold text-sm uppercase tracking-wider mb-2">
                      Amount Per Person
                    </p>
                    <p className="text-5xl font-bold text-white mb-1">
                      ${results.perPersonAmount.toFixed(2)}
                    </p>
                    <p className="text-purple-200 text-sm">
                      Split between {state.numberOfPeople || 1} {parseInt(state.numberOfPeople) === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-lg rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
              >
                Reset Calculator
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-100 text-sm">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;