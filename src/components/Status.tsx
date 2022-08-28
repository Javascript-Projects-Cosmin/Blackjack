import React from 'react';

type StatusProps = {
  message: string,
  balance: number
};

const Status: React.FC<StatusProps> = ({ message, balance }) => {
  return (
    <div className="statusContainer">
      <div className="status">
        <h1 className="statusValue">{message}</h1>
      </div>
      <div className="balance">
        <h1 className="statusValue">${balance}</h1>
      </div>
    </div>
  );
}

export default Status;