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
  const [botDifficulty, setBotDifficulty] = useState<difficulty>("easy"); //lokal state

  function setName(player: "player1", name: string) {
    const updatedOptions = { ...props.options };
    updatedOptions.bot1difficulty = botDifficulty;
    updatedOptions.player1name = name;
    updatedOptions.player2name = "none"; //"none" för att inte trigga felet "empty name", ToDo
    props.handleSetOptions(updatedOptions);
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
          <h3>Select bot difficulty: {botDifficulty}</h3>

          <div>
            <button onClick={() => setBotDifficulty("easy")}>Easy</button>
            <button onClick={() => setBotDifficulty("hard")}>Hard</button>
          </div>
        </section>
      </article>
    </>
  );
}
