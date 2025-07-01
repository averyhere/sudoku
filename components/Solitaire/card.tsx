import { cn } from "@/lib/utils";
import { Card as CardProps, suitToColor } from "klondike-solitaire";
import Image from "next/image";

export function Card({
  className,
  ...props
}: CardProps & React.HTMLAttributes<"div">) {
  const { suit, rank, direction, ...rest } = props;

  const cardFilename = () => {
    const stringName = `${rank}${suit}`;

    if (stringName === "RedJoker") return "1J.svg";
    if (stringName === "BlackJoker") return "2J.svg";
    if (stringName === "TwoClubs") return "2C.svg";
    if (stringName === "TwoDiamonds") return "2D.svg";
    if (stringName === "TwoHearts") return "2H.svg";
    if (stringName === "TwoSpades") return "2S.svg";
    if (stringName === "ThreeClubs") return "3C.svg";
    if (stringName === "ThreeDiamonds") return "3D.svg";
    if (stringName === "ThreeHearts") return "3H.svg";
    if (stringName === "ThreeSpades") return "3S.svg";
    if (stringName === "FourClubs") return "4C.svg";
    if (stringName === "FourDiamonds") return "4D.svg";
    if (stringName === "FourHearts") return "4H.svg";
    if (stringName === "FourSpades") return "4S.svg";
    if (stringName === "FiveClubs") return "5C.svg";
    if (stringName === "FiveDiamonds") return "5D.svg";
    if (stringName === "FiveHearts") return "5H.svg";
    if (stringName === "FiveSpades") return "5S.svg";
    if (stringName === "SixClubs") return "6C.svg";
    if (stringName === "SixDiamonds") return "6D.svg";
    if (stringName === "SixHearts") return "6H.svg";
    if (stringName === "SixSpades") return "6S.svg";
    if (stringName === "SevenClubs") return "7C.svg";
    if (stringName === "SevenDiamonds") return "7D.svg";
    if (stringName === "SevenHearts") return "7H.svg";
    if (stringName === "SevenSpades") return "7S.svg";
    if (stringName === "EightClubs") return "8C.svg";
    if (stringName === "EightDiamonds") return "8D.svg";
    if (stringName === "EightHearts") return "8H.svg";
    if (stringName === "EightSpades") return "8S.svg";
    if (stringName === "NineClubs") return "9C.svg";
    if (stringName === "NineDiamonds") return "9D.svg";
    if (stringName === "NineHearts") return "9H.svg";
    if (stringName === "NineSpades") return "9S.svg";
    if (stringName === "TenClubs") return "TC.svg";
    if (stringName === "TenDiamonds") return "TD.svg";
    if (stringName === "TenHearts") return "TH.svg";
    if (stringName === "TenSpades") return "TS.svg";
    if (stringName === "JackClubs") return "JC.svg";
    if (stringName === "JackDiamonds") return "JD.svg";
    if (stringName === "JackHearts") return "JH.svg";
    if (stringName === "JackSpades") return "JS.svg";
    if (stringName === "QueenClubs") return "QC.svg";
    if (stringName === "QueenDiamonds") return "QD.svg";
    if (stringName === "QueenHearts") return "QH.svg";
    if (stringName === "QueenSpades") return "QS.svg";
    if (stringName === "KingClubs") return "KC.svg";
    if (stringName === "KingDiamonds") return "KD.svg";
    if (stringName === "KingHearts") return "KH.svg";
    if (stringName === "KingSpades") return "KS.svg";
    if (stringName === "AceClubs") return "AC.svg";
    if (stringName === "AceDiamonds") return "AD.svg";
    if (stringName === "AceHearts") return "AH.svg";
    if (stringName === "AceSpades") return "AS.svg";
    return `error.svg?${stringName}`;
  };

  console.log("filename", cardFilename());
  // const sourceMap = {
  //   RedJoker: "1J.svg",
  //   BlackJoker: "2J.svg",
  //   TwoClubs: "2C.svg",
  //   TwoDiamonds: "2D.svg",
  //   TwoHearts: "2H.svg",
  //   TwoSpades: "2S.svg",
  //   Clubs: "3C.svg",
  //   Diamonds: "3D.svg",
  //   Hearts: "3H.svg",
  //   Spades: "3S.svg",
  //   FourClubs: "4C.svg",
  //   FourDiamonds: "4D.svg",
  //   FourHearts: "4H.svg",
  //   FourSpades: "4S.svg",
  //   FiveClubs: "5C.svg",
  //   FiveDiamonds: "5D.svg",
  //   FiveHearts: "5H.svg",
  //   FiveSpades: "5S.svg",
  //   SixClubs: "6C.svg",
  //   SixDiamonds: "6D.svg",
  //   SixHearts: "6H.svg",
  //   SixSpades: "6S.svg",
  //   SevenClubs: "7C.svg",
  //   SevenDiamonds: "7D.svg",
  //   SevenHearts: "7H.svg",
  //   SevenSpades: "7S.svg",
  //   EightClubs: "8C.svg",
  //   EightDiamonds: "8D.svg",
  //   EightHearts: "8H.svg",
  //   EightSpades: "8S.svg",
  //   NineClubs: "9C.svg",
  //   NineDiamonds: "9D.svg",
  //   NineHearts: "9H.svg",
  //   NineSpades: "9S.svg",
  //   TenClubs: "TC.svg",
  //   TenDiamonds: "TD.svg",
  //   TenHearts: "TH.svg",
  //   TenSpades: "TS.svg",
  //   JackClubs: "JC.svg",
  //   JackDiamonds: "JD.svg",
  //   JackHearts: "JH.svg",
  //   JackSpades: "JS.svg",
  //   QueenClubs: "QC.svg",
  //   QueenDiamonds: "QD.svg",
  //   QueenHearts: "QH.svg",
  //   QueenSpades: "QS.svg",
  //   KingClubs: "KC.svg",
  //   KingDiamonds: "KD.svg",
  //   KingHearts: "KH.svg",
  //   KingSpades: "KS.svg",
  //   AceClubs: "AC.svg",
  //   AceDiamonds: "AD.svg",
  //   AceHearts: "AH.svg",
  //   AceSpades: "AS.svg",
  // };

  if (direction === "Down") {
    return (
      <div
        className={cn(["box-shadow-xs rounded-xl aspect-[1/1.5]", className])}
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

  const imgSrc = `/playing-cards/${cardFilename() as string}`;

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

export function CardSkeleton({
  className,
  ...props
}: React.HTMLAttributes<"div">) {
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
