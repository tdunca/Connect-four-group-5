import Game from "./components/Game";
import Settings from "./components/Settings";
import { Options } from "./klasser/Options";

import "./App.css";
import { useState } from "react";

function App() {
  const [options, setOptions] = useState<Options>(new Options());

  function handleSetOptions() {
    //setOptions();
  }
  return (
    <>
      {!options.start ? (
        <Settings
          options={options}
          handleSetOptions={handleSetOptions}
        ></Settings>
      ) : (
        <Game></Game>
      )}
    </>
  );
}

export default App;
