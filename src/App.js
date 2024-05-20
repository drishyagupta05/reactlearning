import React, { useRef } from "react";
import { Sdata, Ndata } from "./Sdata";
import Card from "./Cards";

function ncard(val) {
  return (
    <td key={val.id}>
      <Card
        imgsrc={val.imgsrc}
        title={val.title}
        sName={val.sName}
        link={val.link}
        key={val.id}
      />
    </td>
  );
}

const ScrollableRow = ({ data }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200; // Adjust as needed
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; // Adjust as needed
    }
  };

  return (
    <div className="scroll-container">
      <div className="scroll-arrow left" onClick={scrollLeft}>
        &lt;
      </div>
      <div className="scroll-content" ref={scrollRef}>
        <table>
          <tr>{data.map(ncard)}</tr>
        </table>
      </div>
      <div className="scroll-arrow right" onClick={scrollRight}>
        &gt;
      </div>
    </div>
  );
};

const App = () => (
  <>
    <h1 className="heading_style">List Of Top Netflix Top Movies</h1>
    <ScrollableRow data={Sdata} />
    <ScrollableRow data={Ndata} />
  </>
);

export default App;
