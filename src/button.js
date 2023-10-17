import { faster } from "../lib/utils/virtual-dom.js";

const Button = ({ backgroundColor, children, onClick }) => {
  console.log(props);
  return (
    <button style={{ backgroundColor: backgroundColor, padding: "10px", border: "none" }} onClick={onClick}>
      {console.log(children)}
    </button>
  );
};

export default Button;
