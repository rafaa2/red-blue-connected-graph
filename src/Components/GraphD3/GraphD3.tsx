import React, { useEffect } from "react";
import Graph from "../../models/Graph.js";
import { renderGraph } from "./util.js";

interface GraphProps {
  data?: Graph<string>;
  className?: string;
}
function GraphD3(props: GraphProps) {
  const containerRef = React.useRef(null);
  const { data, className } = props;
  useEffect(() => {
    let destroyFn;

    if (containerRef.current && data) {
      const { destroy } = renderGraph(containerRef, data);
      destroyFn = destroy;
    }

    return destroyFn;
  }, [data]);
  return <div className={className} ref={containerRef}></div>;
}

export default React.memo(GraphD3);
