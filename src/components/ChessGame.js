"use client";

import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  function getMoveOptions(square) {
    // Get moves for the specific piece on this square
    const moves = game.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(255,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    // from square
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
      }
      return;
    }

    // to square
    // Get moves specifically for the piece we're moving
    const moves = game.moves({
      square: moveFrom,
      verbose: true,
    });

    // Find the matching move
    const move = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!move) {
      // Invalid move, try selecting a new piece
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
      } else {
        setMoveFrom("");
        setOptionSquares({});
      }
      return;
    }

    // Make the move
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move({
        from: move.from,
        to: move.to,
        promotion: "q", // always promote to queen for simplicity
      });

      if (result) {
        setGame(gameCopy);
        setMoveFrom("");
        setOptionSquares({});

        // Make computer move after a delay
        setTimeout(makeRandomMove, 300);
      }
    } catch (error) {
      console.error("Move error:", error);
      setMoveFrom("");
      setOptionSquares({});
    }
  }

  function onSquareRightClick(square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }

  function makeRandomMove() {
    try {
      const gameCopy = new Chess(game.fen());

      // Get all possible moves
      const moves = gameCopy.moves({ verbose: true });

      if (moves.length === 0 || gameCopy.isGameOver()) {
        return;
      }

      // Select a random move
      const randomIndex = Math.floor(Math.random() * moves.length);
      const move = moves[randomIndex];

      // Make the move using the full move object
      const result = gameCopy.move({
        from: move.from,
        to: move.to,
        promotion: "q", // always promote to queen for simplicity
      });

      if (result) {
        setGame(gameCopy);
      }
    } catch (error) {
      console.error("Computer move error:", error);
    }
  }

  const boardWrapper = {
    width: "100%",
    maxWidth: "70vh",
    margin: "0 auto",
    border: "2px solid #30363d",
    borderRadius: "4px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div style={boardWrapper}>
        <Chessboard
          position={game.fen()}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          customBoardStyle={{
            borderRadius: "4px",
          }}
          customSquareStyles={{
            ...moveSquares,
            ...optionSquares,
            ...rightClickedSquares,
          }}
        />
      </div>
      <div className="text-white text-center mt-4">
        {game.isGameOver() ? (
          <div>
            <p className="text-xl font-bold mb-2">
              Game Over!
              {game.isCheckmate()
                ? `${
                    game.turn() === "w" ? "Black" : "White"
                  } wins by checkmate!`
                : game.isDraw()
                ? "Game is a draw!"
                : "Game Over!"}
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => setGame(new Chess())}
            >
              New Game
            </button>
          </div>
        ) : (
          <p className="text-lg">
            {game.turn() === "w" ? "White" : "Black"}'s turn
            {game.isCheck() ? " (Check!)" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
