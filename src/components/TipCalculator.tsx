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
    const tip = tipPercentage || 0;

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

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleTipClick = (percentage: number) => {
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

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setTipPerPerson(0);
    setTotalPerPerson(0);
    setTotalTip(0);
    setTotalAmount(0);
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
              <button
                className={`tip-btn ${!isCustom && tipPercentage === 15 ? 'active' : ''}`}
                onClick={() => handleTipClick(15)}
              >
                15%
              </button>
              <button
                className={`tip-btn ${!isCustom && tipPercentage === 18 ? 'active' : ''}`}
                onClick={() => handleTipClick(18)}
              >
                18%
              </button>
              <button
                className={`tip-btn ${!isCustom && tipPercentage === 20 ? 'active' : ''}`}
                onClick={() => handleTipClick(20)}
              >
                20%
              </button>
              <div className="custom-tip-wrapper">
                <button
                  className={`tip-btn ${isCustom ? 'active' : ''}`}
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
          <h2 className="results-title">Results</h2>
          
          <div className="result-row">
            <div className="result-label">
              <span>Tip Amount</span>
              <small>per person</small>
            </div>
            <div className="result-value">
              ${tipPerPerson.toFixed(2)}
            </div>
          </div>

          <div className="result-row highlight">
            <div className="result-label">
              <span>Total Amount</span>
              <small>per person</small>
            </div>
            <div className="result-value">
              ${totalPerPerson.toFixed(2)}
            </div>
          </div>

          <div className="divider"></div>

          <div className="result-row">
            <div className="result-label">
              <span>Total Tip</span>
            </div>
            <div className="result-value secondary">
              ${totalTip.toFixed(2)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span>Grand Total</span>
            </div>
            <div className="result-value secondary">
              ${totalAmount.toFixed(2)}
            </div>
          </div>

          <button className="reset-btn" onClick={handleReset}>
            Reset Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;