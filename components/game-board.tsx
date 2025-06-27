"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getSudoku } from "sudoku-gen";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";

export function GameBoard() {
  const [difficulty, setDifficulty] = useState<string>();
  const [puzzleBoard, setPuzzleBoard] = useState<string[][]>();
  const [solutionBoard, setSolutionBoard] = useState<string[][]>();
  const [answerBoard, setAnswerBoard] = useState<string[][]>();
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );

  const startGame = (selection: Difficulty) => {
    const board = getSudoku(selection);
    setDifficulty(selection);
    setPuzzleBoard([
      [
        ...board.puzzle.slice(0, 3),
        ...board.puzzle.slice(9, 12),
        ...board.puzzle.slice(18, 21),
      ],
      [
        ...board.puzzle.slice(3, 6),
        ...board.puzzle.slice(12, 15),
        ...board.puzzle.slice(21, 24),
      ],
      [
        ...board.puzzle.slice(6, 9),
        ...board.puzzle.slice(15, 18),
        ...board.puzzle.slice(24, 27),
      ],
      [
        ...board.puzzle.slice(27, 30),
        ...board.puzzle.slice(36, 39),
        ...board.puzzle.slice(45, 48),
      ],
      [
        ...board.puzzle.slice(30, 33),
        ...board.puzzle.slice(39, 42),
        ...board.puzzle.slice(48, 51),
      ],
      [
        ...board.puzzle.slice(33, 36),
        ...board.puzzle.slice(42, 45),
        ...board.puzzle.slice(51, 54),
      ],
      [
        ...board.puzzle.slice(54, 57),
        ...board.puzzle.slice(63, 66),
        ...board.puzzle.slice(72, 75),
      ],
      [
        ...board.puzzle.slice(57, 60),
        ...board.puzzle.slice(66, 69),
        ...board.puzzle.slice(75, 78),
      ],
      [
        ...board.puzzle.slice(60, 63),
        ...board.puzzle.slice(69, 72),
        ...board.puzzle.slice(78, 81),
      ],
    ]);
    setSolutionBoard([
      [
        ...board.solution.slice(0, 3),
        ...board.solution.slice(9, 12),
        ...board.solution.slice(18, 21),
      ],
      [
        ...board.solution.slice(3, 6),
        ...board.solution.slice(12, 15),
        ...board.solution.slice(21, 24),
      ],
      [
        ...board.solution.slice(6, 9),
        ...board.solution.slice(15, 18),
        ...board.solution.slice(24, 27),
      ],
      [
        ...board.solution.slice(27, 30),
        ...board.solution.slice(36, 39),
        ...board.solution.slice(45, 48),
      ],
      [
        ...board.solution.slice(30, 33),
        ...board.solution.slice(39, 42),
        ...board.solution.slice(48, 51),
      ],
      [
        ...board.solution.slice(33, 36),
        ...board.solution.slice(42, 45),
        ...board.solution.slice(51, 54),
      ],
      [
        ...board.solution.slice(54, 57),
        ...board.solution.slice(63, 66),
        ...board.solution.slice(72, 75),
      ],
      [
        ...board.solution.slice(57, 60),
        ...board.solution.slice(66, 69),
        ...board.solution.slice(75, 78),
      ],
      [
        ...board.solution.slice(60, 63),
        ...board.solution.slice(69, 72),
        ...board.solution.slice(78, 81),
      ],
    ]);
    setAnswerBoard([
      [
        ...board.puzzle.slice(0, 3),
        ...board.puzzle.slice(9, 12),
        ...board.puzzle.slice(18, 21),
      ],
      [
        ...board.puzzle.slice(3, 6),
        ...board.puzzle.slice(12, 15),
        ...board.puzzle.slice(21, 24),
      ],
      [
        ...board.puzzle.slice(6, 9),
        ...board.puzzle.slice(15, 18),
        ...board.puzzle.slice(24, 27),
      ],
      [
        ...board.puzzle.slice(27, 30),
        ...board.puzzle.slice(36, 39),
        ...board.puzzle.slice(45, 48),
      ],
      [
        ...board.puzzle.slice(30, 33),
        ...board.puzzle.slice(39, 42),
        ...board.puzzle.slice(48, 51),
      ],
      [
        ...board.puzzle.slice(33, 36),
        ...board.puzzle.slice(42, 45),
        ...board.puzzle.slice(51, 54),
      ],
      [
        ...board.puzzle.slice(54, 57),
        ...board.puzzle.slice(63, 66),
        ...board.puzzle.slice(72, 75),
      ],
      [
        ...board.puzzle.slice(57, 60),
        ...board.puzzle.slice(66, 69),
        ...board.puzzle.slice(75, 78),
      ],
      [
        ...board.puzzle.slice(60, 63),
        ...board.puzzle.slice(69, 72),
        ...board.puzzle.slice(78, 81),
      ],
    ]);
    saveToLocalStorage();
  };

  const showSolution = () => {
    setAnswerBoard(solutionBoard);
    setIsCorrect(true);
    stopTimer();
  };

  const newGame = () => {
    setDifficulty(undefined);
    setPuzzleBoard(undefined);
    setSolutionBoard(undefined);
    setAnswerBoard(undefined);
    setIsCorrect(false);
    clearLocalStorage();
    resetTimer();
  };

  const resetGame = () => {
    setAnswerBoard(puzzleBoard);
    setIsCorrect(false);
    clearLocalStorage();
    resetTimer();
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        localStorage.setItem("sudokuTimer", (prevTimer + 1).toString());
        return prevTimer + 1;
      });
      saveToLocalStorage();
    }, 1000);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(0);
    localStorage.setItem("sudokuTimer", "0");
  };

  const secondsToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subBoardIndex: number,
    cellIndex: number,
  ) => {
    // Start timer if first input
    if (!timerInterval) {
      startTimer();
    }

    // Save to local storage
    saveToLocalStorage();

    // Check for errors
    if (
      e.target.value !== solutionBoard![subBoardIndex][cellIndex] &&
      e.target.value !== ""
    ) {
      setErrorCount(errorCount + 1);
    }

    // Update value
    const newBoard = [...answerBoard!];
    newBoard[subBoardIndex][cellIndex] = e.target.value;
    setAnswerBoard(newBoard);

    // Check if everything is correct;
    if (answerBoard === solutionBoard) {
      setIsCorrect(true);
      setShowSuccessModal(true);
      stopTimer();
    } else {
      setIsCorrect(false);
    }
  };

  const saveToLocalStorage = () => {
    console.log("saving");
    if (answerBoard)
      localStorage.setItem("sudokuAnswerBoard", JSON.stringify(answerBoard));
    if (solutionBoard)
      localStorage.setItem(
        "sudokuSolutionBoard",
        JSON.stringify(solutionBoard),
      );
    if (puzzleBoard)
      localStorage.setItem("sudokuPuzzleBoard", JSON.stringify(puzzleBoard));
    if (difficulty) localStorage.setItem("sudokuDifficulty", difficulty);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("sudokuAnswerBoard");
    localStorage.removeItem("sudokuSolutionBoard");
    localStorage.removeItem("sudokuPuzzleBoard");
    localStorage.removeItem("sudokuTimer");
    localStorage.removeItem("sudokuDifficulty");
  };

  const getLocalStorage = () => {
    if (localStorage.getItem("sudokuAnswerBoard"))
      setAnswerBoard(
        JSON.parse(localStorage.getItem("sudokuAnswerBoard") || "[]"),
      );
    if (localStorage.getItem("sudokuSolutionBoard"))
      setSolutionBoard(
        JSON.parse(localStorage.getItem("sudokuSolutionBoard") || "[]"),
      );
    if (localStorage.getItem("sudokuPuzzleBoard"))
      setPuzzleBoard(
        JSON.parse(localStorage.getItem("sudokuPuzzleBoard") || "[]"),
      );
    if (localStorage.getItem("sudokuTimer"))
      setTimer(Number(localStorage.getItem("sudokuTimer") || "0"));

    if (localStorage.getItem("sudokuDifficulty"))
      setDifficulty(localStorage.getItem("sudokuDifficulty") || "");
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  return (
    <>
      {puzzleBoard && (
        <>
          <div className="w-full flex flex-col max-w-xs p-2">
            <h2 className="capitalize text-center">Difficulty: {difficulty}</h2>
            <div className="flex justify-between">
              <p>{errorCount} errors</p>
              <p>{secondsToMinutes(timer)}</p>
            </div>
            <div className="game-board relative grid grid-cols-3 gap-0 aspect-square w-full border-2 border-gray-300">
              {puzzleBoard!.map((subBoard, subBoardIndex) => (
                <div
                  key={subBoardIndex}
                  className="grid grid-cols-3 gap-0 border border-gray-300"
                >
                  {subBoard.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={cn([
                        "relative border border-gray-300 aspect-square flex items-center justify-center cursor-default",
                      ])}
                    >
                      {cell !== "-" ? (
                        <span className="w-full h-full flex items-center justify-center bg-gray-100">
                          {cell}
                        </span>
                      ) : (
                        <>
                          <input
                            type="number"
                            min="1"
                            max="9"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            disabled={isCorrect}
                            className={cn([
                              "w-full h-full flex text-center text-xl font-bold cursor-pointer",
                              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:text-black",
                              "hover:bg-blue-100 disabled:!text-gray-500 disabled:bg-transparent disabled:cursor-default",
                              answerBoard![subBoardIndex][cellIndex] ===
                              solutionBoard![subBoardIndex][cellIndex]
                                ? "text-green-400"
                                : "text-red-400",
                            ])}
                            value={answerBoard![subBoardIndex][cellIndex]}
                            onChange={(e) =>
                              handleInputChange(e, subBoardIndex, cellIndex)
                            }
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex w-full justify-around">
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "1").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                1
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "2").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                2
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "3").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                3
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "4").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                4
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "5").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                5
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "6").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                6
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "7").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                7
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "8").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                8
              </span>
              <span
                className={cn([
                  "inline-flex items-center justify-center size-8",
                  answerBoard!.flat().filter((cell) => cell === "9").length ===
                  9
                    ? "text-gray-200"
                    : "text-black",
                ])}
              >
                9
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <Button
                onClick={newGame}
                variant="default"
                className="col-span-3"
              >
                New Game
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="col-start-4"
              >
                Reset
              </Button>
            </div>
            <Button
              disabled={solutionBoard === answerBoard}
              onClick={showSolution}
              size="sm"
              variant="link"
              className="text-xs"
            >
              Show Solution
            </Button>
          </div>
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center mb-4">
                  Congratulations!
                </DialogTitle>
                <DialogDescription>
                  You have completed the puzzle!
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}

      <Dialog defaultOpen={!difficulty} open={!difficulty}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center mb-4">
              Select a difficulty to begin:
            </DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
            <ToggleGroup
              type="single"
              variant="outline"
              className="flex w-full"
              onValueChange={(value) => startGame(value as Difficulty)}
            >
              <ToggleGroupItem className="cursor-pointer" value="easy">
                Easy
              </ToggleGroupItem>
              <ToggleGroupItem className="cursor-pointer" value="medium">
                Medium
              </ToggleGroupItem>
              <ToggleGroupItem className="cursor-pointer" value="hard">
                Hard
              </ToggleGroupItem>
              <ToggleGroupItem className="cursor-pointer" value="expert">
                Expert
              </ToggleGroupItem>
            </ToggleGroup>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
