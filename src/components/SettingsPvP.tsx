import "./Settings.css";
import { Player } from "../klasser/Player";
import { useState } from "react";
import { Options } from "../klasser/Options";

export default function PvP(props: Options) {
  const [player1Name, setPlayer1Name] = useState<string>(
    props.player1name || "Player 1"
  ); //får böka lite mer med typesen senare
  const [player2Name, setPlayer2Name] = useState<string>(
    props.player2name || "Player 2"
  );

  const startGame = (
    <button
      className="startbtn"
      onClick={(event) => {
        props.player1name = player1Name;
        props.player2name = player2Name;
        props.start = true;
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
        {startGame}
      </article>
    </>
  );
}
