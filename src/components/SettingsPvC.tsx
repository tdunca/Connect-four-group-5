import "./Settings.css";
import { Player } from "../klasser/Player";
import { useState } from "react";

export default function PvC() {
  const [player1Name, setPlayer1Name] = useState<string>();
  const [botDifficulty, setBotDifficulty] = useState<string>("Easy");

  const startGame = (
    <button
      className="startbtn"
      onClick={(event) => {
        alert(player1Name + " vs " + "Bot" + "(" + botDifficulty + ")");
      }}
    >
      Start Game
    </button>
  );
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
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
        </section>

        <section>
          <h3>Select bot difficulty: {botDifficulty}</h3>

          <div>
            <button onClick={() => setBotDifficulty("Easy")}>Easy</button>
            <button onClick={() => setBotDifficulty("Hard")}>Hard</button>
          </div>
        </section>
      </article>
    </>
  );
}
