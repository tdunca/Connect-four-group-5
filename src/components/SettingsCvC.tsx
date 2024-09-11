import "./Settings.css";
import { useState } from "react";
import { Options } from "../klasser/Options";

interface SettingProps {
  handleSetOptions: (newOptions: Options) => void;
  options: Options;
}

export default function CvC(props: SettingProps) {
  type difficulty = "easy" | "hard";
  const [bot1Difficulty, setBot1Difficulty] = useState<string>("easy");
  const [bot2Difficulty, setBot2Difficulty] = useState<string>("easy"); //lokal state

  function setDifficulty(player: string, difficulty: difficulty) {
    const updatedOptions = { ...props.options };
    if (player === "bot1") {
      updatedOptions.bot1difficulty = difficulty;
      updatedOptions.player1name = "bot1(" + difficulty + ")";
      setBot1Difficulty(difficulty);
    }
    if (player === "bot2") {
      updatedOptions.bot2difficulty = difficulty;
      updatedOptions.player2name = "bot2(" + difficulty + ")";
      setBot2Difficulty(difficulty);
    }
    props.handleSetOptions(updatedOptions);
  }
  return (
    <>
      <article className="formfield">
        <section className="">
          <h3>Select bot 1 difficulty: {bot1Difficulty}</h3>
          <div className="difficulty">
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

        <section>
          <h3>Select bot 2 difficulty: {bot2Difficulty}</h3>

          <div className="difficulty">
            <div className="easy">
              <button onClick={() => setDifficulty("bot2", "easy")}>
                Easy
              </button>
            </div>
            <div className="hard">
              {" "}
              <button onClick={() => setDifficulty("bot2", "hard")}>
                Hard
              </button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
