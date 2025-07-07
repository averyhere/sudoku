import { Sudoku } from "@/components/Sudoku";
import { Main } from "@/components/main";
import { Header as PageHeader } from "@/components/header";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen p-2 flex flex-col gap-4 items-center justify-start">
        <PageHeader />
        <Main className="w-full grow">
          <Sudoku />
        </Main>
      </div>
    </>
  );
}
