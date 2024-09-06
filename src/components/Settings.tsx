import "./Settings.css";
import { ReactHTMLElement, useState } from "react";
import PvP from "./SettingsPvP";
import PvC from "./SettingsPvC";
import CvC from "./SettingsCvC";
import { Options } from "../klasser/Options";

export default function Settings(props: Options) {
  type choice = "pvp" | "pvc" | "cvc";
  var [screen, setScreen] = useState<string>();
  //var [options, setOptions] = useState<Options>();

  function handleScreenChange(choice: choice) {
    setScreen(choice);
    //props.gamemode = choice;
  }
  const startGame = (
    <button
      className="startbtn"
      onClick={(event) => {
        alert(props.player1name + " vs " + props.player2name);
      }}
    >
      Start Game
    </button>
  );

  //console.log(props.gamemode);

  return (
    <>
      <div className="settingOverlay">
        <h2>Settings</h2>

        <button onClick={() => handleScreenChange("pvp")}>
          Player vs Player
        </button>
        {screen === "pvp" && <PvP {...props}></PvP>}
        <button onClick={() => handleScreenChange("pvc")}>
          Player vs Computer
        </button>
        {screen === "pvc" && <PvC></PvC>}
        <button onClick={() => handleScreenChange("cvc")}>
          Computer vs Computer
        </button>
        {screen === "cvc" && <CvC></CvC>}
        {startGame}
      </div>
    </>
  );
}
