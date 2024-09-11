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
    props.options.gamemode = choice;
    setScreen(choice);
  }
  const startGame = (
    <button
      className="startbtn"
      onClick={(event) => {
        // props.options.start = true;
        if (
          (props.options.gamemode === "pvp" &&
            props.options.player1name === "" &&
            props.options.gamemode === "pvp") ||
          props.options.player2name === ""
        ) {
          alert("You cant have no name!");
        } //här skulle man lätt kunna ha lite CSS regler och text som dyker upp och säger vad felet är.
        //har en bugg här med att när namnen nollställs i props.options så är de kvar i rutan i SettingsPVP, kan behöva böka med states där men blir en ToDo
        if (
          props.options.gamemode === "pvp" &&
          props.options.player1name === props.options.player2name
        ) {
          alert("You can't have the same name!");
          props.options.player1name = "";
          props.options.player2name = "";
          props.handleSetOptions(props.options);
        } else {
          props.options.start = true;
          props.handleSetOptions(props.options); // call the function last
        }
      }}
    >
      Start Game
    </button>
  );

  return (
    <>
      <div className="settingOverlay">
        <h2>Choose Gamemode</h2>

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
        {screen === "pvc" && (
          <PvC
            options={props.options}
            handleSetOptions={props.handleSetOptions}
          ></PvC>
        )}
        <button onClick={() => handleScreenChange("cvc")}>
          Computer vs Computer
        </button>
        {screen === "cvc" && (
          <CvC
            options={props.options}
            handleSetOptions={props.handleSetOptions}
          ></CvC>
        )}
        {startGame}
      </div>
    </>
  );
}
