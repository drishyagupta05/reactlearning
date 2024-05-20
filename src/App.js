import React, { useState } from "react";

const App = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const updateTime = () => {
    setTime(new Date().toLocaleTimeString());
  };
  setInterval(updateTime, 1000);
  return (
    <>
      <h1> {time} </h1>
      {/* <button onClick={updateTime}> Get Time </button> */}
    </>
  );
};

export default App;
