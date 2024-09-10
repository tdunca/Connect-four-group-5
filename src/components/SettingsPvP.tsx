import "./Settings.css";
import { useState } from "react";
import { Options } from "../klasser/Options";

interface SettingProps {
  handleSetOptions: (newOptions: Options) => void;
  options: Options;
}

export default function PvP(props: SettingProps) {
  const [p1Name, setP1Name] = useState<string>("Player 1");
  const [p2Name, setP2Name] = useState<string>("Player 2"); //lokal state

  function setName(player: "player1" | "player2", name: string) {
    const updatedOptions = { ...props.options };

    if (player === "player1") {
      updatedOptions.player1name = name;
      props.handleSetOptions(updatedOptions);
    } else {
      updatedOptions.player2name = name;
      props.handleSetOptions(updatedOptions);
    }
  }
  function setTimer(time: number) {
    props.options.roundtimer = time;
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
            onChange={(e) => setName("player1", e.target.value)}
          />
        </section>

        <section className="">
          <h3>Player 2:</h3>
          <input
            type="text"
            name="Player2"
            id="player2name"
            onChange={(e) => setName("player2", e.target.value)}
          />
        </section>
        <section>
          <h3>Set timer(s)</h3>
          <input
            type="number"
            min="0"
            onChange={(e) => setTimer(Number(e.target.value))}
          />
        </section>
      </article>
    </>
  );
}
