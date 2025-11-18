import React, { useState, useEffect } from 'react';
import './TipCalculator.css';

interface CalculationResult {
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
  const [result, setResult] = useState<CalculationResult>({
    tipAmount: 0,
    totalAmount: 0,
    tipPerPerson: 0,
    totalPerPerson: 0,
  });

  const predefinedTips = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = tipPercentage || 0;
    const people = parseInt(numberOfPeople) || 1;

    if (bill > 0 && people > 0) {
      const tipAmount = (bill * tip) / 100;
      const totalAmount = bill + tipAmount;
      const tipPerPerson = tipAmount / people;
      const totalPerPerson = totalAmount / people;

      setResult({
        tipAmount,
        totalAmount,
        tipPerPerson,
        totalPerPerson,
      });
    } else {
      setResult({
        tipAmount: 0,
        totalAmount: 0,
        tipPerPerson: 0,
        totalPerPerson: 0,
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

  const handleCustomTipClick = () => {
    setIsCustom(true);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTip(value);
      const tipValue = parseFloat(value) || 0;
      setTipPercentage(tipValue);
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value);
    }
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople('1');
    setIsCustom(false);
    setResult({
      tipAmount: 0,
      totalAmount: 0,
      tipPerPerson: 0,
      totalPerPerson: 0,
    });
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  return (
    <div className="tip-calculator">
      <div className="calculator-container">
        <h1 className="title">Tip Calculator</h1>

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
                  className={`tip-button ${!isCustom && tipPercentage === tip ? 'active' : ''}`}
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
                  placeholder="Enter custom %"
                  value={customTip}
                  onChange={handleCustomTipChange}
                  className="input-field"
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="number-of-people">Number of People</label>
            <div className="input-wrapper">
              <span className="people-icon">👥</span>
              <input
                id="number-of-people"
                type="text"
                inputMode="numeric"
                placeholder="1"
                value={numberOfPeople}
                onChange={handlePeopleChange}
                className="input-field"
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <h2 className="results-title">Summary</h2>
          
          <div className="result-row">
            <span className="result-label">Tip Amount:</span>
            <span className="result-value">${formatCurrency(result.tipAmount)}</span>
          </div>

          <div className="result-row">
            <span className="result-label">Total Amount:</span>
            <span className="result-value">${formatCurrency(result.totalAmount)}</span>
          </div>

          <div className="divider"></div>

          <div className="result-row highlight">
            <span className="result-label">Tip per Person:</span>
            <span className="result-value">${formatCurrency(result.tipPerPerson)}</span>
          </div>

          <div className="result-row highlight">
            <span className="result-label">Total per Person:</span>
            <span className="result-value total">${formatCurrency(result.totalPerPerson)}</span>
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