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

  const [tipAmountPerPerson, setTipAmountPerPerson] = useState<number>(0);
  const [totalPerPerson, setTotalPerPerson] = useState<number>(0);
  const [totalTip, setTotalTip] = useState<number>(0);
  const [totalBill, setTotalBill] = useState<number>(0);

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, customTip, numberOfPeople, isCustom]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = isCustom ? parseFloat(customTip) || 0 : tipPercentage;

    if (bill > 0 && people > 0 && tip >= 0) {
      const calculatedTotalTip = (bill * tip) / 100;
      const calculatedTotalBill = bill + calculatedTotalTip;
      const calculatedTipPerPerson = calculatedTotalTip / people;
      const calculatedTotalPerPerson = calculatedTotalBill / people;

      setTotalTip(calculatedTotalTip);
      setTotalBill(calculatedTotalBill);
      setTipAmountPerPerson(calculatedTipPerPerson);
      setTotalPerPerson(calculatedTotalPerPerson);
    } else {
      setTotalTip(0);
      setTotalBill(0);
      setTipAmountPerPerson(0);
      setTotalPerPerson(0);
    }
  };

  const handleTipButtonClick = (percentage: number) => {
    setTipPercentage(percentage);
    setIsCustom(false);
    setCustomTip('');
  };

  const handleCustomTipClick = () => {
    setIsCustom(true);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCustomTip(value);
    }
  };

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBillAmount(value);
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
            <label htmlFor="billAmount">Bill Amount</label>
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                id="billAmount"
                value={billAmount}
                onChange={handleBillAmountChange}
                placeholder="0.00"
                className="input-field"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Select Tip %</label>
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
                  value={customTip}
                  onChange={handleCustomTipChange}
                  placeholder="Enter custom %"
                  className="input-field"
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="numberOfPeople">Number of People</label>
            <div className="input-wrapper">
              <span className="people-icon">👥</span>
              <input
                type="text"
                id="numberOfPeople"
                value={numberOfPeople}
                onChange={handleNumberOfPeopleChange}
                placeholder="1"
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="result-item">
              <div className="result-label">
                <span>Tip Amount</span>
                <span className="per-person">per person</span>
              </div>
              <div className="result-amount">${formatCurrency(tipAmountPerPerson)}</div>
            </div>

            <div className="result-item">
              <div className="result-label">
                <span>Total</span>
                <span className="per-person">per person</span>
              </div>
              <div className="result-amount">${formatCurrency(totalPerPerson)}</div>
            </div>

            <div className="divider"></div>

            <div className="result-item summary">
              <div className="summary-row">
                <span>Total Tip:</span>
                <span className="summary-amount">${formatCurrency(totalTip)}</span>
              </div>
              <div className="summary-row">
                <span>Total Bill:</span>
                <span className="summary-amount">${formatCurrency(totalBill)}</span>
              </div>
            </div>
          </div>

          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;