import React, { useState, useEffect } from 'react';
import './TipCalculator.css';

interface CalculationResult {
  tipPerPerson: number;
  totalPerPerson: number;
  totalTip: number;
  totalAmount: number;
}

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult>({
    tipPerPerson: 0,
    totalPerPerson: 0,
    totalTip: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = (): void => {
    const bill = parseFloat(billAmount) || 0;
    const tip = tipPercentage;
    const people = parseInt(numberOfPeople) || 1;

    if (bill > 0 && people > 0) {
      const totalTip = (bill * tip) / 100;
      const totalAmount = bill + totalTip;
      const tipPerPerson = totalTip / people;
      const totalPerPerson = totalAmount / people;

      setResult({
        tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
        totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
        totalTip: parseFloat(totalTip.toFixed(2)),
        totalAmount: parseFloat(totalAmount.toFixed(2)),
      });
    } else {
      setResult({
        tipPerPerson: 0,
        totalPerPerson: 0,
        totalTip: 0,
        totalAmount: 0,
      });
    }
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipClick = (percentage: number): void => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCustomTip(value);
      setIsCustom(true);
      const customValue = parseFloat(value) || 0;
      setTipPercentage(customValue);
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value || '1');
    }
  };

  const handleReset = (): void => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople('1');
    setIsCustom(false);
    setResult({
      tipPerPerson: 0,
      totalPerPerson: 0,
      totalTip: 0,
      totalAmount: 0,
    });
  };

  return (
    <div className="tip-calculator">
      <div className="calculator-container">
        <h1 className="calculator-title">Tip Calculator</h1>

        <div className="input-section">
          <label className="input-label" htmlFor="bill-amount">
            Bill Amount
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              id="bill-amount"
              type="text"
              className="input-field"
              placeholder="0.00"
              value={billAmount}
              onChange={handleBillChange}
            />
          </div>
        </div>

        <div className="input-section">
          <label className="input-label">Select Tip %</label>
          <div className="tip-buttons">
            <button
              className={`tip-button ${!isCustom && tipPercentage === 15 ? 'active' : ''}`}
              onClick={() => handleTipClick(15)}
            >
              15%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 18 ? 'active' : ''}`}
              onClick={() => handleTipClick(18)}
            >
              18%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 20 ? 'active' : ''}`}
              onClick={() => handleTipClick(20)}
            >
              20%
            </button>
            <input
              type="text"
              className={`tip-button custom-input ${isCustom ? 'active' : ''}`}
              placeholder="Custom"
              value={customTip}
              onChange={handleCustomTipChange}
            />
          </div>
        </div>

        <div className="input-section">
          <label className="input-label" htmlFor="number-of-people">
            Number of People
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">👥</span>
            <input
              id="number-of-people"
              type="text"
              className="input-field"
              placeholder="1"
              value={numberOfPeople}
              onChange={handlePeopleChange}
            />
          </div>
        </div>

        <div className="results-section">
          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Tip Per Person</span>
              <span className="result-subtitle">Individual tip amount</span>
            </div>
            <div className="result-value">${result.tipPerPerson.toFixed(2)}</div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Per Person</span>
              <span className="result-subtitle">Including tip</span>
            </div>
            <div className="result-value">${result.totalPerPerson.toFixed(2)}</div>
          </div>

          <div className="divider"></div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Tip</span>
              <span className="result-subtitle">All people</span>
            </div>
            <div className="result-value total">${result.totalTip.toFixed(2)}</div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Amount</span>
              <span className="result-subtitle">Bill + tip</span>
            </div>
            <div className="result-value total">${result.totalAmount.toFixed(2)}</div>
          </div>
        </div>

        <button className="reset-button" onClick={handleReset}>
          Reset Calculator
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;