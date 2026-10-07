import React, { useState } from 'react';
import './TipCalculator.css';

interface TipCalculatorProps {
  billAmount: number;
  taxRate: number;
  tipPercentage: number;
}

const TipCalculator = () => {
  const [customTip, setCustomTip] = useState<number | null>(null);

  const calculateTotal = (billAmount: number, taxRate: number, customTip: number | null) => {
    let tax = billAmount * taxRate / 100;
    let tip = billAmount * (customTip || tipPercentage) / 100;

    return billAmount + tax + tip;
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(parseInt(e.target.value));
  };

  if (!customTip) {
    return (
      <div>
        <h2>Tip Calculator</h2>
        <input
          type="number"
          value={customTip}
          onChange={handleCustomTipChange}
          placeholder="Enter custom tip percentage (in percent)"
        />
        <button onClick={() => console.log(calculateTotal(100, 8, customTip))}>Calculate Total</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Tip Calculator</h2>
      <p>Custom Tip: {customTip}%</p>
      <input
        type="number"
        value={customTip}
        onChange={handleCustomTipChange}
        placeholder="Enter custom tip percentage (in percent)"
      />
      <button onClick={() => console.log(calculateTotal(100, 8, customTip))}>Calculate Total</button>
    </div>
  );
};

export default TipCalculator;