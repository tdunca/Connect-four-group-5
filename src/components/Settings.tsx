import "./Settings.css";
import { useState } from "react";
import PvP from "./SettingsPvP";
import PvC from "./SettingsPvC";
import CvC from "./SettingsCvC";
import { Options } from "../klasser/Options";

interface SettingProps {
  handleSetOptions: (newOptions: Options) => void;
  options: Options;
}

export default function Settings(props: SettingProps) {
  type choice = "pvp" | "pvc" | "cvc";
  var [screen, setScreen] = useState<string>();

  function handleScreenChange(choice: choice) {
    setScreen(choice);
  }
  const startGame = (
    <button
      className="startbtn"
      onClick={(event) => {
        props.options.start = true;
        props.handleSetOptions(props.options);
        return props.options;
        //alert(props.options.player1name + " vs " + props.options.player2name);
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
        {screen === "pvp" && (
          <PvP
            options={props.options}
            handleSetOptions={props.handleSetOptions}
          ></PvP>
        )}
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
