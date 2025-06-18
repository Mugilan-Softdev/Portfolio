"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WORD_LISTS = {
  easy: ["CAT", "DOG", "RAT", "BAT", "PIG"],
  medium: ["PYTHON", "REACT", "NEXT", "NODE", "CODE"],
  hard: ["JAVASCRIPT", "TYPESCRIPT", "PROGRAMMING", "DEVELOPER", "SOFTWARE"],
};

const GRID_SIZES = {
  easy: 8,
  medium: 10,
  hard: 12,
};

const DIRECTIONS = [
  [0, 1], // right
  [1, 0], // down
  [1, 1], // diagonal down-right
  [-1, 1], // diagonal up-right
];

const WordSearchGame = () => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selection, setSelection] = useState({
    start: null,
    current: null,
    cells: [],
  });
  const [difficulty, setDifficulty] = useState("easy");
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestTimes, setBestTimes] = useState({});

  // Initialize game
  const initializeGame = () => {
    const gridSize = GRID_SIZES[difficulty];
    const selectedWords = WORD_LISTS[difficulty];
    const newGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(""));
    const placedWords = [];

    // Place words in the grid
    for (const word of selectedWords) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const direction =
          DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const [dx, dy] = direction;
        const startX = Math.floor(Math.random() * gridSize);
        const startY = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(word, startX, startY, dx, dy, newGrid, gridSize)) {
          placeWord(word, startX, startY, dx, dy, newGrid);
          placedWords.push(word);
          placed = true;
        }
        attempts++;
      }
    }

    // Fill empty cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === "") {
          newGrid[i][j] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }

    setGrid(newGrid);
    setWords(placedWords);
    setFoundWords([]);
    setTimer(0);
    setGameStarted(true);
  };

  // Check if a word can be placed at the given position and direction
  const canPlaceWord = (word, startX, startY, dx, dy, grid, size) => {
    if (
      startX + dx * (word.length - 1) >= size ||
      startX + dx * (word.length - 1) < 0
    )
      return false;
    if (
      startY + dy * (word.length - 1) >= size ||
      startY + dy * (word.length - 1) < 0
    )
      return false;

    for (let i = 0; i < word.length; i++) {
      const x = startX + dx * i;
      const y = startY + dy * i;
      if (grid[x][y] !== "" && grid[x][y] !== word[i]) return false;
    }
    return true;
  };

  // Place a word in the grid
  const placeWord = (word, startX, startY, dx, dy, grid) => {
    for (let i = 0; i < word.length; i++) {
      const x = startX + dx * i;
      const y = startY + dy * i;
      grid[x][y] = word[i];
    }
  };

  // Handle cell selection
  const handleCellSelect = (row, col) => {
    if (!gameStarted) return;

    if (!selection.start) {
      setSelection({
        start: { row, col },
        current: { row, col },
        cells: [[row, col]],
      });
    } else {
      const newCells = getSelectedCells(
        selection.start.row,
        selection.start.col,
        row,
        col
      );
      setSelection({
        ...selection,
        current: { row, col },
        cells: newCells,
      });
    }
  };

  // Handle mouse up - check if word is found
  const handleSelectionEnd = () => {
    if (!selection.start || !selection.current) return;

    const selectedWord = selection.cells
      .map(([row, col]) => grid[row][col])
      .join("");

    const reversedWord = selectedWord.split("").reverse().join("");

    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
    } else if (
      words.includes(reversedWord) &&
      !foundWords.includes(reversedWord)
    ) {
      setFoundWords([...foundWords, reversedWord]);
    }

    setSelection({ start: null, current: null, cells: [] });
  };

  // Get cells between start and end points
  const getSelectedCells = (startRow, startCol, endRow, endCol) => {
    const cells = [];
    const dx = Math.sign(endRow - startRow);
    const dy = Math.sign(endCol - startCol);
    const length =
      Math.max(Math.abs(endRow - startRow), Math.abs(endCol - startCol)) + 1;

    for (let i = 0; i < length; i++) {
      cells.push([startRow + dx * i, startCol + dy * i]);
    }

    return cells;
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && foundWords.length < words.length) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, foundWords.length, words.length]);

  // Check for game completion
  useEffect(() => {
    if (gameStarted && foundWords.length === words.length) {
      const currentBestTime = bestTimes[difficulty];
      if (!currentBestTime || timer < currentBestTime) {
        setBestTimes((prev) => ({
          ...prev,
          [difficulty]: timer,
        }));
        localStorage.setItem(
          "wordSearchBestTimes",
          JSON.stringify({
            ...bestTimes,
            [difficulty]: timer,
          })
        );
      }
    }
  }, [
    foundWords.length,
    words.length,
    timer,
    difficulty,
    bestTimes,
    gameStarted,
  ]);

  // Load best times from localStorage
  useEffect(() => {
    const savedBestTimes = localStorage.getItem("wordSearchBestTimes");
    if (savedBestTimes) {
      setBestTimes(JSON.parse(savedBestTimes));
    }
  }, []);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Game Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
          disabled={gameStarted}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Game
        </button>
        <div className="text-white">
          <span className="mr-4">Time: {formatTime(timer)}</span>
          <span>
            Found: {foundWords.length}/{words.length}
          </span>
        </div>
      </div>

      {/* Word List */}
      <div className="mb-6 flex flex-wrap gap-2">
        {words.map((word) => (
          <div
            key={word}
            className={`px-3 py-1 rounded-full text-sm ${
              foundWords.includes(word)
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Game Grid */}
      <div
        className="grid gap-1 bg-gray-900 p-1 rounded-lg select-none"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZES[difficulty]}, minmax(0, 1fr))`,
        }}
        onMouseLeave={handleSelectionEnd}
        onMouseUp={handleSelectionEnd}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selection.cells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );
            const isFound = foundWords.some((word) => {
              const selectedWord = selection.cells
                .map(([r, c]) => grid[r][c])
                .join("");
              return word === selectedWord;
            });

            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                onMouseDown={() => handleCellSelect(rowIndex, colIndex)}
                onMouseEnter={() => {
                  if (selection.start) handleCellSelect(rowIndex, colIndex);
                }}
                className={`
                  aspect-square flex items-center justify-center
                  text-lg font-bold cursor-pointer
                  ${
                    isSelected
                      ? isFound
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300"
                  }
                  hover:bg-gray-700 transition-colors
                `}
              >
                {cell}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Game Complete Message */}
      {foundWords.length === words.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <h3 className="text-2xl font-bold text-green-500 mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-gray-400">
            You found all words in {formatTime(timer)}!
          </p>
          {bestTimes[difficulty] && (
            <p className="text-blue-400 mt-2">
              Best Time: {formatTime(bestTimes[difficulty])}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default WordSearchGame;
