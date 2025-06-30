"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CARD_THEMES = {
  emoji: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"].flatMap((e) => [
    e,
    e,
  ]),
  symbols: ["★", "♦", "♠", "♣", "♥", "⚡", "☀", "☂"].flatMap((e) => [e, e]),
  animals: ["🦁", "🐯", "🐮", "🐷", "🐸", "🦉", "🦋", "🐙"].flatMap((e) => [
    e,
    e,
  ]),
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [theme, setTheme] = useState("emoji");
  const [bestScore, setBestScore] = useState(null);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Initialize or shuffle cards
  const initializeGame = () => {
    const selectedTheme = CARD_THEMES[theme];
    const shuffledCards = [...selectedTheme]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setGameStarted(true);
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setCards([]);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setTimeout(initializeGame, 100);
  };

  // Handle card click
  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 || // Don't allow flipping if two cards are already flipped
      flippedIndices.includes(index) || // Don't allow flipping the same card
      matchedPairs.includes(cards[index].content) // Don't allow flipping matched cards
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].content === cards[secondIndex].content) {
        // Match found
        setMatchedPairs([...matchedPairs, cards[firstIndex].content]);
        setFlippedIndices([]);
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && matchedPairs.length < 8) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, matchedPairs.length]);

  // Check for game completion and update best score
  useEffect(() => {
    if (matchedPairs.length === 8) {
      const score = Math.round(10000 / (moves * Math.sqrt(timer)));
      if (!bestScore || score > bestScore) {
        setBestScore(score);
        localStorage.setItem("memoryGameBestScore", score.toString());
      }
    }
  }, [matchedPairs.length, moves, timer, bestScore]);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem("memoryGameBestScore");
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
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
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
        >
          <option value="emoji">Emoji</option>
          <option value="symbols">Symbols</option>
          <option value="animals">Animals</option>
        </select>
        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Game
        </button>
        <div className="text-white space-x-4">
          <span>Time: {formatTime(timer)}</span>
          <span>Moves: {moves}</span>
          {bestScore && <span>Best Score: {bestScore}</span>}
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const isFlipped =
            flippedIndices.includes(index) ||
            matchedPairs.includes(card.content);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`
                relative w-full aspect-square cursor-pointer
                ${matchedPairs.includes(card.content) ? "opacity-50" : ""}
              `}
              style={{ perspective: "1000px" }}
            >
              <div
                className={`
                  absolute w-full h-full transition-transform duration-300
                  transform-gpu ${isFlipped ? "rotate-y-180" : ""}
                `}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of card (hidden when flipped) */}
                <div
                  className={`
                    absolute w-full h-full flex items-center justify-center
                    bg-gray-800 rounded-xl text-4xl
                    ${isFlipped ? "backface-hidden" : ""}
                    hover:bg-gray-700 transition-colors
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                {/* Back of card (shown when flipped) */}
                <div
                  className={`
                    absolute w-full h-full flex items-center justify-center
                    bg-gray-800 rounded-xl text-4xl rotate-y-180
                    ${!isFlipped ? "backface-hidden" : ""}
                  `}
                >
                  {card.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Complete Message */}
      {matchedPairs.length === 8 && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-green-500 mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-gray-400">
            You completed the game in {formatTime(timer)} with {moves} moves!
          </p>
          {bestScore && (
            <p className="text-blue-400 mt-2">
              Your score: {Math.round(10000 / (moves * Math.sqrt(timer)))}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;

// Add these styles to your global CSS file
const styles = `
.rotate-y-180 {
  transform: rotateY(180deg);
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
`;
