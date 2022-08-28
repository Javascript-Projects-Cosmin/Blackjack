import React, { useState, useEffect } from 'react';

type ControlsProps = {
  balance: number,
  gameState: number,
  buttonState: any,
  betEvent: any,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ balance, gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent }) => {
  const [amount, setAmount] = useState(10);
  const [inputStyle, setInputStyle] = useState("controlsInput");

  useEffect(() => {
    validation();
  }, [amount, balance]);

  const validation = () => {
    if (amount > balance) {
      setInputStyle("controlsInputError");
      return false;
    }
    if (amount < 0.01) {
      setInputStyle("controlsInputError");
      return false;
    }
    setInputStyle("controlsInput");
    return true;
  }

  const amountChange = (e: any) => {
    setAmount(e.target.value);
  }

  const onBetClick = () => {
    if (validation()) {
      betEvent(Math.round(amount * 100) / 100);
    }
  }

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div className="controlsContainer">
          <div className="controlsBetContainer">
            <h4>Amount:</h4>
            <input autoFocus type='number' value={amount} onChange={amountChange} className={inputStyle} />
          </div>
          <button onClick={() => onBetClick()} className="controlsButton">Bet</button>
        </div>
      );
    }
    else {
      return (
        <div className="controlsContainer">
          <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className="controlsButton">Hit</button>
          <button onClick={() => standEvent()} disabled={buttonState.standDisabled} className="controlsButton">Stand</button>
          <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className="controlsButton">Reset</button>
        </div>
      );
    }
  }

  return (
    <>
      {getControls()}
    </>
  );
}

export default Controls;