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
    const tip = isCustom ? parseFloat(customTip) || 0 : tipPercentage;
    const people = parseInt(numberOfPeople) || 1;

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

  const handleTipSelect = (tip: number) => {
    setTipPercentage(tip);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setIsCustom(true);
    const customValue = parseFloat(value) || 0;
    setTipPercentage(customValue);
  };

  const handleBillAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleNumberOfPeopleChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
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
                className="input-field"
                placeholder="0.00"
                value={billAmount}
                onChange={(e) => handleBillAmountChange(e.target.value)}
              />
            </div>
          </label>

          <label className="input-label">
            Select Tip %
            <div className="tip-buttons">
              {predefinedTips.map((tip) => (
                <button
                  key={tip}
                  className={`tip-button ${
                    !isCustom && tipPercentage === tip ? 'active' : ''
                  }`}
                  onClick={() => handleTipSelect(tip)}
                >
                  {tip}%
                </button>
              ))}
              <input
                type="text"
                inputMode="numeric"
                className={`tip-button custom-input ${
                  isCustom ? 'active' : ''
                }`}
                placeholder="Custom"
                value={customTip}
                onChange={(e) => handleCustomTipChange(e.target.value)}
              />
            </div>
          </label>

          <label className="input-label">
            Number of People
            <div className="input-wrapper">
              <span className="people-icon">👥</span>
              <input
                type="text"
                inputMode="numeric"
                className="input-field"
                placeholder="1"
                value={numberOfPeople}
                onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
                min="1"
              />
            </div>
          </label>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="result-row">
              <span className="result-label">Tip Amount</span>
              <span className="result-value">${formatCurrency(result.totalTip)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total Amount</span>
              <span className="result-value">${formatCurrency(result.totalAmount)}</span>
            </div>
            <div className="result-divider"></div>
            <div className="result-row highlight">
              <div>
                <div className="result-label-main">Tip Per Person</div>
                <div className="result-sublabel">Each person pays</div>
              </div>
              <span className="result-value-main">${formatCurrency(result.tipPerPerson)}</span>
            </div>
            <div className="result-row highlight">
              <div>
                <div className="result-label-main">Total Per Person</div>
                <div className="result-sublabel">Including tip</div>
              </div>
              <span className="result-value-main">${formatCurrency(result.totalPerPerson)}</span>
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