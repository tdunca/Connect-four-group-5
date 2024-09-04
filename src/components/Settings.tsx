import "./Settings.css";
import { ReactHTMLElement, useState } from "react";
import PvP from "./SettingsPvP";
import PvC from "./SettingsPvC";
import CvC from "./SettingsCvC";

export default function Settings() {
  type choice = "pvp" | "pvc" | "cvc";

  var [screen, setScreen] = useState<choice>();

  function handleScreenChange(choice: choice) {
    setScreen(choice);
  }

  return (
    <>
      <div className="settingOverlay">
        <h2>Settings</h2>

        <button onClick={() => handleScreenChange("pvp")}>
          Player vs Player
        </button>
        {screen === "pvp" && <PvP></PvP>}
        <button onClick={() => handleScreenChange("pvc")}>
          Player vs Computer
        </button>
        {screen === "pvc" && <PvC></PvC>}
        <button onClick={() => handleScreenChange("cvc")}>
          Computer vs Computer
        </button>
        {screen === "cvc" && <CvC></CvC>}
      </div>
    </>
  );
}
