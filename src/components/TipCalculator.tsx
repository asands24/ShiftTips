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

  const handleTipButtonClick = (percentage: number): void => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string): void => {
    setCustomTip(value);
    const customValue = parseFloat(value);
    if (!isNaN(customValue) && customValue >= 0) {
      setTipPercentage(customValue);
      setIsCustom(true);
    }
  };

  const handleBillAmountChange = (value: string): void => {
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleNumberOfPeopleChange = (value: string): void => {
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value === '' ? '1' : value);
    }
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
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
      <div className="calculator-card">
        <h1 className="calculator-title">Tip Calculator</h1>

        <div className="input-section">
          <label className="input-label">Bill Amount</label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="text"
              className="input-field bill-input"
              placeholder="0.00"
              value={billAmount}
              onChange={(e) => handleBillAmountChange(e.target.value)}
            />
          </div>
        </div>

        <div className="input-section">
          <label className="input-label">Select Tip %</label>
          <div className="tip-buttons">
            <button
              className={`tip-button ${!isCustom && tipPercentage === 15 ? 'active' : ''}`}
              onClick={() => handleTipButtonClick(15)}
            >
              15%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 18 ? 'active' : ''}`}
              onClick={() => handleTipButtonClick(18)}
            >
              18%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 20 ? 'active' : ''}`}
              onClick={() => handleTipButtonClick(20)}
            >
              20%
            </button>
            <input
              type="text"
              className={`tip-button custom-input ${isCustom ? 'active' : ''}`}
              placeholder="Custom"
              value={customTip}
              onChange={(e) => handleCustomTipChange(e.target.value)}
            />
          </div>
        </div>

        <div className="input-section">
          <label className="input-label">Number of People</label>
          <div className="input-wrapper">
            <span className="people-icon">👥</span>
            <input
              type="text"
              className="input-field people-input"
              placeholder="1"
              value={numberOfPeople}
              onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <div className="results-section">
          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Tip Amount</span>
              <span className="result-subtitle">per person</span>
            </div>
            <div className="result-value">${formatCurrency(results.tipPerPerson)}</div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Amount</span>
              <span className="result-subtitle">per person</span>
            </div>
            <div className="result-value">${formatCurrency(results.totalPerPerson)}</div>
          </div>

          <div className="divider"></div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Tip</span>
            </div>
            <div className="result-value total">${formatCurrency(results.tipAmount)}</div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Grand Total</span>
            </div>
            <div className="result-value total">${formatCurrency(results.totalAmount)}</div>
          </div>
        </div>

        <button className="reset-button" onClick={resetCalculator}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;