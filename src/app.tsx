import { Suspense } from "preact/compat";
import { Loading, TicTacToe } from "./components";

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <TicTacToe />
    </Suspense>
  );
}
