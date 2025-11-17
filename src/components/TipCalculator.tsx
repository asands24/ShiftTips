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

  const predefinedTips = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = tipPercentage;
    const people = parseInt(numberOfPeople) || 1;

    if (bill > 0 && people > 0) {
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
    } else {
      setResults({
        tipAmount: 0,
        totalAmount: 0,
        tipPerPerson: 0,
        totalPerPerson: 0,
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
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTip(value);
      const customValue = parseFloat(value) || 0;
      setTipPercentage(customValue);
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setNumberOfPeople(value);
    }
  };

  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
  };

  const handleReset = () => {
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
          <div className="input-group">
            <label htmlFor="billAmount" className="input-label">
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

          <div className="input-group">
            <label className="input-label">Select Tip %</label>
            <div className="tip-buttons">
              {predefinedTips.map((tip) => (
                <button
                  key={tip}
                  className={`tip-button ${
                    tipPercentage === tip && !isCustom ? 'active' : ''
                  }`}
                  onClick={() => handleTipSelection(tip)}
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
                  className="input-field"
                  placeholder="Enter custom %"
                  value={customTip}
                  onChange={handleCustomTipChange}
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="numberOfPeople" className="input-label">
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
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Tip Amount</span>
              <span className="result-subtitle">per person</span>
            </div>
            <div className="result-value">
              ${formatCurrency(results.tipPerPerson)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Amount</span>
              <span className="result-subtitle">per person</span>
            </div>
            <div className="result-value highlight">
              ${formatCurrency(results.totalPerPerson)}
            </div>
          </div>

          <div className="divider"></div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Total Tip</span>
            </div>
            <div className="result-value secondary">
              ${formatCurrency(results.tipAmount)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span className="result-title">Grand Total</span>
            </div>
            <div className="result-value secondary">
              ${formatCurrency(results.totalAmount)}
            </div>
          </div>
        </div>

        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;