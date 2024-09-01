import { DuelGame } from "./components/canvas/duel-game";

export const App = () => {
  return (
    <div className="min-h-screen container flex items-center flex-col">
      <h1 className="text-3xl font-bold my-10">Дуэль</h1>
      <DuelGame />
    </div>
  );
};
