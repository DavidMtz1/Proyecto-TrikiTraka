import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import GameInfo from './const_Gameinfo';
import ChoosePlayer from './Const_Player';
import Modal from 'react-modal';

const INIT_HISTORY = [{
        squares: Array(9).fill(null),
      }];

const INIT_STATE = {
      history: INIT_HISTORY,
      playerIsNext: true,
      stepNumber: 0,
      modalIsOpen: false,
      player: null,
      winner: null
    };

    const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.90)'
    },
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-60%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 255, 0.3)'
    }
  };

export default class TicTacToeGame extends React.Component {
  constructor() {
    super();
    this.state = INIT_STATE;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalIsOpen) {
    this.setState({INIT_STATE, modalIsOpen: true});
  }


  closeModal() {
    this.setState({INIT_STATE, modalIsOpen: false});
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      playerIsNext: (step % 2) ? false : true,
      winner: null,
    });
  }

  resetGame(player) {
    this.setState({ INIT_STATE, player: player });
  }

  setPlayer(player) {
    this.setState({
      player: player,
    });
  }

  setMove(i) {
    const { stepNumber,
           player,
           playerIsNext,
           modalIsOpen,
           winner
    } = this.state;

    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) {
      return;
    }

    const opponent = (player === 'X') ? 'O' : 'X';
    squares[i] = playerIsNext ? player : opponent;

    const hasEmptyIndex = squares.some( (s) => { return (s != "O" && s != "X") } );


    let nextWinner = calculateWinner(squares);

    if (!nextWinner && !hasEmptyIndex) {
      nextWinner = "-";
    }

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      playerIsNext: !playerIsNext,
      winner: nextWinner,
    });

  }

  handleClick(i) {
    const {
      playerIsNext,
      winner
    } = this.state;

    if (playerIsNext && !winner) {
      this.setMove(i);
    }

  }

  render() {
    const {
      history,
      stepNumber,
      playerIsNext,
      player,
      modalIsOpen,
      winner
    } = this.state;

    const current = history[stepNumber];

    if (winner) {

      setTimeout(() => {this.resetGame(player)}, 2000);
    } else if (!playerIsNext) {
      let emptyIndex = 0;
      const hasEmptyIndex = current.squares.some( (s,idx) => {
        if (s != "O" && s != "X") {
          emptyIndex = idx;
          return true;
        };
      } );
      if (!hasEmptyIndex) {

        //console.log('No mas moviemientos, el juego a terminado');
      } else {

        const computer = player==="X"?"O":"X";
        const bestMove = calcMinimax(current.squares, computer, player, computer);

        setTimeout(() => {this.setMove(bestMove)}, 500);
      }

    }

    return (
      <div className="container">
        <div className="row">
          <div className="game-title">
          <Modal isOpen={this.state.modalIsOpen}
           style={customStyles}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <button type="button"  onClick={this.closeModal}><span aria-hidden="true">&times;</span></button><br/>
        Integrantes:
      <p>  Neyra Tellez Cano 15210771</p>
      <p>  David Ernesto Martinez Iribe 15211858</p>
          </Modal>
          <h3>TriKi Traka
          </h3>
            <small  onClick={this.openModal}>Creadores del Juego</small>
        </div>
        </div>
        <div className="row">
            <ChoosePlayer
              player={player}
              squares={current.squares}
              onClick={(i) => this.setPlayer(i)}
            />
            <Board
              player={player}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />

        </div>
        <div className="row">
            <GameInfo
              stepNumber={stepNumber}
              player={player}
              playerIsNext={playerIsNext}
              history={history}
              winner={winner}
              onClick={(move) => this.jumpTo(move)}
              />
        </div>

      </div>
    )
  }
}


function emptyIndexies(squares) {
  return  squares.reduce( (acc, val, idx) => {
        if (!val) {
            acc.push(idx);
        }
        return acc;
    }, [] );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isWinner(squares, player) {
    return calculateWinner(squares) === player;
}

function calcMinimax(squares, playerToHelp, human, computer) {

    function calcScores(squares, availSpots, depth) {

        if (isWinner(squares, computer)) {

            if (computer === playerToHelp) {
                return 10 - depth;
            } else {
                return depth - 10;
            }
        } else if (isWinner(squares, human)) {
            if (human === playerToHelp) {
                return 10 - depth;
            } else {
                return depth - 10;
            }
        } else if (availSpots.length === 0) {

            return 0;
        }

        return null;
    }


    function minimax(squares, player, depth) {

    // LUGAR DISPONIBLE
        const availSpots = emptyIndexies(squares);

        const result = calcScores(squares, availSpots, depth);

        if (result) {
            return result;
        }


        //SCORE
        const scores = [];
        const moves = availSpots.map((val, idx) => {

      const nextPlayer = (player === human) ? computer : human;
            squares[val] = player;
            const score = minimax(squares, nextPlayer, depth + 1);
            scores.push(score);

            squares[val] = null;
            return val;
        });

        let scoreIndex = 0;
        if (player === playerToHelp) {

            scoreIndex = scores.reduce(
                (iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        } else {

            scoreIndex = scores.reduce(
                (iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
        }

        if (depth === 0) {
            return moves[scoreIndex];
        }
        return scores[scoreIndex];
    }

    const res = minimax(squares, playerToHelp, 0);
    return res;
}
