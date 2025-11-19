import React, { useState, ChangeEvent } from 'react';

interface TipCalculatorState {
  billAmount: string;
  tipPercentage: number;
  numberOfPeople: string;
}

const TipCalculator: React.FC = () => {
  const [state, setState] = useState<TipCalculatorState>({
    billAmount: '',
    tipPercentage: 15,
    numberOfPeople: '1',
  });

  const tipPercentages = [5, 10, 15, 20, 25];

  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipPercentageClick = (percentage: number) => {
    setState({ ...state, tipPercentage: percentage });
  };

  const handleNumberOfPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setState({ ...state, numberOfPeople: value });
    }
  };

  const calculateTip = (): number => {
    const bill = parseFloat(state.billAmount) || 0;
    return (bill * state.tipPercentage) / 100;
  };

  const calculateTotal = (): number => {
    const bill = parseFloat(state.billAmount) || 0;
    return bill + calculateTip();
  };

  const calculatePerPerson = (): number => {
    const people = parseInt(state.numberOfPeople) || 1;
    return calculateTotal() / people;
  };

  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Tip Calculator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Calculate tips and split bills with ease
          </p>
        </div>

        {/* Bill Amount Input */}
        <div className="mb-6">
          <label
            htmlFor="billAmount"
            className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
          >
            Bill Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-lg">
              $
            </span>
            <input
              id="billAmount"
              type="text"
              value={state.billAmount}
              onChange={handleBillAmountChange}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 sm:py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Tip Percentage Buttons */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3 text-sm sm:text-base">
            Select Tip Percentage
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
            {tipPercentages.map((percentage) => (
              <button
                key={percentage}
                onClick={() => handleTipPercentageClick(percentage)}
                className={`py-3 sm:py-4 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                  state.tipPercentage === percentage
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100'
                }`}
              >
                {percentage}%
              </button>
            ))}
          </div>
        </div>

        {/* Number of People Input */}
        <div className="mb-8">
          <label
            htmlFor="numberOfPeople"
            className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
          >
            Number of People
          </label>
          <input
            id="numberOfPeople"
            type="text"
            value={state.numberOfPeople}
            onChange={handleNumberOfPeopleChange}
            placeholder="1"
            className="w-full px-4 py-3 sm:py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 space-y-4">
          {/* Tip Amount */}
          <div className="flex justify-between items-center pb-4 border-b border-purple-200">
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Tip Amount
            </span>
            <span className="text-xl sm:text-2xl font-bold text-purple-600">
              {formatCurrency(calculateTip())}
            </span>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center pb-4 border-b border-purple-200">
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Total Amount
            </span>
            <span className="text-xl sm:text-2xl font-bold text-indigo-600">
              {formatCurrency(calculateTotal())}
            </span>
          </div>

          {/* Total Per Person - Highlighted */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 sm:p-6 shadow-lg transform transition-all duration-200 hover:scale-102">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white text-xs sm:text-sm font-medium opacity-90 block mb-1">
                  Per Person
                </span>
                <span className="text-white text-sm sm:text-base font-semibold">
                  Split between {state.numberOfPeople || '1'} {parseInt(state.numberOfPeople) === 1 ? 'person' : 'people'}
                </span>
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {formatCurrency(calculatePerPerson())}
              </span>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() =>
            setState({
              billAmount: '',
              tipPercentage: 15,
              numberOfPeople: '1',
            })
          }
          className="w-full mt-6 py-3 sm:py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200 transform hover:scale-102 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Reset Calculator
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;