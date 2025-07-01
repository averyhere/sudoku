import { SolitaireBoard } from "@/components/Solitaire";

export default function Page() {
  return (
    <main className="w-full flex flex-col gap-2 h-full">
      <h2 className="text-xl font-bold text-center">Solitaire</h2>

      <SolitaireBoard />
    </main>
  );
}
