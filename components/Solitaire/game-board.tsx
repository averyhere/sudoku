"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Solitaire, solitaireDeal } from "klondike-solitaire";
import { Button } from "@/components/ui/button";
import { Card, CardSkeleton } from "@/components/Solitaire";

export function SolitaireBoard() {
  const [gameState, setGameState] = useState<Solitaire>(Solitaire());
  console.log("gameState", gameState);
  return (
    <div>
      <p>Solitaire Board</p>

      <div className="w-full grid grid-cols-7 gap-4">
        {/* Foundation */}
        {gameState.foundation.map((pile, index) => (
          <div key={index} className="relative">
            {pile.length > 0 ? (
              <Card {...pile[0]} direction="Up" />
            ) : (
              <CardSkeleton />
            )}
          </div>
        ))}

        {/* Waste */}
        <div className="relative"></div>

        {/* Pickup */}
        <div className="relative flex flex-row-reverse">
          {gameState.stock.length > 0 ? (
            <>
              {gameState.stock[0] && (
                // <div className="h-full w-8">
                <Card
                  {...gameState.stock[0]}
                  className="w-full absolute left-0 z-30"
                  direction="Up"
                />
                // </div>
              )}
              {gameState.stock[1] && (
                // <div className="h-full w-8">
                <Card
                  {...gameState.stock[1]}
                  className="w-full absolute left-8 z-20"
                  direction="Up"
                />
                // </div>
              )}
              {gameState.stock[3] && (
                // <div className="h-full w-8">
                <Card
                  {...gameState.stock[2]}
                  className="w-full absolute left-16 z-10"
                  direction="Up"
                />
                // </div>
              )}
            </>
          ) : (
            <CardSkeleton />
          )}
        </div>

        <div className="relative">
          {gameState.stock.length > 0 ? (
            <Card {...gameState.stock[0]} direction="Down" />
          ) : (
            <CardSkeleton />
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {/* Tableau */}
        {gameState.tableau.map((pile, index) => (
          <div key={index} className="flex flex-col">
            {pile.map((card, cardIndex) => (
              <div className="w-full h-8" key={cardIndex}>
                <Card {...card} direction="Down" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
