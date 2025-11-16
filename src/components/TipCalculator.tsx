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

  const presetTips = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = tipPercentage || 0;

    if (bill > 0 && people > 0) {
      const totalTip = (bill * tip) / 100;
      const totalAmount = bill + totalTip;
      const tipPerPerson = totalTip / people;
      const totalPerPerson = totalAmount / people;

      setResult({
        tipPerPerson,
        totalPerPerson,
        totalTip,
        totalAmount,
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

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipSelect = (percentage: number) => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTip(value);
      setIsCustom(true);
      const customPercentage = parseFloat(value) || 0;
      setTipPercentage(customPercentage);
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value === '' ? '1' : value);
    }
  };

  const handleReset = () => {
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

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  return (
    <div className="tip-calculator">
      <div className="calculator-card">
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
              inputMode="decimal"
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
            {presetTips.map((tip) => (
              <button
                key={tip}
                className={`tip-button ${
                  tipPercentage === tip && !isCustom ? 'active' : ''
                }`}
                onClick={() => handleTipSelect(tip)}
              >
                {tip}%
              </button>
            ))}
            <input
              type="text"
              inputMode="decimal"
              className={`tip-button custom-input ${
                isCustom ? 'active' : ''
              }`}
              placeholder="Custom"
              value={customTip}
              onChange={handleCustomTipChange}
            />
          </div>
        </div>

        <div className="input-section">
          <label className="input-label" htmlFor="num-people">
            Number of People
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </span>
            <input
              id="num-people"
              type="text"
              inputMode="numeric"
              className="input-field"
              placeholder="1"
              value={numberOfPeople}
              onChange={handlePeopleChange}
              min="1"
            />
          </div>
        </div>

        <div className="results-section">
          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Tip Per Person</span>
              <span className="result-subtitle">Individual tip amount</span>
            </div>
            <div className="result-amount">
              ${formatCurrency(result.tipPerPerson)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Per Person</span>
              <span className="result-subtitle">Including tip</span>
            </div>
            <div className="result-amount">
              ${formatCurrency(result.totalPerPerson)}
            </div>
          </div>

          <div className="result-divider"></div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Tip</span>
              <span className="result-subtitle">All people</span>
            </div>
            <div className="result-amount total">
              ${formatCurrency(result.totalTip)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Amount</span>
              <span className="result-subtitle">Bill + tip</span>
            </div>
            <div className="result-amount total">
              ${formatCurrency(result.totalAmount)}
            </div>
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