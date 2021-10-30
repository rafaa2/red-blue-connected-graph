import { throttle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Graph from "../../Components/Graph";
import ValidatedGraphInput from "../../Components/ValidatedGraphInput";
import Styles from "./MainPage.module.scss";
export default function MainPage() {
  const [graph, setGraph] = useState("");

  // Throttle the Function
  const throttledEffect = useCallback(
    throttle((str) => {
      console.log("Called and value is :", str);
    }, 2000),
    []
  );

  useEffect(() => {
    throttledEffect(graph);
    return () => {};
  }, [graph]);
  return (
    <div className={Styles.MainPage}>
      <ValidatedGraphInput
        onChange={(e) => setGraph(e.target.value)}
        value={graph}
        name="graph-input"
        className={Styles.graphInput}
      ></ValidatedGraphInput>
      <Graph data={graph}></Graph>
    </div>
  );
}
