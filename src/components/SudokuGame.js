"use client";

import { useState, useEffect } from "react";

const SudokuGame = () => {
  // Initialize empty boards with null values
  const createEmptyBoard = () =>
    Array(9)
      .fill()
      .map(() => Array(9).fill(null));

  const [board, setBoard] = useState(createEmptyBoard());
  const [selectedCell, setSelectedCell] = useState(null);
  const [initialBoard, setInitialBoard] = useState(createEmptyBoard());
  const [difficulty, setDifficulty] = useState("medium");
  const [gameStarted, setGameStarted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [solvedBoard, setSolvedBoard] = useState(null);

  // Auto-start game when component mounts
  useEffect(() => {
    startNewGame();
  }, []); // Empty dependency array means this runs once on mount

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    // Automatically start new game when difficulty changes
    startNewGame(newDifficulty);
  };

  // Test function to verify board generation and validation
  function testBoardGeneration() {
    console.log("Testing board generation...");
    const { initial, solved } = generateBoard(30); // Test with easy difficulty
    console.log("Initial board:", initial);
    console.log("Solved board:", solved);

    // Verify that the initial board is valid
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (initial[row][col] !== null) {
          const num = initial[row][col];
          initial[row][col] = null;
          if (!isValid(initial, row, col, num)) {
            console.error(
              `Invalid initial board at position (${row}, ${col}) with number ${num}`
            );
          }
          initial[row][col] = num;
        }
      }
    }

    // Verify that the solved board is valid
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = solved[row][col];
        solved[row][col] = null;
        if (!isValid(solved, row, col, num)) {
          console.error(
            `Invalid solved board at position (${row}, ${col}) with number ${num}`
          );
        }
        solved[row][col] = num;
      }
    }
  }

  // Generate a valid Sudoku board
  const generateBoard = (emptyCells) => {
    console.log("Generating board with", emptyCells, "empty cells");
    // Create a solved board
    const solvedBoard = createEmptyBoard();

    // Fill with initial numbers (1-9)
    fillBoard(solvedBoard);

    // Create the initial board by removing numbers
    const initial = solvedBoard.map((row) => [...row]);
    let cellsToRemove = emptyCells;
    const removedPositions = new Set();

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const pos = `${row},${col}`;

      if (!removedPositions.has(pos) && initial[row][col] !== null) {
        initial[row][col] = null;
        removedPositions.add(pos);
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
        if (board[row][col] === null) {
          // Shuffle numbers for randomness
          const shuffled = [...numbers].sort(() => Math.random() - 0.5);
          let validNumberFound = false;

          for (let num of shuffled) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) {
                validNumberFound = true;
                break;
              }
              board[row][col] = null;
            }
          }

          if (!validNumberFound) {
            return false;
          }
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
  const startNewGame = (newDifficulty = difficulty) => {
    console.log("Starting new game with difficulty:", newDifficulty);
    const emptyCells = {
      easy: 30,
      medium: 40,
      hard: 50,
    }[newDifficulty];

    const { initial, solved } = generateBoard(emptyCells);

    // Create deep copies to avoid reference issues
    setInitialBoard(initial.map((row) => [...row]));
    setBoard(initial.map((row) => [...row]));
    setSolvedBoard(solved.map((row) => [...row]));

    setGameStarted(true);
    setMistakes(0);
    setTimer(0);
    setIsRunning(true);
    setSelectedCell(null);

    console.log("Game started with board:", initial);
  };

  // Handle cell selection
  const handleCellClick = (row, col) => {
    if (initialBoard[row][col] === null) {
      setSelectedCell({ row, col });
      console.log("Selected cell:", row, col);
    }
  };

  // Handle number input
  const handleNumberInput = (number) => {
    if (!selectedCell || !gameStarted) return;
    const { row, col } = selectedCell;

    if (initialBoard[row][col] !== null) return;

    console.log("Attempting to place", number, "at position", row, col);

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = number;
    setBoard(newBoard);

    // Check if the move is valid against the solved board
    if (solvedBoard[row][col] !== number) {
      console.log("Invalid move:", number, "should be", solvedBoard[row][col]);
      setMistakes((prev) => prev + 1);
    } else {
      console.log("Valid move");
    }

    // Check if the game is complete
    if (!newBoard.some((row) => row.includes(null))) {
      console.log("Game complete!");
      setIsRunning(false);
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

  // Run tests when component mounts
  useEffect(() => {
    testBoardGeneration();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Game Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={() => startNewGame()}
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
      <div className="grid grid-cols-9 bg-gray-700 p-1 rounded-lg overflow-hidden">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`
                relative aspect-square flex items-center justify-center text-lg font-bold
                ${
                  (rowIndex + 1) % 3 === 0 && rowIndex < 8
                    ? "border-b-4 border-gray-600"
                    : "border-b border-gray-600"
                }
                ${
                  (colIndex + 1) % 3 === 0 && colIndex < 8
                    ? "border-r-4 border-gray-600"
                    : "border-r border-gray-600"
                }
                ${
                  selectedCell?.row === rowIndex &&
                  selectedCell?.col === colIndex
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white"
                }
                ${
                  initialBoard[rowIndex][colIndex] !== null
                    ? "text-gray-400"
                    : "text-white"
                }
                ${rowIndex === 0 ? "border-t-4 border-gray-600" : ""}
                ${colIndex === 0 ? "border-l-4 border-gray-600" : ""}
                cursor-pointer hover:bg-gray-700 transition-colors
              `}
            >
              {cell !== null ? cell : ""}
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
