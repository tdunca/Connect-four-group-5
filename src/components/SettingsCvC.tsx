import "./Settings.css";
import { Player } from "../klasser/Players";
import { useState } from "react";

export default function PvC() {
  const [bot1Difficulty, setBot1Difficulty] = useState<string>("Easy");
  const [bot2Difficulty, setBot2Difficulty] = useState<string>("Easy");

  const startGame = (
    <button
      className="startbtn"
      onClick={(event) => {
        alert(
          "bot" +
            "(" +
            bot1Difficulty +
            ")" +
            " vs " +
            "Bot" +
            "(" +
            bot2Difficulty +
            ")"
        );
      }}
    >
      Start Game
    </button>
  );
  return (
    <>
      <article className="formfield">
        <section className="">
          <h3>Select bot 1 difficulty: {bot1Difficulty}</h3>
          <div>
            <button onClick={() => setBot1Difficulty("Easy")}>Easy</button>
            <button onClick={() => setBot1Difficulty("Hard")}>Hard</button>
          </div>
        </section>

        <section>
          <h3>Select bot 2 difficulty: {bot2Difficulty}</h3>

          <div>
            <button onClick={() => setBot2Difficulty("Easy")}>Easy</button>
            <button onClick={() => setBot2Difficulty("Hard")}>Hard</button>
          </div>
        </section>
      </article>
      {startGame}
    </>
  );
}
