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

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipSelection = (percentage: number) => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipClick = () => {
    setIsCustom(true);
    if (customTip) {
      setTipPercentage(parseFloat(customTip) || 0);
    }
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTip(value);
      setTipPercentage(parseFloat(value) || 0);
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value || '1');
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
                onChange={handleBillAmountChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Select Tip Percentage</label>
            <div className="tip-buttons">
              {predefinedTips.map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => handleTipSelection(percentage)}
                  className={`tip-button ${!isCustom && tipPercentage === percentage ? 'active' : ''}`}
                >
                  {percentage}%
                </button>
              ))}
              <button
                onClick={handleCustomTipClick}
                className={`tip-button ${isCustom ? 'active' : ''}`}
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
                <span className="percentage-symbol">%</span>
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
                onChange={handleNumberOfPeopleChange}
                className="input-field"
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <h2 className="results-title">Results</h2>
          
          <div className="result-grid">
            <div className="result-card highlight">
              <div className="result-label">Tip Per Person</div>
              <div className="result-value">${formatCurrency(result.tipPerPerson)}</div>
            </div>

            <div className="result-card highlight">
              <div className="result-label">Total Per Person</div>
              <div className="result-value">${formatCurrency(result.totalPerPerson)}</div>
            </div>

            <div className="result-card">
              <div className="result-label">Total Tip</div>
              <div className="result-value">${formatCurrency(result.totalTip)}</div>
            </div>

            <div className="result-card">
              <div className="result-label">Total Amount</div>
              <div className="result-value">${formatCurrency(result.totalAmount)}</div>
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