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

  const tipOptions = [5, 10, 15, 20, 25];

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipSelection = (tip: number) => {
    setState({ ...state, tipPercentage: tip, customTip: '' });
    setIsCustomTip(false);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, customTip: value });
      setIsCustomTip(true);
      if (value !== '') {
        setState({ ...state, customTip: value, tipPercentage: parseFloat(value) });
      }
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setState({ ...state, numberOfPeople: value });
    }
  };

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = isCustomTip ? parseFloat(state.customTip) || 0 : state.tipPercentage;
    const people = parseInt(state.numberOfPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;
    const tipPerPerson = tipAmount / people;

    return {
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      perPerson: perPerson.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
    };
  };

  const results = calculateTip();

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            💰 Tip Calculator
          </h1>
          <p className="text-purple-100 text-lg">
            Calculate tips and split bills with ease
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Bill Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bill Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
                    $
                  </span>
                  <input
                    type="text"
                    value={state.billAmount}
                    onChange={handleBillAmountChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
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
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        state.tipPercentage === tip && !isCustomTip
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
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
                    className={`py-3 px-4 rounded-xl font-bold text-lg text-center border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
                      isCustomTip
                        ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50'
                        : 'border-gray-300 bg-gray-100 hover:border-purple-400'
                    }`}
                  />
                </div>
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of People
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                    👥
                  </span>
                  <input
                    type="text"
                    value={state.numberOfPeople}
                    onChange={handleNumberOfPeopleChange}
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Reset
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Summary
                </h2>

                {/* Tip Amount */}
                <div className="flex justify-between items-center py-3 border-b border-purple-200">
                  <span className="text-gray-600 font-medium">Tip Amount</span>
                  <span className="text-xl font-bold text-gray-800">
                    ${results.tipAmount}
                  </span>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center py-3 border-b border-purple-200">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-gray-800">
                    ${results.totalAmount}
                  </span>
                </div>

                {/* Tip Per Person */}
                <div className="flex justify-between items-center py-3 border-b border-purple-200">
                  <span className="text-gray-600 font-medium">Tip / Person</span>
                  <span className="text-xl font-bold text-gray-800">
                    ${results.tipPerPerson}
                  </span>
                </div>

                {/* Total Per Person - Highlighted */}
                <div className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:scale-105">
                  <div className="text-center">
                    <p className="text-purple-100 text-sm font-semibold mb-2">
                      Total Per Person
                    </p>
                    <p className="text-5xl font-bold text-white drop-shadow-md">
                      ${results.perPerson}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="font-bold text-amber-900 mb-1">Tip Guide</h3>
                    <p className="text-sm text-amber-800">
                      15% for good service, 20% for excellent service, and 25% for outstanding service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-100 text-sm">
            Made with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;