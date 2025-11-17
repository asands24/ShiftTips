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
    totalAmount: 0
  });

  const presetTips = [15, 18, 20];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = tipPercentage;

    if (bill > 0 && people > 0) {
      const totalTipAmount = (bill * tip) / 100;
      const totalBillAmount = bill + totalTipAmount;
      const tipPerPerson = totalTipAmount / people;
      const totalPerPerson = totalBillAmount / people;

      setResult({
        tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
        totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
        totalTip: parseFloat(totalTipAmount.toFixed(2)),
        totalAmount: parseFloat(totalBillAmount.toFixed(2))
      });
    } else {
      setResult({
        tipPerPerson: 0,
        totalPerPerson: 0,
        totalTip: 0,
        totalAmount: 0
      });
    }
  };

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipPercentageClick = (percentage: number) => {
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
      const customPercentage = parseFloat(value) || 0;
      setTipPercentage(customPercentage);
    }
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      tipPerPerson: 0,
      totalPerPerson: 0,
      totalTip: 0,
      totalAmount: 0
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
                inputMode="decimal"
                placeholder="0.00"
                value={billAmount}
                onChange={handleBillAmountChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Select Tip %</label>
            <div className="tip-buttons">
              {presetTips.map((tip) => (
                <button
                  key={tip}
                  onClick={() => handleTipPercentageClick(tip)}
                  className={`tip-button ${
                    !isCustom && tipPercentage === tip ? 'active' : ''
                  }`}
                >
                  {tip}%
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
            <div className="result-item highlight">
              <span className="result-label">Tip per Person</span>
              <span className="result-value">${result.tipPerPerson.toFixed(2)}</span>
            </div>
            
            <div className="result-item highlight">
              <span className="result-label">Total per Person</span>
              <span className="result-value">${result.totalPerPerson.toFixed(2)}</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Total Tip</span>
              <span className="result-value">${result.totalTip.toFixed(2)}</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Total Amount</span>
              <span className="result-value">${result.totalAmount.toFixed(2)}</span>
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