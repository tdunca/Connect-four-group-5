import Game from "./components/Game";
import Settings from "./components/Settings";
import "./App.css";

let showSettings = true;

function App() {
  return <>{showSettings ? <Settings></Settings> : <Game></Game>}</>;
}

export default App;
