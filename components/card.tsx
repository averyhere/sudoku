import { cn } from "@/lib/utils";
import Image from "next/image";

export type CardProps = {
  suit: Suit;
  rank: Rank;
  direction?: "up" | "down";
  className?: string;
};

export type Rank = Parameters<(typeof RankSet)["has"]>[0];
export const RankSet = new Set([
  {
    label: "Ace",
    ASCII: "A",
  },
  {
    label: "Two",
    ASCII: "2",
  },
  {
    label: "Three",
    ASCII: "3",
  },
  {
    label: "Four",
    ASCII: "4",
  },
  {
    label: "Five",
    ASCII: "5",
  },
  {
    label: "Six",
    ASCII: "6",
  },
  {
    label: "Seven",
    ASCII: "7",
  },
  {
    label: "Eight",
    ASCII: "8",
  },
  {
    label: "Nine",
    ASCII: "9",
  },
  {
    label: "Ten",
    ASCII: "T",
  },
  {
    label: "Jack",
    ASCII: "J",
  },
  {
    label: "Queen",
    ASCII: "Q",
  },
  {
    label: "King",
    ASCII: "K",
  },
  {
    label: "Joker",
    ASCII: "J",
  },
]);

export type Suit = Parameters<(typeof SuitSet)["has"]>[0];
export const SuitSet = new Set([
  {
    label: "Clubs",
    ASCII: "C",
  },
  {
    label: "Diamonds",
    ASCII: "D",
  },
  {
    label: "Hearts",
    ASCII: "H",
  },
  {
    label: "Spades",
    ASCII: "S",
  },
]);

export function Card({
  className,
  ...props
}: CardProps & { className?: string }) {
  const { suit, rank, direction, ...rest } = props;

  if (direction === "down") {
    return (
      <div
        className={cn(["box-shadow-xs rounded-xl aspect-[1/1.5]", className])}
        {...rest}
      >
        <div className="block">
          <Image
            src="/playing-cards/1B.svg"
            width={50}
            height={150}
            alt="Card is faced down"
            className="w-full grayscale"
          />
        </div>
      </div>
    );
  }

  const imgSrc = `/playing-cards/${rank.ASCII}${suit.ASCII}.svg`;
  console.log("Card rendered", imgSrc, props);
  return (
    <div
      className={cn(["box-shadow-xs rounded-xl aspect-[1/1.5]", className])}
      {...props}
    >
      <div className="block">
        <Image
          src={imgSrc}
          width={50}
          height={150}
          alt="Card is faced down"
          className="w-full grayscale"
        />
      </div>
    </div>
  );
}

export function CardSkeleton({ className, ...props }: { className?: string }) {
  return (
    <div
      className={cn([
        "box-shadow-xs rounded-xl aspect-[1/1.5] opacity-10",
        className,
      ])}
      {...props}
    >
      <div className="block">
        <Image
          src="/playing-cards/1B.svg"
          width={50}
          height={150}
          alt="Card is faced down"
          className="w-full grayscale"
        />
      </div>
    </div>
  );
}
