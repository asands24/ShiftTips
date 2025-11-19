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

  const [isCustomTip, setIsCustomTip] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [perPersonAmount, setPerPersonAmount] = useState(0);

  const tipOptions = [5, 10, 15, 20, 25];

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
    setPerPersonAmount(perPerson);
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 sm:px-8 py-6 sm:py-8">
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
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
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
                    className="w-full pl-10 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {tipOptions.map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => handleTipSelect(percentage)}
                      className={`py-3 sm:py-4 px-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        !isCustomTip && state.tipPercentage === percentage
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
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
                    className={`py-3 sm:py-4 px-4 rounded-xl font-bold text-base sm:text-lg text-center border-2 transition-all duration-200 placeholder-gray-400 ${
                      isCustomTip
                        ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 focus:ring-4 focus:ring-purple-100'
                        : 'border-gray-200 bg-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
                    } focus:outline-none`}
                  />
                </div>
              </div>

              {/* Number of People */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
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
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
              >
                Reset Calculator
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8 space-y-6 border-2 border-purple-100">
                {/* Tip Amount */}
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Tip Amount
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Total tip</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                    ${tipAmount.toFixed(2)}
                  </p>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center pb-4 border-b-2 border-purple-200">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Total Amount
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Bill + tip</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-700">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>

                {/* Per Person - Highlighted */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-purple-100 uppercase tracking-wide">
                        Per Person
                      </p>
                      <p className="text-xs text-purple-200 mt-1">
                        Each person pays
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl sm:text-5xl font-extrabold text-white">
                        ${perPersonAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white rounded-xl p-4 sm:p-5 space-y-2 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    Breakdown
                  </h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bill per person:</span>
                    <span className="font-semibold text-gray-800">
                      ${((parseFloat(state.billAmount) || 0) / (parseInt(state.numberOfPeople) || 1)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tip per person:</span>
                    <span className="font-semibold text-gray-800">
                      ${(tipAmount / (parseInt(state.numberOfPeople) || 1)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Tip percentage:</span>
                    <span className="font-bold text-purple-600">
                      {isCustomTip ? state.customTip : state.tipPercentage}%
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