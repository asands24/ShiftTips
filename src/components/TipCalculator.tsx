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

  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [amountPerPerson, setAmountPerPerson] = useState<number>(0);
  const [isCustomTip, setIsCustomTip] = useState<boolean>(false);

  const predefinedTips = [5, 10, 15, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = isCustomTip ? parseFloat(state.customTip) || 0 : state.tipPercentage;
    const people = parseInt(state.numberOfPeople) || 1;

    const calculatedTip = (bill * tip) / 100;
    const total = bill + calculatedTip;
    const perPerson = total / people;

    setTipAmount(calculatedTip);
    setTotalAmount(total);
    setAmountPerPerson(perPerson);
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
      setState({ ...state, numberOfPeople: value || '1' });
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
    setTipAmount(0);
    setTotalAmount(0);
    setAmountPerPerson(0);
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-8 px-4 sm:px-6 lg:px-8">
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
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
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
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedTips.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => handleTipSelect(tip)}
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        !isCustomTip && state.tipPercentage === tip
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-purple-100 hover:to-indigo-100 hover:text-purple-700'
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
                    className={`py-3 px-4 rounded-xl font-bold text-lg text-center border-2 transition-all duration-200 ${
                      isCustomTip
                        ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 focus:ring-4 focus:ring-purple-300'
                        : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:ring-4 focus:ring-purple-300'
                    } focus:outline-none`}
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-4 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Results Card */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="space-y-6">
                  {/* Tip Amount */}
                  <div className="pb-4 border-b border-purple-400/30">
                    <p className="text-purple-200 text-sm font-semibold uppercase tracking-wide mb-2">
                      Tip Amount
                    </p>
                    <p className="text-white text-3xl sm:text-4xl font-bold">
                      ${formatCurrency(tipAmount)}
                    </p>
                  </div>

                  {/* Total Amount */}
                  <div className="pb-4 border-b border-purple-400/30">
                    <p className="text-purple-200 text-sm font-semibold uppercase tracking-wide mb-2">
                      Total Amount
                    </p>
                    <p className="text-white text-3xl sm:text-4xl font-bold">
                      ${formatCurrency(totalAmount)}
                    </p>
                  </div>

                  {/* Amount Per Person - Highlighted */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border-2 border-white/20">
                    <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide mb-2 flex items-center">
                      <span className="mr-2">💰</span>
                      Amount Per Person
                    </p>
                    <p className="text-white text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
                      ${formatCurrency(amountPerPerson)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                Reset Calculator
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                  Current Tip
                </p>
                <p className="text-purple-700 text-2xl font-bold">
                  {isCustomTip ? state.customTip || '0' : state.tipPercentage}%
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                  Tip Per Person
                </p>
                <p className="text-purple-700 text-2xl font-bold">
                  ${formatCurrency(tipAmount / (parseInt(state.numberOfPeople) || 1))}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                  Bill Per Person
                </p>
                <p className="text-purple-700 text-2xl font-bold">
                  ${formatCurrency((parseFloat(state.billAmount) || 0) / (parseInt(state.numberOfPeople) || 1))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-200 text-sm">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;