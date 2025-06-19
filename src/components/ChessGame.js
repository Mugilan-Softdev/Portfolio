"use client";

import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function ChessGame() {
  const [game] = useState(new Chess());
  const [currentGame, setCurrentGame] = useState(game.fen());
  const [moveFrom, setMoveFrom] = useState("");
  const [validMoves, setValidMoves] = useState([]);
  const [optionSquares, setOptionSquares] = useState({});
  const [playerColor] = useState("white");

  function resetGame() {
    game.reset();
    setCurrentGame(game.fen());
    setMoveFrom("");
    setValidMoves([]);
    setOptionSquares({});
  }

  function showValidMoves(square) {
    const moves = game.moves({ square: square, verbose: true });
    console.log('Valid moves for', square, ':', moves);
    
    if (moves.length === 0) {
      setValidMoves([]);
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background: "rgba(0, 255, 0, 0.2)",
        borderRadius: "50%",
      };
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    
    setValidMoves(moves);
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    const piece = game.get(square);
    console.log('Clicked square:', square, 'Piece:', piece);

    // First click - selecting a piece
    if (!moveFrom) {
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        showValidMoves(square);
      }
      return;
    }

    // Second click - making a move
    console.log('Attempting move from', moveFrom, 'to', square);
    try {
      const move = game.move({
        from: moveFrom,
        to: square,
        promotion: 'q'
      });

      if (move) {
        console.log('Move successful:', move);
        setCurrentGame(game.fen());
        setMoveFrom("");
        setValidMoves([]);
        setOptionSquares({});

        // Make computer move
        setTimeout(() => {
          const moves = game.moves({ verbose: true });
          if (moves.length > 0) {
            const computerMove = moves[Math.floor(Math.random() * moves.length)];
            game.move(computerMove);
            setCurrentGame(game.fen());
          }
        }, 300);
      } else {
        // Invalid move, check if selecting new piece
        if (piece && piece.color === game.turn()) {
          setMoveFrom(square);
          showValidMoves(square);
        } else {
          setMoveFrom("");
          setValidMoves([]);
          setOptionSquares({});
        }
      }
    } catch (error) {
      console.error('Move error:', error);
      setMoveFrom("");
      setValidMoves([]);
      setOptionSquares({});
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-[600px] aspect-square">
        <Chessboard
          position={currentGame}
          onSquareClick={onSquareClick}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          customSquareStyles={optionSquares}
          boardOrientation={playerColor}
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800 transition-colors"
        >
          New Game
        </button>
      </div>

      {game.isGameOver() && (
        <div className="text-center mt-4">
          <h3 className="text-xl font-bold mb-2">
            Game Over!
            {game.isCheckmate()
              ? ` ${game.turn() === "w" ? "Black" : "White"} wins by checkmate!`
              : game.isDraw()
              ? " Game is a draw!"
              : ""}
          </h3>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
