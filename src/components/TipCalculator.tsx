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

  const predefinedTips = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = (): void => {
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

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
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
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTip(value);
      const customValue = parseFloat(value) || 0;
      setTipPercentage(customValue);
      setIsCustom(true);
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = parseInt(value) || 1;
      if (numValue <= 100) {
        setNumberOfPeople(value);
      }
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

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  return (
    <div className="tip-calculator">
      <div className="calculator-container">
        <h1 className="calculator-title">Tip Calculator</h1>

        <div className="input-section">
          <div className="input-group">
            <label htmlFor="bill-amount">Bill Amount</label>
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                id="bill-amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={billAmount}
                onChange={handleBillChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Select Tip %</label>
            <div className="tip-buttons">
              {predefinedTips.map((tip) => (
                <button
                  key={tip}
                  onClick={() => handleTipClick(tip)}
                  className={`tip-button ${!isCustom && tipPercentage === tip ? 'active' : ''}`}
                >
                  {tip}%
                </button>
              ))}
              <div className="custom-tip-wrapper">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Custom"
                  value={customTip}
                  onChange={handleCustomTipChange}
                  className={`tip-button custom-input ${isCustom ? 'active' : ''}`}
                />
                {customTip && <span className="custom-percent">%</span>}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="number-people">Number of People</label>
            <div className="input-wrapper">
              <span className="currency-symbol">👥</span>
              <input
                id="number-people"
                type="text"
                inputMode="numeric"
                placeholder="1"
                value={numberOfPeople}
                onChange={handlePeopleChange}
                className="input-field"
                min="1"
                max="100"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="result-row">
              <span className="result-label">Tip Per Person</span>
              <span className="result-value">${formatCurrency(result.tipPerPerson)}</span>
            </div>
            <div className="result-row highlight">
              <span className="result-label">Total Per Person</span>
              <span className="result-value large">${formatCurrency(result.totalPerPerson)}</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-label">Total Tip Amount:</span>
              <span className="summary-value">${formatCurrency(result.totalTip)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Total Bill Amount:</span>
              <span className="summary-value">${formatCurrency(result.totalAmount)}</span>
            </div>
          </div>
        </div>

        <button onClick={handleReset} className="reset-button">
          Reset Calculator
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;