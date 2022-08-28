import React from 'react';

type CardProps = {
  value: string;
  suit: string;
  hidden: boolean;
};

const Card: React.FC<CardProps> = ({ value, suit, hidden }) => {
  const getColor = () => {
    if (suit === '♠' || suit === '♣') {
      return "playcardBlack";
    }
    else {
      return "playcardRed";
    }
  }

  const getNaming = () => {
    if (suit === '♠') {
      return "spades";
    } else if (suit === '♦') {
      return "diamonds";
    } else if (suit === '♣') {
      return "clubs";
    } else if (suit === '♥') {
      return "hearts";
    } else {
      return "not found"
    }
  }

  const getCard = () => {
    if (hidden) {
      return (
        <div className={`card ${getNaming()}`}>
          <div className="back"></div>
        </div>
      );
    }
    else {
      return (
        <div className={`card ${getNaming()}`}>
          <div className="front">
            <div className="section top">
              <div className="container">
                <span className="rank">{value}</span>
                <span className="suit">{suit}</span>
              </div>
            </div>
            <div className="section center suit">{suit}</div>
            <div className="section bottom">
              <div className="container">
                <span className="rank">{value}</span>
                <span className="suit">{suit}</span>
              </div>
            </div>
          </div>
          <div className="back"></div>
        </div>
      );
    }
  }

  return (
    <>
      {getCard()}
    </>
  );
}

export default Card;