import { throttle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Graph from "../../Components/Graph";
import ValidatedGraphInput from "../../Components/ValidatedGraphInput";
import Styles from "./MainPage.module.scss";
export default function MainPage() {
  const [graph, setGraph] = useState("");

  // Throttle the Function
  const throttledEffect = useCallback(
    throttle((str) => {}, 1000),
    []
  );

  useEffect(() => {
    throttledEffect(graph);
    return () => {};
  }, [graph]);
  return (
    <div className={Styles.MainPage}>
      <div>
        <ValidatedGraphInput
          onChange={(e) => setGraph(e.target.value)}
          value={graph}
          name="graph-input"
          className={Styles.graphInput}
        ></ValidatedGraphInput>
      </div>
      <Graph data={graph} className={Styles.graphContainer}></Graph>
    </div>
  );
}
