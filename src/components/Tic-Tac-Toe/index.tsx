import { useState } from "preact/hooks";
const generateBoard = (size: number): string[][] => {
  const newBoard: string[][] = [];
  for (let i = 0; i < size; i++) {
    newBoard.push(Array(size).fill(""));
  }
  return newBoard;
};

const checkForWin = (board: string[][], player: string): boolean => {
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === player &&
      board[row][1] === player &&
      board[row][2] === player
    ) {
      return true;
    }
  }

  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === player &&
      board[1][col] === player &&
      board[2][col] === player
    ) {
      return true;
    }
  }

  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }

  return false;
};

const TicTacToe = () => {
  const [board, setBoard] = useState<string[][]>(generateBoard(5));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (!board[row][col] && !winner) {
      const newBoard = [...board];
      newBoard[row][col] = isXNext ? "X" : "O";
      setBoard(newBoard);
      setIsXNext(!isXNext);
      if (checkForWin(newBoard, isXNext ? "X" : "O")) {
        setWinner(isXNext ? "X" : "O");
      }
    }
  };

  const restartGame = () => {
    setBoard(generateBoard(3));
    setWinner(null);
    setIsXNext(true);
  };

  const renderBoard = () => {
    return (
      <div
        className="grid grid-cols-3 gap-1"
        style={{ width: "fit-Content", height: "max-content" }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="border w-14 h-14 m-auto p-2 border-gray-300 text-center text-4xl cursor-pointer"
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Tic Tac Toe</h2>
      {winner ? (
        <div>
          <p>Winner: {winner}</p>
          <button
            className="m-auto px-2 py-2 bg-blue-500 text-white rounded"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>
      ) : (
        renderBoard()
      )}
    </div>
  );
};

export default TicTacToe;
