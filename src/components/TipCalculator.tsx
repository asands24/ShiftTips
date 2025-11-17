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
  }, [billAmount, tipPercentage, numberOfPeople, customTip, isCustom]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const percentage = isCustom ? (parseFloat(customTip) || 0) : tipPercentage;

    const tip = (bill * percentage) / 100;
    const total = bill + tip;
    const tipPP = tip / people;
    const totalPP = total / people;

    setTotalTip(tip);
    setTotalAmount(total);
    setTipPerPerson(tipPP);
    setTotalPerPerson(totalPP);
  };

  const handleTipButtonClick = (percentage: number) => {
    setIsCustom(false);
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const handleCustomTipClick = () => {
    setIsCustom(true);
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setIsCustom(true);
  };

  const handleBillAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBillAmount(value);
    }
  };

  const handleNumberOfPeopleChange = (value: string) => {
    // Allow only positive integers
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setNumberOfPeople(value);
    }
  };

  const resetCalculator = () => {
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
                onChange={(e) => handleBillAmountChange(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Select Tip Percentage</label>
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
                  inputMode="decimal"
                  placeholder="Enter custom %"
                  value={customTip}
                  onChange={(e) => handleCustomTipChange(e.target.value)}
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
                id="numberOfPeople"
                type="text"
                inputMode="numeric"
                placeholder="1"
                value={numberOfPeople}
                onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <h2 className="results-title">Results</h2>
          
          <div className="result-row">
            <div className="result-label">
              <span>Tip Per Person</span>
            </div>
            <div className="result-value">
              ${formatCurrency(tipPerPerson)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span>Total Per Person</span>
            </div>
            <div className="result-value highlight">
              ${formatCurrency(totalPerPerson)}
            </div>
          </div>

          <div className="result-divider"></div>

          <div className="result-row">
            <div className="result-label">
              <span>Total Tip</span>
            </div>
            <div className="result-value">
              ${formatCurrency(totalTip)}
            </div>
          </div>

          <div className="result-row">
            <div className="result-label">
              <span>Total Amount</span>
            </div>
            <div className="result-value highlight">
              ${formatCurrency(totalAmount)}
            </div>
          </div>

          <button className="reset-button" onClick={resetCalculator}>
            Reset Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;