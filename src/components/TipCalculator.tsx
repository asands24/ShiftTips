import React, { useState, useEffect } from 'react';
import './TipCalculator.css';

interface CalculationResults {
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
  const [results, setResults] = useState<CalculationResults>({
    tipPerPerson: 0,
    totalPerPerson: 0,
    totalTip: 0,
    totalAmount: 0,
  });

  const presetTips = [15, 18, 20];

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

      setResults({
        tipPerPerson,
        totalPerPerson,
        totalTip,
        totalAmount,
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

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipSelect = (percentage: number): void => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipClick = (): void => {
    setIsCustom(true);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTip(value);
      const customPercentage = parseFloat(value) || 0;
      setTipPercentage(customPercentage);
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = parseInt(value) || 1;
      if (numValue > 0 && numValue <= 100) {
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
    setResults({
      tipPerPerson: 0,
      totalPerPerson: 0,
      totalTip: 0,
      totalAmount: 0,
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="tip-calculator">
      <div className="calculator-card">
        <h1 className="calculator-title">Tip Calculator</h1>
        
        <div className="input-section">
          <label className="input-label">
            Bill Amount
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                inputMode="decimal"
                className="input-field bill-input"
                value={billAmount}
                onChange={handleBillChange}
                placeholder="0.00"
              />
            </div>
          </label>
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
                className="input-field"
                value={customTip}
                onChange={handleCustomTipChange}
                placeholder="Enter custom %"
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="input-section">
          <label className="input-label">
            Number of People
            <input
              type="text"
              inputMode="numeric"
              className="input-field"
              value={numberOfPeople}
              onChange={handlePeopleChange}
              placeholder="1"
            />
          </label>
        </div>

        <div className="results-section">
          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Tip Per Person</span>
              <span className="result-subtitle">Individual tip amount</span>
            </div>
            <div className="result-value">
              {formatCurrency(results.tipPerPerson)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Per Person</span>
              <span className="result-subtitle">Including tip</span>
            </div>
            <div className="result-value highlight">
              {formatCurrency(results.totalPerPerson)}
            </div>
          </div>

          <div className="divider"></div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Tip</span>
            </div>
            <div className="result-value">
              {formatCurrency(results.totalTip)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Amount</span>
            </div>
            <div className="result-value">
              {formatCurrency(results.totalAmount)}
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