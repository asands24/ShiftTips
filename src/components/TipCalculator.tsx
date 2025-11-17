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

  const handleTipSelection = (percentage: number) => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    const customValue = parseFloat(value) || 0;
    if (customValue >= 0) {
      setTipPercentage(customValue);
      setIsCustom(true);
    }
  };

  const handleBillAmountChange = (value: string) => {
    // Allow only valid number input
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleNumberOfPeopleChange = (value: string) => {
    // Allow only positive integers
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setNumberOfPeople(value);
    }
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  const resetCalculator = () => {
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
          <label htmlFor="billAmount" className="input-label">
            Bill Amount
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              id="billAmount"
              type="text"
              inputMode="decimal"
              className="input-field"
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
              onClick={() => handleTipSelection(15)}
            >
              15%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 18 ? 'active' : ''}`}
              onClick={() => handleTipSelection(18)}
            >
              18%
            </button>
            <button
              className={`tip-button ${!isCustom && tipPercentage === 20 ? 'active' : ''}`}
              onClick={() => handleTipSelection(20)}
            >
              20%
            </button>
            <input
              type="text"
              inputMode="decimal"
              className={`tip-button custom-input ${isCustom ? 'active' : ''}`}
              placeholder="Custom"
              value={customTip}
              onChange={(e) => handleCustomTipChange(e.target.value)}
            />
          </div>
        </div>

        <div className="input-section">
          <label htmlFor="numberOfPeople" className="input-label">
            Number of People
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">👥</span>
            <input
              id="numberOfPeople"
              type="text"
              inputMode="numeric"
              className="input-field"
              placeholder="1"
              value={numberOfPeople}
              onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
            />
          </div>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="result-row">
              <span className="result-label">Tip per Person</span>
              <span className="result-value">${formatCurrency(result.tipPerPerson)}</span>
            </div>
            <div className="result-row highlight">
              <span className="result-label">Total per Person</span>
              <span className="result-value large">${formatCurrency(result.totalPerPerson)}</span>
            </div>
            <div className="divider"></div>
            <div className="result-row">
              <span className="result-label">Total Tip</span>
              <span className="result-value">${formatCurrency(result.totalTip)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total Bill</span>
              <span className="result-value">${formatCurrency(result.totalAmount)}</span>
            </div>
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