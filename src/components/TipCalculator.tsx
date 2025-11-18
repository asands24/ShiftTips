import React, { useState, useEffect } from 'react';
import './TipCalculator.css';

interface TipCalculatorState {
  billAmount: string;
  tipPercentage: number;
  customTip: string;
  numberOfPeople: string;
}

const TipCalculator: React.FC = () => {
  const [state, setState] = useState<TipCalculatorState>({
    billAmount: '',
    tipPercentage: 15,
    customTip: '',
    numberOfPeople: '1',
  });

  const [results, setResults] = useState({
    tipPerPerson: 0,
    totalPerPerson: 0,
    totalTip: 0,
    totalAmount: 0,
  });

  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    calculateTip();
  }, [state]);

  const calculateTip = () => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = isCustom ? parseFloat(state.customTip) || 0 : state.tipPercentage;
    const people = parseInt(state.numberOfPeople) || 1;

    if (bill > 0 && people > 0) {
      const tipAmount = (bill * tip) / 100;
      const total = bill + tipAmount;
      const tipPerPerson = tipAmount / people;
      const totalPerPerson = total / people;

      setResults({
        tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
        totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
        totalTip: parseFloat(tipAmount.toFixed(2)),
        totalAmount: parseFloat(total.toFixed(2)),
      });
    } else {
      setResults({
        tipPerPerson: 0,
        totalPerPerson: 0,
        totalTip: 0,
        totalAmount: 0,
      });
    }
  };

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, billAmount: value });
    }
  };

  const handleTipPercentageClick = (percentage: number) => {
    setIsCustom(false);
    setState({ ...state, tipPercentage: percentage, customTip: '' });
  };

  const handleCustomTipClick = () => {
    setIsCustom(true);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setState({ ...state, customTip: value });
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setState({ ...state, numberOfPeople: value });
    }
  };

  const handleReset = () => {
    setState({
      billAmount: '',
      tipPercentage: 15,
      customTip: '',
      numberOfPeople: '1',
    });
    setIsCustom(false);
  };

  const tipPercentages = [15, 18, 20];

  return (
    <div className="tip-calculator">
      <div className="calculator-card">
        <h1 className="title">Tip Calculator</h1>

        <div className="input-section">
          <label className="input-label">
            <span>Bill Amount</span>
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={state.billAmount}
                onChange={handleBillAmountChange}
                className="input-field bill-input"
              />
            </div>
          </label>

          <div className="tip-section">
            <span className="input-label">Select Tip %</span>
            <div className="tip-buttons">
              {tipPercentages.map((percentage) => (
                <button
                  key={percentage}
                  className={`tip-button ${
                    !isCustom && state.tipPercentage === percentage ? 'active' : ''
                  }`}
                  onClick={() => handleTipPercentageClick(percentage)}
                >
                  {percentage}%
                </button>
              ))}
              <button
                className={`tip-button ${isCustom ? 'active' : ''}`}
                onClick={handleCustomTipClick}
              >
                Custom
              </button>
            </div>
            {isCustom && (
              <div className="custom-tip-input">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter custom %"
                  value={state.customTip}
                  onChange={handleCustomTipChange}
                  className="input-field"
                  autoFocus
                />
              </div>
            )}
          </div>

          <label className="input-label">
            <span>Number of People</span>
            <div className="input-wrapper">
              <span className="currency-symbol">👥</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="1"
                value={state.numberOfPeople}
                onChange={handleNumberOfPeopleChange}
                className="input-field"
                min="1"
              />
            </div>
          </label>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="result-row">
              <span className="result-label">Tip per Person</span>
              <span className="result-value">${results.tipPerPerson.toFixed(2)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total per Person</span>
              <span className="result-value highlight">
                ${results.totalPerPerson.toFixed(2)}
              </span>
            </div>
            <div className="result-divider"></div>
            <div className="result-row">
              <span className="result-label">Total Tip</span>
              <span className="result-value">${results.totalTip.toFixed(2)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total Amount</span>
              <span className="result-value">${results.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;