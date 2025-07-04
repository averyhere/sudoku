import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card, CardProps, SuitSet, RankSet } from "@/components/card";

type CardDeckState = {
  deck: CardProps[];
  shuffle: (deck: CardProps[]) => void;
  useJokers: boolean;
  toggleJokers: () => void;
};

function getFreshDeck(includeJokers: boolean = false): CardProps[] {
  console.log("getFreshDeck", includeJokers);
  const deck: CardProps[] = [];
  SuitSet.forEach((suit) => {
    RankSet.forEach((rank) => {
      deck.push({ suit, rank, direction: "down" });
    });
  });
  if (!includeJokers) {
    const filteredDeck = deck.filter((card) => card.rank.label !== "Joker");
    return filteredDeck;
  }
  return deck;
}

export const useCardDeckStore = create<CardDeckState>()(
  persist(
    (set) => ({
      deck: getFreshDeck(),
      shuffle: (deck) =>
        set((state) => {
          if (!state.useJokers) {
            const filteredDeck = deck.filter(
              (card) => card.rank.label !== "Joker",
            );
            const shuffledDeck = filteredDeck.sort(() => Math.random() - 0.5);
            return { deck: shuffledDeck };
          }
          const shuffledDeck = deck.sort(() => Math.random() - 0.5);
          return { deck: shuffledDeck };
        }),
      useJokers: false,
      toggleJokers: () =>
        set((state) =>
          state.useJokers ? state : { useJokers: !state.useJokers },
        ),
    }),
    {
      name: "card-deck", // key in localStorage
    },
  ),
);
