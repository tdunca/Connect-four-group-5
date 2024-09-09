import Game from "./components/Game";
import Settings from "./components/Settings";
import { Options } from "./klasser/Options";

import "./App.css";
import { useState } from "react";

function App() {
  const [options, setOptions] = useState<Options>(new Options());

  //const stringifiedOptions = JSON.stringify(options);

  function handleSetOptions(newOptions: Options) {
    console.log("New options set!: " + JSON.stringify(newOptions));
    setOptions({ ...newOptions });
  }
  return (
    <>
      {!options.start ? ( //"!" för att se Settings component, ta bort för att se game PLACEHOLDER
        <Settings
          options={options}
          handleSetOptions={handleSetOptions}
        ></Settings>
      ) : (
        <Game></Game>
      )}
      <div>{}</div>
    </>
  );
}

export default App;
