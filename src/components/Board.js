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

export default class Board extends React.Component {

  renderSquare(i) {
    return (<Square
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
              />);
  }

  render() {

    if (!this.props.player) {
      return null;
    }

    return (
      <div className="game">
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
      </div>
    );
  }
}
