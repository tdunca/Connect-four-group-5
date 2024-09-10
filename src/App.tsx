import Game from "./components/Game";
import Settings from "./components/Settings";
import { Options } from "./klasser/Options";

import "./App.css";
import { useState } from "react";

function App() {
  const [options, setOptions] = useState<Options>(new Options());

  function handleSetOptions(newOptions: Options) {
    console.log("New options set!: " + JSON.stringify(newOptions));

    setOptions({ ...newOptions });
  }
  return (
    <>
      <div className="C4-text">
        <h1>Connect 4</h1>
      </div>
      {!options.start ? ( //"!" för att se Settings component, ta bort för att se game PLACEHOLDER
        <Settings
          options={options}
          handleSetOptions={handleSetOptions}
        ></Settings>
      ) : (
        <Game options={options}></Game>
      )}
      <div>{}</div>
    </>
  );
}

export default App;
