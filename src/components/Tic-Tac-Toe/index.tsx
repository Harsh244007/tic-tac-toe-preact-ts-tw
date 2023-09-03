import { memo } from "preact/compat";
import { useState, useMemo, useCallback } from "preact/hooks";

const generateBoard = (size: number): string[][] => {
  const newBoard: string[][] = [];
  for (let i = 0; i < size; i++) {
    newBoard.push(Array(size).fill(""));
  }
  return newBoard;
};

const checkForWin = (board: string[][], player: string): boolean => {
  const boardCount = board.length;

  for (let i = 0; i < boardCount; i++) {
    if (board[i].every((cell) => cell === player)) {
      return true;
    }

    if (board.every((row) => row[i] === player)) {
      return true;
    }
  }
  if (board.every((row, index) => row[index] === player)) {
    return true;
  }
  if (board.every((row, index) => row[boardCount - 1 - index] === player)) {
    return true;
  }

  return false;
};

const TicTacToe = () => {
  const [boardCount, setBoardCount] = useState<number>(3);
  const [board, setBoard] = useState<string[][]>(() =>
    generateBoard(boardCount)
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [isTie, setIsTie] = useState<boolean>(false);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (!board[row][col] && !winner && !isTie) {
        const newBoard = [...board];
        newBoard[row][col] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
        if (checkForWin(newBoard, isXNext ? "X" : "O")) {
          setWinner(isXNext ? "X" : "O");
        } else if (newBoard.flat().every((cell) => cell !== "")) {
          setIsTie(true);
        }
      }
    },
    [board, winner, isXNext, isTie]
  );

  const handleBoardSizeChange = useCallback((event: any) => {
    const maxWidth =
      window.innerWidth <= 400
        ? 4
        : window.innerWidth <= 600 && window.innerWidth > 500
        ? 7
        : window.innerWidth > 600
        ? 10
        : 5;
    const newSize: number = Number(Math.min(event.target.value, maxWidth));
    if (newSize >= 1 && newSize <= maxWidth) {
      setBoardCount(newSize);
      setBoard(generateBoard(newSize));
      setWinner(null);
      setIsXNext(true);
      setIsTie(false);
    }
  }, []);

  const RenderBoard = useMemo(() => {
    return (
      <div className={"overflow-auto p-4 w-auto max-w-92 h-full"}>
        <div
          className={`grid m-auto grid-cols-${boardCount} gap-1`}
          style={{ width: "max-content", height: "max-content" }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`border w-14 h-14 m-auto p-2 border-gray-300 text-center text-4xl cursor-pointer ${
                  isTie ? "bg-gray-200" : ""
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }, [board, boardCount, handleCellClick, isTie]);

  const restartGame = useCallback(() => {
    setBoard(generateBoard(boardCount));
    setWinner(null);
    setIsXNext(true);
    setIsTie(false);
  }, [boardCount]);

  return (
    <main className="text-center m-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4 bg-teal-900">Tic Tac Toe</h2>
      <div className="mb-4">
        <label htmlFor="boardSize" className="mr-2">
          Board Size:
        </label>
        <input
          type="number"
          id="boardSize"
          name="boardSize"
          min="1"
          max="10"
          className="px-2 py-1 border rounded w-16"
          value={boardCount}
          onChange={handleBoardSizeChange}
        />
      </div>
      {RenderBoard}

      {winner ? <p>Winner: {winner}</p> : isTie ? <p>It's a Tie!</p> : ""}
      <button
        className="m-auto mt-4 px-2 py-2 bg-blue-500 text-white rounded"
        onClick={restartGame}
      >
        Restart
      </button>
      <p className="mt-5">Made by Harsh with ❤️</p>
    </main>
  );
};

export default memo(TicTacToe);
