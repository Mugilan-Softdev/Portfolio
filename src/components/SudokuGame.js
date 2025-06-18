"use client";

import { useState, useEffect } from "react";

const SudokuGame = () => {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [initialBoard, setInitialBoard] = useState(
    Array(9).fill(Array(9).fill(0))
  );
  const [difficulty, setDifficulty] = useState("medium");
  const [gameStarted, setGameStarted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Generate a valid Sudoku board
  const generateBoard = (emptyCells) => {
    // Create a solved board
    const solvedBoard = Array(9)
      .fill()
      .map(() => Array(9).fill(0));
    fillBoard(solvedBoard);

    // Create the initial board by removing numbers
    const initial = solvedBoard.map((row) => [...row]);
    let cellsToRemove = emptyCells;

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (initial[row][col] !== 0) {
        initial[row][col] = 0;
        cellsToRemove--;
      }
    }

    return { initial, solved: solvedBoard };
  };

  // Fill the board with valid numbers
  const fillBoard = (board) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // Shuffle numbers for randomness
          const shuffled = [...numbers].sort(() => Math.random() - 0.5);
          for (let num of shuffled) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Check if a number is valid in a position
  const isValid = (board, row, col, num) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  };

  // Start a new game
  const startNewGame = () => {
    const emptyCells = {
      easy: 30,
      medium: 40,
      hard: 50,
    }[difficulty];

    const { initial, solved } = generateBoard(emptyCells);
    setInitialBoard(initial.map((row) => [...row]));
    setBoard(initial.map((row) => [...row]));
    setGameStarted(true);
    setMistakes(0);
    setTimer(0);
    setIsRunning(true);
  };

  // Handle cell selection
  const handleCellClick = (row, col) => {
    if (initialBoard[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  // Handle number input
  const handleNumberInput = (number) => {
    if (!selectedCell || !gameStarted) return;
    const { row, col } = selectedCell;

    if (initialBoard[row][col] !== 0) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = number;
    setBoard(newBoard);

    // Check if the move is valid
    if (!isValid(newBoard, row, col, number)) {
      setMistakes((prev) => prev + 1);
    }
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Game Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={startNewGame}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Game
        </button>
        <div className="text-white">
          <span className="mr-4">Time: {formatTime(timer)}</span>
          <span>Mistakes: {mistakes}</span>
        </div>
      </div>

      {/* Sudoku Grid */}
      <div className="grid grid-cols-9 gap-[1px] bg-gray-700 p-[1px] rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`
                aspect-square flex items-center justify-center text-lg font-bold
                ${
                  (rowIndex + 1) % 3 === 0 && rowIndex < 8
                    ? "border-b border-gray-600"
                    : ""
                }
                ${
                  (colIndex + 1) % 3 === 0 && colIndex < 8
                    ? "border-r border-gray-600"
                    : ""
                }
                ${
                  selectedCell?.row === rowIndex &&
                  selectedCell?.col === colIndex
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white"
                }
                ${initialBoard[rowIndex][colIndex] !== 0 ? "text-gray-400" : ""}
                cursor-pointer hover:bg-gray-700 transition-colors
              `}
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))
        )}
      </div>

      {/* Number Input */}
      <div className="grid grid-cols-9 gap-2 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberInput(number)}
            className="aspect-square flex items-center justify-center text-lg font-bold
              bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SudokuGame;
