import React, { useState, useEffect } from 'react';
import './TipCalculator.css';

interface CalculationResults {
  tipAmount: number;
  totalAmount: number;
  tipPerPerson: number;
  totalPerPerson: number;
}

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [results, setResults] = useState<CalculationResults>({
    tipAmount: 0,
    totalAmount: 0,
    tipPerPerson: 0,
    totalPerPerson: 0,
  });

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = (): void => {
    const bill = parseFloat(billAmount) || 0;
    const tip = tipPercentage || 0;
    const people = parseInt(numberOfPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / people;
    const totalPerPerson = totalAmount / people;

    setResults({
      tipAmount,
      totalAmount,
      tipPerPerson,
      totalPerPerson,
    });
  };

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipPercentageClick = (percentage: number): void => {
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
      const customValue = parseFloat(value) || 0;
      setTipPercentage(customValue);
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value === '' ? '1' : value);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const resetCalculator = (): void => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople('1');
    setIsCustom(false);
    setResults({
      tipAmount: 0,
      totalAmount: 0,
      tipPerPerson: 0,
      totalPerPerson: 0,
    });
  };

  return (
    <div className="tip-calculator">
      <div className="calculator-container">
        <h1 className="calculator-title">Tip Calculator</h1>

        <div className="input-section">
          <label htmlFor="bill-amount" className="input-label">
            Bill Amount
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              id="bill-amount"
              type="text"
              inputMode="decimal"
              className="input-field bill-input"
              placeholder="0.00"
              value={billAmount}
              onChange={handleBillAmountChange}
            />
          </div>
        </div>

        <div className="input-section">
          <label className="input-label">Select Tip Percentage</label>
          <div className="tip-buttons">
            <button
              className={`tip-button ${!isCustom && tipPercentage === 15 ? 'active' : ''}`}
              onClick={() => handleTipPercentageClick(15)}
            >
              15%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 18 ? 'active' : ''}`}
              onClick={() => handleTipPercentageClick(18)}
            >
              18%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 20 ? 'active' : ''}`}
              onClick={() => handleTipPercentageClick(20)}
            >
              20%
            </button>
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
                placeholder="Enter custom %"
                value={customTip}
                onChange={handleCustomTipChange}
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="input-section">
          <label htmlFor="number-of-people" className="input-label">
            Number of People
          </label>
          <div className="input-wrapper">
            <span className="people-icon">👥</span>
            <input
              id="number-of-people"
              type="text"
              inputMode="numeric"
              className="input-field people-input"
              placeholder="1"
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
              min="1"
            />
          </div>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="result-row">
              <span className="result-label">Tip Amount:</span>
              <span className="result-value">{formatCurrency(results.tipAmount)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total Amount:</span>
              <span className="result-value total">{formatCurrency(results.totalAmount)}</span>
            </div>
            <div className="result-divider"></div>
            <div className="result-row highlight">
              <span className="result-label">Tip Per Person:</span>
              <span className="result-value">{formatCurrency(results.tipPerPerson)}</span>
            </div>
            <div className="result-row highlight">
              <span className="result-label">Total Per Person:</span>
              <span className="result-value total">{formatCurrency(results.totalPerPerson)}</span>
            </div>
          </div>
        </div>

        <button className="reset-button" onClick={resetCalculator}>
          Reset Calculator
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;