import React, { useState, useEffect } from 'react';
import './TipCalculator.css';

interface TipCalculatorState {
  billAmount: string;
  tipPercentage: number;
  customTip: string;
  numberOfPeople: string;
}

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const [tipPerPerson, setTipPerPerson] = useState<number>(0);
  const [totalPerPerson, setTotalPerPerson] = useState<number>(0);
  const [totalTip, setTotalTip] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = tipPercentage;

    if (bill > 0 && people > 0) {
      const calculatedTip = (bill * tip) / 100;
      const calculatedTotal = bill + calculatedTip;
      const tipPerPersonAmount = calculatedTip / people;
      const totalPerPersonAmount = calculatedTotal / people;

      setTotalTip(calculatedTip);
      setTotalAmount(calculatedTotal);
      setTipPerPerson(tipPerPersonAmount);
      setTotalPerPerson(totalPerPersonAmount);
    } else {
      setTotalTip(0);
      setTotalAmount(0);
      setTipPerPerson(0);
      setTotalPerPerson(0);
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
    if (customTip) {
      setTipPercentage(parseFloat(customTip) || 0);
    }
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
      setNumberOfPeople(value === '' ? '1' : value);
    }
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople('1');
    setIsCustom(false);
    setTipPerPerson(0);
    setTotalPerPerson(0);
    setTotalTip(0);
    setTotalAmount(0);
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
            <label htmlFor="billAmount">Bill Amount</label>
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
            <label>Select Tip %</label>
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
              <div className="custom-tip-wrapper">
                <button
                  className={`tip-button ${isCustom ? 'active' : ''}`}
                  onClick={handleCustomTipClick}
                >
                  Custom
                </button>
                {isCustom && (
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="%"
                    value={customTip}
                    onChange={handleCustomTipChange}
                    className="custom-tip-input"
                    autoFocus
                  />
                )}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="numberOfPeople">Number of People</label>
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
          <div className="result-card">
            <div className="result-item">
              <span className="result-label">Tip per Person</span>
              <span className="result-value">${formatCurrency(tipPerPerson)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total per Person</span>
              <span className="result-value highlight">${formatCurrency(totalPerPerson)}</span>
            </div>
            <div className="result-divider"></div>
            <div className="result-item">
              <span className="result-label">Total Tip</span>
              <span className="result-value">${formatCurrency(totalTip)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Amount</span>
              <span className="result-value">${formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <button className="reset-button" onClick={handleReset}>
            Reset Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;