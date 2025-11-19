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

  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [amountPerPerson, setAmountPerPerson] = useState<number>(0);

  const tipOptions = [5, 10, 15, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state.billAmount, state.tipPercentage, state.numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = state.tipPercentage;
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
    setState({ ...state, tipPercentage: percentage, customTip: '' });
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setState({ ...state, customTip: value });
      if (value !== '') {
        setState({ ...state, tipPercentage: parseInt(value), customTip: value });
      }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            💰 Tip Calculator
          </h1>
          <p className="text-purple-100 text-lg sm:text-xl">
            Calculate tips and split bills with ease
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-300 hover:shadow-purple-500/20">
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
                    onChange={handleBillChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {tipOptions.map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => handleTipSelect(percentage)}
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        state.tipPercentage === percentage && state.customTip === ''
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 hover:text-purple-700'
                      }`}
                    >
                      {percentage}%
                    </button>
                  ))}
                  <input
                    type="text"
                    value={state.customTip}
                    onChange={handleCustomTipChange}
                    placeholder="Custom"
                    className="py-3 px-4 rounded-xl border-2 border-gray-200 text-center font-bold text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
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
                    onChange={handlePeopleChange}
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 space-y-4">
                {/* Tip Amount */}
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Tip Amount</p>
                    <p className="text-xs text-gray-500">Total tip</p>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">
                    ${tipAmount.toFixed(2)}
                  </p>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                    <p className="text-xs text-gray-500">Bill + tip</p>
                  </div>
                  <p className="text-3xl font-bold text-indigo-700">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>

                {/* Amount Per Person - Highlighted */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 shadow-lg transform transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-purple-100 font-medium">Per Person</p>
                      <p className="text-xs text-purple-200">Each pays</p>
                    </div>
                    <p className="text-4xl font-bold text-white drop-shadow-md">
                      ${amountPerPerson.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-lg rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 transform transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-400"
              >
                Reset Calculator
              </button>
            </div>
          </div>

          {/* Info Footer */}
          <div className="mt-8 pt-6 border-t-2 border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-600">{state.tipPercentage}%</p>
                <p className="text-xs text-gray-600 mt-1">Current Tip Rate</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-indigo-600">
                  ${state.billAmount || '0.00'}
                </p>
                <p className="text-xs text-gray-600 mt-1">Bill Amount</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-600">
                  {state.numberOfPeople || '1'}
                </p>
                <p className="text-xs text-gray-600 mt-1">People Splitting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-6">
          <p className="text-purple-100 text-sm">
            Tip generously and make someone's day! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;