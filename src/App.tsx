import Game from "./components/Game";
import Settings from "./components/Settings";
import { Options } from "./klasser/Options";

import "./App.css";
import { useState } from "react";

function App() {
  const [options, setOptions] = useState<Options>(new Options());

  return (
    <>{!options.start ? <Settings {...options}></Settings> : <Game></Game>}</>
  );
}

export default App;
