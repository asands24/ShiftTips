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
  const [perPersonAmount, setPerPersonAmount] = useState<number>(0);

  const tipOptions = [5, 10, 15, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = state.tipPercentage;
    const people = parseInt(state.numberOfPeople) || 1;

    const calculatedTip = (bill * tip) / 100;
    const total = bill + calculatedTip;
    const perPerson = total / people;

    setTipAmount(calculatedTip);
    setTotalAmount(total);
    setPerPersonAmount(perPerson);
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
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
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
      customTip: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
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
            {/* Left Column - Inputs */}
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
                  {tipOptions.map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => handleTipSelect(percentage)}
                      className={`py-3 sm:py-4 px-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                        state.tipPercentage === percentage && state.customTip === ''
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {percentage}%
                    </button>
                  ))}
                  <div className="relative col-span-3 sm:col-span-1">
                    <input
                      type="text"
                      value={state.customTip}
                      onChange={handleCustomTipChange}
                      placeholder="Custom"
                      className={`w-full py-3 sm:py-4 px-4 rounded-xl font-semibold text-base sm:text-lg border-2 transition-all duration-200 placeholder-gray-400 ${
                        state.customTip !== ''
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700'
                          : 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100`}
                    />
                    {state.customTip && (
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600 font-semibold">
                        %
                      </span>
                    )}
                  </div>
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
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Reset Calculator
              </button>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 font-medium">Tip Amount</span>
                  <span className="text-2xl font-bold text-purple-700">
                    ${tipAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-indigo-700">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Highlighted Per Person Amount */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl">
                <div className="text-center">
                  <div className="text-purple-100 text-sm font-semibold uppercase tracking-wider mb-2">
                    Amount Per Person
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                    ${perPersonAmount.toFixed(2)}
                  </div>
                  <div className="text-purple-200 text-xs sm:text-sm">
                    {parseInt(state.numberOfPeople) || 1} {parseInt(state.numberOfPeople) === 1 ? 'person' : 'people'}
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bill Amount:</span>
                    <span className="font-semibold text-gray-800">
                      ${parseFloat(state.billAmount || '0').toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tip ({state.tipPercentage}%):</span>
                    <span className="font-semibold text-gray-800">
                      ${tipAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-3 flex justify-between">
                    <span className="font-bold text-gray-800">Total:</span>
                    <span className="font-bold text-purple-600 text-lg">
                      ${totalAmount.toFixed(2)}
                    </span>
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