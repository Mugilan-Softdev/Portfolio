"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import ChessGame with no SSR to avoid hydration issues
const ChessGame = dynamic(() => import("./ChessGame"), { ssr: false });

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
    type: "chess",
  },
  {
    id: 2,
    title: "Sudoku",
    playLink: "https://sudoku.com",
    type: "external",
  },
  {
    id: 3,
    title: "Memory Cards",
    playLink: "https://www.memozor.com/memory-games",
    type: "external",
  },
  {
    id: 4,
    title: "Word Search",
    playLink: "https://thewordsearch.com",
    type: "external",
  },
];

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameClick = (game) => {
    if (game.type === "chess") {
      setSelectedGame(game);
    } else if (game.type === "external") {
      window.open(game.playLink, "_blank");
    }
  };

  return (
    <section id="games" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Games
          </h2>
        </div>

        {selectedGame?.type === "chess" ? (
          <div className="mb-8">
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Back to Games
            </button>
            <ChessGame />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {GAMES.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleGameClick(game)}
                className="group relative bg-gradient-to-br from-[#1A1F2B] to-[#2A2F3B] rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 aspect-[4/5] shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

                <div className="block h-full relative z-10">
                  <div className="h-[70%] w-full flex items-center justify-center p-6">
                    {GameIcons[game.title]}
                  </div>
                  <div className="h-[30%] flex items-center justify-center bg-gradient-to-r from-[#1A1F2B]/80 to-[#2A2F3B]/80 backdrop-blur-sm border-t border-white/10">
                    <h3 className="text-lg font-medium text-white text-center px-4 group-hover:text-blue-400 transition-colors duration-300">
                      {game.title}
                    </h3>
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
