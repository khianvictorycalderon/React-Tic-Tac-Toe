import { useEffect, useState } from "react";

const X: string = "❌";
const O: string = "⭕";

function App() {
  const [page, setPage] = useState<string>("menu");
  const [board, setBoard] = useState<string[]>([
    "", "", "",
    "", "", "",
    "", "", ""
  ]);
  const [gameMode, setGameMode] = useState<string>("");
  const [playChar, setPlayChar] = useState<string>(X);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameOverMessage, setGameOverMessage] = useState<string>("");

  const clearBoard = () => {
    setBoard([
      "", "", "",
      "", "", "",
      "", "", ""
    ]);
    setGameOverMessage("");
    setIsGameOver(false);
  }

  const checkWin = (boardArray: string[]) => {
    const winCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    for (const [a, b, c] of winCombinations) {
      if (
        boardArray[a] && 
        boardArray[a] === boardArray[b] && 
        boardArray[a] === boardArray[c]
      ) {
        return boardArray[a]; // Return the winner ('X' or 'O')
      }
    }

    if (boardArray.every(cell => cell !== "")) {
      return "draw";
    }

    return false;
  };

  useEffect(() => {
    const result = checkWin(board);
    if (result) {
      if (result === "draw") {
        setIsGameOver(true);
        setGameOverMessage("Draw");
      } else if (result === X) {
        setIsGameOver(true);
        setGameOverMessage("Player X Won");
      } else if (result === O) {
        setIsGameOver(true);
        setGameOverMessage("Player O Won");
      }
    }
  }, [board]);

  const handleClick = (tileNumber: number) => {
    if (board[tileNumber] !== "") return; // Prevent overwriting a filled tile
    
    if (gameMode === "play" && !isGameOver) {
      setBoard((prev) => {
        const updatedBoard = [...prev];
        updatedBoard[tileNumber] = playChar;
        return updatedBoard;
      });

      setPlayChar((prevChar) => (prevChar === X ? O : X));
    }
  };

  const renderPage = () => {
    switch (page) {
      case "menu":
        return (
          <div>
            <button 
              onClick={() => {
                setPage("in-game");
                clearBoard();
                setGameMode("play");
                setPlayChar(X);
              }}
              className="btn btn-primary"
            >
              Play
            </button>
          </div>
        );
  
      case "in-game":
        return (
          <div className="center">
            <div className="game">
              <div className="game-grid">
                {board.map((item, index) => (
                  <button 
                    onClick={() => {
                      handleClick(index);
                    }}
                    className="box" 
                    key={index}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <br />
            {gameOverMessage && <h4>{gameOverMessage}</h4>}
            <button 
              onClick={() => setPage("menu")}
              className="btn btn-primary"
            >
              Menu
            </button>
          </div>
        );
    }
  };

  return (
    <>
      <div id="container">
        Tic Tac Toe<br/>
        by <a href="">Khian Victory D. Calderon</a>
        <br/><br/>
        {renderPage()}
      </div>
    </>
  );
}

export default App;