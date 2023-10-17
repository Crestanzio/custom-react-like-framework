import { faster } from "../lib/utils/virtual-dom.js";
import Button from "./button";
import "../style/main.css";

const App = () => {
  function click() {
    alert("Click");
  }
  return (
    <div className="container">
      <h1 style={{ backgroundColor: "red" }}>Didact</h1>
      <ul>
        <li>Come</li>
        <li>Test</li>
      </ul>
      <Button backgroundColor={"green"} onClick={click}>
        Click me!
      </Button>
    </div>
  );
};

export default App;
