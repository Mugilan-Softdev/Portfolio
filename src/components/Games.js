"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import game components with no SSR to avoid hydration issues
const ChessGame = dynamic(() => import("./ChessGame"), { ssr: false });
const SudokuGame = dynamic(() => import("./SudokuGame"), { ssr: false });
const MemoryGame = dynamic(() => import("./MemoryGame"), { ssr: false });
const WordSearchGame = dynamic(() => import("./WordSearchGame"), { ssr: false });

const GameIcons = {
  Chess: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19h16v2H4v-2zm1.5-3h13l-1-4H6.5l-1 4zM7 8.5l1.5 3h7L17 8.5V8c0-1-.5-2.5-1.5-3 .5-1 .5-2.5-1-3.5-.5 0-1.5 1-1.5 1-.5-1-1.5-2-3-1-2 0-2 1.5-2 2-.5.5-1 1-1 2v3z"
      />
    </svg>
  ),
  Sudoku: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
      />
    </svg>
  ),
  "Memory Cards": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
      />
    </svg>
  ),
  "Word Search": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  ),
};

const GAMES = [
  {
    id: 1,
    title: "Chess",
    description: "Challenge yourself with a classic game of chess",
    image: "/chess.jpg",
    type: "chess",
  },
  {
    id: 2,
    title: "Sudoku",
    description: "Test your logical thinking with number puzzles",
    image: "/sudoku.jpg",
    type: "sudoku",
  },
  {
    id: 3,
    title: "Memory Cards",
    description: "Improve your memory with this matching game",
    image: "/memory.jpg",
    type: "memory",
  },
  {
    id: 4,
    title: "Word Search",
    description: "Find hidden words in this classic puzzle game",
    image: "/word search.webp",
    type: "wordsearch",
  },
];

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [hoveredGame, setHoveredGame] = useState(null);

  const handleGameClick = (game) => {
    if (["chess", "sudoku", "memory", "wordsearch"].includes(game.type)) {
      setSelectedGame(game);
    } else if (game.type === "external") {
      window.open(game.playLink, "_blank");
    }
  };

  const renderSelectedGame = () => {
    switch (selectedGame?.type) {
      case "chess":
        return <ChessGame />;
      case "sudoku":
        return <SudokuGame />;
      case "memory":
        return <MemoryGame />;
      case "wordsearch":
        return <WordSearchGame />;
      default:
        return null;
    }
  };

  return (
    <section id="games" className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
              Game Zone
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Take a break and enjoy these brain-training games. Challenge
              yourself and have fun!
            </p>
          </motion.div>
        </div>

        {selectedGame ? (
          <div className="relative">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedGame(null)}
              className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Games
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderSelectedGame()}
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GAMES.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredGame(game.id)}
                onHoverEnd={() => setHoveredGame(null)}
                onClick={() => handleGameClick(game)}
                className="group relative rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="relative h-[300px] w-full">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    animate={{
                      y: hoveredGame === game.id ? 0 : 20,
                      opacity: hoveredGame === game.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-300 mb-2"
                  >
                    {game.description}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {game.title}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-400">
                    <span className="text-sm">
                      {game.type === "external" ? "Play on Website" : "Play Now"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Games;
