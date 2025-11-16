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

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipSelect = (tip: number): void => {
    setTipPercentage(tip);
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

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value || '1');
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
      <div className="calculator-card">
        <h1 className="calculator-title">Tip Calculator</h1>
        
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="billAmount" className="input-label">
              Bill Amount
            </label>
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                id="billAmount"
                className="input-field"
                placeholder="0.00"
                value={billAmount}
                onChange={handleBillAmountChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Tip Percentage</label>
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
              <div className="custom-tip-wrapper">
                <input
                  type="text"
                  className={`tip-button custom-input ${
                    isCustom ? 'active' : ''
                  }`}
                  placeholder="Custom"
                  value={customTip}
                  onChange={handleCustomTipChange}
                />
                {customTip && <span className="custom-percent">%</span>}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="numberOfPeople" className="input-label">
              Number of People
            </label>
            <div className="input-wrapper">
              <span className="people-icon">👥</span>
              <input
                type="text"
                id="numberOfPeople"
                className="input-field"
                placeholder="1"
                value={numberOfPeople}
                onChange={handleNumberOfPeopleChange}
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="result-row">
              <span className="result-label">Tip per Person</span>
              <span className="result-value highlight">
                {formatCurrency(result.tipPerPerson)}
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">Total per Person</span>
              <span className="result-value highlight">
                {formatCurrency(result.totalPerPerson)}
              </span>
            </div>
            <div className="divider"></div>
            <div className="result-row">
              <span className="result-label">Total Tip</span>
              <span className="result-value">
                {formatCurrency(result.totalTip)}
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">Total Amount</span>
              <span className="result-value total">
                {formatCurrency(result.totalAmount)}
              </span>
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