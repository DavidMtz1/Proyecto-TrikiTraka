import React from 'react';

const GameInfo = (props) => {
  const {
    player,
    playerIsNext,
    history,
    winner,
    onClick,
    stepNumber,
  } = props;

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (player) {

    const opponent = (player === 'X') ? 'O' : 'X';
    status = 'Next player: ' + (playerIsNext ? player : opponent);
  } else {
    status = 'Selecciona X , O';
  }

//MOVIMIENTOS
  const moves = (history.length <= 1 || winner) ? [] : history.map((step, move) => {
    let moveText = 'Moviemiento #' + move;
    moveText = (stepNumber === move) ? <b>{moveText}</b> : moveText;

    const desc = move ? moveText : <b>Reiniciar Juego</b>;

    return (
        <div key={move}>
          <a href="#" onClick={() => onClick(move)}>{desc}</a>
        </div>
      );
  });

  return (
    <div className="game-info">
      <div>{status}</div>
      <div className="game-history">
      {moves}
      </div>
    </div>
  );
}

export default GameInfo;
