import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState();
  const [fullname, setFullName] = useState();

  const InputEvent = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onsubmit = () => {
    setFullName(name);
  };

  return (
    <>
      <h1> Hello {fullname} </h1>
      <input type="text" placeholder="Enter your name" onChange={InputEvent} />
      <button onClick={onsubmit}> Click me 👍</button>
    </>
  );
};

export default App;
