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

  const predefinedTips = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = (): void => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = tipPercentage || 0;

    if (bill <= 0 || people <= 0) {
      setResults({
        tipPerPerson: 0,
        totalPerPerson: 0,
        totalTip: 0,
        totalAmount: 0,
      });
      return;
    }

    const totalTip = (bill * tip) / 100;
    const totalAmount = bill + totalTip;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = totalAmount / people;

    setResults({
      tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
      totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
      totalTip: parseFloat(totalTip.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    });
  };

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
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
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCustomTip(value);
      const customPercentage = parseFloat(value) || 0;
      setTipPercentage(customPercentage);
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value);
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

  return (
    <div className="tip-calculator">
      <div className="calculator-container">
        <h1 className="calculator-title">Tip Calculator</h1>

        <div className="input-section">
          <label className="input-label" htmlFor="billAmount">
            Bill Amount
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              id="billAmount"
              type="text"
              className="input-field"
              placeholder="0.00"
              value={billAmount}
              onChange={handleBillAmountChange}
            />
          </div>
        </div>

        <div className="input-section">
          <label className="input-label">Tip Percentage</label>
          <div className="tip-buttons">
            {predefinedTips.map((percentage) => (
              <button
                key={percentage}
                className={`tip-button ${
                  tipPercentage === percentage && !isCustom ? 'active' : ''
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
          <label className="input-label" htmlFor="numberOfPeople">
            Number of People
          </label>
          <div className="input-wrapper">
            <span className="people-icon">👥</span>
            <input
              id="numberOfPeople"
              type="text"
              className="input-field"
              placeholder="1"
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
            />
          </div>
        </div>

        <div className="results-section">
          <h2 className="results-title">Summary</h2>
          
          <div className="result-row">
            <span className="result-label">Total Tip:</span>
            <span className="result-value">${results.totalTip.toFixed(2)}</span>
          </div>

          <div className="result-row">
            <span className="result-label">Total Amount:</span>
            <span className="result-value">${results.totalAmount.toFixed(2)}</span>
          </div>

          <div className="result-row highlight">
            <span className="result-label">Tip Per Person:</span>
            <span className="result-value">${results.tipPerPerson.toFixed(2)}</span>
          </div>

          <div className="result-row highlight">
            <span className="result-label">Total Per Person:</span>
            <span className="result-value">${results.totalPerPerson.toFixed(2)}</span>
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