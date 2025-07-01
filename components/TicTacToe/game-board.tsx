"use client";

import { useState } from "react";
import Minimax from "tic-tac-toe-minimax";
const { ComputerMove, GameStep, GameStatus } = Minimax;

export function TicTacToeBoard() {
  const huPlayer = "X";
  const aiPlayer = "O";
  const [gameState, setGameState] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(huPlayer);
  const [board, setBoard] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const symbols = {
    huPlayer: huPlayer,
    aiPlayer: aiPlayer,
  };
  const difficulty = "Hard";

  const handleGameStep = (cell: string, index: number) => {
    console.log("handleGameStep", cell, index);

    const newBoard = board;
    newBoard[index] = currentPlayer;
    const updatedState = GameStep(newBoard, symbols, difficulty);
    // setGameState(updatedState);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === huPlayer ? aiPlayer : huPlayer);
  };

  return (
    <div>
      <p>Tic Tac Toe Board</p>

      <div className="grid grid-cols-3 grid-rows-3 items-center justify-center">
        {board.map((cell, index) => (
          <button
            key={index}
            className="border border-gray-300 p-4 text-center"
            onClick={() => handleGameStep(cell, index)}
          >
            {typeof cell === "number" ? "" : cell}
          </button>
        ))}
      </div>
    </div>
  );
}
