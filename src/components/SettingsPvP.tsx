import "./Settings.css";
import { Player } from "../klasser/Players";
import { useState } from "react";

export default function PvP() {
  const [player1Name, setPlayer1Name] = useState<string>(); //får böka lite mer med typesen senare
  const [player2Name, setPlayer2Name] = useState<string>();

  const startGame = (
    <button
      className="startbtn"
      onClick={(event) => {
        alert(player1Name + " vs " + player2Name);
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

        <section className="">
          <h3>Player 2:</h3>
          <input
            type="text"
            name="Player2"
            id="player2name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </section>
      </article>
      {startGame}
    </>
  );
}
