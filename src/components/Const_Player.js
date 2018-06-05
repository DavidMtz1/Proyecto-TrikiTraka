import React from 'react';

const Square = (props) => {
  const { onClick, value } = props;
  return (
    <button
      className="btn btn-primary square"
      onClick={onClick}>
      {value}
    </button>
  );
}

const ChoosePlayer = (props) => {
  const { onClick, player } = props;

  if (player) {
    return null;
  }

  return (
    <div className="game">
      <div className="board-row">
      <div className="zoom">
        <Square
          value="X"
          onClick={() => onClick("X")}
          />
            </div>
            <div className="zoom">
        <Square
          value="O"
          onClick={() => onClick("O")}
          />
            </div>
      </div>
    </div>
  );
}

export default ChoosePlayer;
