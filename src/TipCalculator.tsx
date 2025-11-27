import React, { useState } from 'react';
import './TipCalculator.css';

interface Props {
  billAmount: number;
}

const TipCalculator: React.FC<Props> = ({ billAmount }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customTip, setCustomTip] = useState(0);

  const calculateTotalCost = () => {
    const tip = (billAmount / 100) * tipPercentage;
    const total = billAmount + tip;
    setTotalCost(total);
  };

  const handleTipPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipPercentage(parseInt(e.target.value, 10));
    calculateTotalCost();
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(parseInt(e.target.value, 10));
    calculateTotalCost();
  };

  return (
    <div className="tip-calculator">
      <input
        type="number"
        value={tipPercentage}
        onChange={handleTipPercentageChange}
        placeholder="Tip Percentage (%)"
      />
      <br />
      <input
        type="number"
        value={customTip}
        onChange={handleCustomTipChange}
        placeholder="Custom Tip"
      />
      <br />
      <p>Total Cost: ${totalCost.toFixed(2)}</p>
    </div>
  );
};

export default TipCalculator;