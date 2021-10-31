import { throttle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import GraphD3 from "../../Components/GraphD3";

import ValidatedGraphInput from "../../Components/ValidatedGraphInput";
import Graph from "../../models/Graph";
import { parseGraphfromString } from "../../util/graph-string";
import Styles from "./MainPage.module.scss";

export default function MainPage() {
  const [graph, setGraph] = useState("");
  const [throttledGraphData, setThrottledGraphData] =
    useState<Graph<string> | undefined>(undefined);
  // Throttle the Function
  const throttledEffect = useCallback(
    throttle((str) => {
      const graph = parseGraphfromString(str);
      setThrottledGraphData(graph);
      console.log("Nodes:", graph.getNodes());
      console.log("isConnectedGraph:", graph.isConnectedGraph());
      console.log("isRedBlue", graph.isRedBlue());
    }, 1000),
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
      <GraphD3
        data={throttledGraphData}
        className={Styles.graphContainer}
      ></GraphD3>
    </div>
  );
}
