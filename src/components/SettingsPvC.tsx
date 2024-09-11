import "./Settings.css";
import { useState } from "react";
import { Options } from "../klasser/Options";

interface SettingProps {
  handleSetOptions: (newOptions: Options) => void;
  options: Options;
}

export default function PvC(props: SettingProps) {
  type difficulty = "easy" | "hard";
  const [player1Name, setPlayer1Name] = useState<string>();
  const [bot1Difficulty, setBot1Difficulty] = useState<difficulty>("easy"); //lokal state

  function setName(player: "player1", name: string) {
    // setName kallas för varje onChange, men knappar uppdaterar inte state automatiskt utan väntar på handle set options, toDo
    const updatedOptions = { ...props.options };
    updatedOptions.player1name = name;
    updatedOptions.player2name = "none"; //"none" för att inte trigga felet "empty name", ToDo

    props.handleSetOptions(updatedOptions);
  }
  function setDifficulty(player: string, difficulty: difficulty) {
    const updatedOptions = { ...props.options };
    if (player === "bot1") {
      updatedOptions.bot1difficulty = difficulty;
      updatedOptions.player1name = "bot(" + difficulty + ")";
      setBot1Difficulty(difficulty);
      props.handleSetOptions(updatedOptions);
    }
  }
  return (
    <>
      <article className="formfield">
        <section className="">
          <h3>Player 1: </h3>
          <input
            type="text"
            name="Player1"
            id="player1name"
            value={player1Name}
            onChange={(e) => setName("player1", e.target.value)}
          />
        </section>

        <section>
          <h3>Select bot difficulty: {bot1Difficulty}</h3>
          <div className="difficulty">
            {" "}
            <div className="easy">
              <button onClick={() => setDifficulty("bot1", "easy")}>
                Easy
              </button>
            </div>
            <div className="hard">
              <button onClick={() => setDifficulty("bot1", "hard")}>
                Hard
              </button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
