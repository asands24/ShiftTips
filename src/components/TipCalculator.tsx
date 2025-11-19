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

  const predefinedTips = [10, 15, 18, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [state]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = state.customTip ? parseFloat(state.customTip) : state.tipPercentage;
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
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipSelect = (tip: number) => {
    setState({ ...state, tipPercentage: tip, customTip: '' });
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setState({ ...state, customTip: value, tipPercentage: 0 });
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
    setTipAmount(0);
    setTotalAmount(0);
    setAmountPerPerson(0);
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 sm:p-8">
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
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium">
                    $
                  </span>
                  <input
                    type="text"
                    value={state.billAmount}
                    onChange={handleBillChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
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
                      className={`py-3 px-4 rounded-xl font-semibold text-base transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                        state.tipPercentage === tip && !state.customTip
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                  <div className="relative col-span-3 sm:col-span-1">
                    <input
                      type="text"
                      value={state.customTip}
                      onChange={handleCustomTipChange}
                      placeholder="Custom"
                      className="w-full py-3 px-4 text-base text-center border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 font-semibold"
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
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                    👥
                  </span>
                  <input
                    type="text"
                    value={state.numberOfPeople}
                    onChange={handlePeopleChange}
                    placeholder="1"
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 sm:py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-base hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transform hover:scale-[1.02]"
              >
                Reset Calculator
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Calculation Summary
                </h2>
                
                {/* Tip Amount */}
                <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Tip Amount</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {state.customTip || state.tipPercentage}% of bill
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                      ${formatCurrency(tipAmount)}
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                      <p className="text-xs text-gray-500 mt-0.5">Bill + Tip</p>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">
                      ${formatCurrency(totalAmount)}
                    </p>
                  </div>
                </div>

                {/* Amount Per Person - Highlighted */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
                  <div className="text-center">
                    <p className="text-sm text-purple-100 font-medium mb-1">
                      Amount Per Person
                    </p>
                    <p className="text-xs text-purple-200 mb-3">
                      Split between {state.numberOfPeople || '1'} {parseInt(state.numberOfPeople) === 1 ? 'person' : 'people'}
                    </p>
                    <div className="bg-white bg-opacity-20 rounded-lg py-4 px-6 backdrop-blur-sm">
                      <p className="text-4xl sm:text-5xl font-bold text-white">
                        ${formatCurrency(amountPerPerson)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Pro Tip
                    </p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Standard tipping ranges from 15-20% for good service. Adjust based on your experience!
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
            Made with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;