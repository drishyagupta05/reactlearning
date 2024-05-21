import React, { useState } from "react";

const App = () => {
  const purple = "#8644ad";
  const [bg, setBg] = useState(purple);
  const [name, setName] = useState("click me");

  const bgChange = () => {
    let newBg = "#34495e";
    setBg(newBg);
    setName("here 😄");
  };

  const bgBack = () => {
    setBg(purple);
    setName("here 💯");
  };

  return (
    <>
      <div style={{ backgroundColor: bg }}>
        <button onClick={bgChange} onDoubleClick={bgBack}>
          {name}
        </button>
      </div>
    </>
  );
};

export default App;
