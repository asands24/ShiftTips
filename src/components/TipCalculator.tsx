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

  const tipPercentages = [5, 10, 15, 20, 25];

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipPercentageClick = (percentage: number) => {
    setState({ ...state, tipPercentage: percentage, customTip: '' });
    setIsCustomTip(false);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, customTip: value, tipPercentage: parseFloat(value) || 0 });
      setIsCustomTip(true);
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setState({ ...state, numberOfPeople: value });
    }
  };

  const calculateTip = (): number => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = state.tipPercentage || 0;
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight">
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
                    inputMode="decimal"
                    value={state.billAmount}
                    onChange={handleBillAmountChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {tipPercentages.map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => handleTipPercentageClick(percentage)}
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                        state.tipPercentage === percentage && !isCustomTip
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {percentage}%
                    </button>
                  ))}
                  <input
                    type="text"
                    inputMode="decimal"
                    value={state.customTip}
                    onChange={handleCustomTipChange}
                    placeholder="Custom"
                    className={`py-3 px-4 rounded-xl font-bold text-lg text-center border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      isCustomTip
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 bg-gray-100 hover:border-gray-300'
                    }`}
                  />
                </div>
              </div>

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
                    inputMode="numeric"
                    value={state.numberOfPeople}
                    onChange={handleNumberOfPeopleChange}
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-4 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 px-6 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Reset
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-purple-200">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Tip Amount</p>
                      <p className="text-xs text-gray-500 mt-1">Per person</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                      ${calculateTipPerPerson().toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:shadow-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-purple-100 font-medium">Total Per Person</p>
                        <p className="text-xs text-purple-200 mt-1">Including tip</p>
                      </div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">
                        ${calculatePerPerson().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Subtotal:</span>
                  <span className="text-gray-900 font-bold text-lg">
                    ${parseFloat(state.billAmount || '0').toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Tip ({state.tipPercentage}%):</span>
                  <span className="text-purple-700 font-bold text-lg">
                    ${calculateTip().toFixed(2)}
                  </span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-bold text-lg">Grand Total:</span>
                    <span className="text-gray-900 font-bold text-xl">
                      ${calculateTotal().toFixed(2)}
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