import { Suspense, useEffect } from "preact/compat";
import { Loading, TicTacToe } from "./components";

export function App() {
  useEffect(()=>{
    const isIframeUrl = window.location.href.includes("iframeUrl")
    document.body.style.background=isIframeUrl?"transparent":"#1c1917"
  },[])
  return (
    <Suspense fallback={<Loading />}>
      <TicTacToe />
    </Suspense>
  );
}
