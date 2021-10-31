import { replace } from "lodash";
import Graph from "../models/Graph";

export const GRAPH_REGEX = /([^-, ][^-,])/g;

interface BasicGraph {
  links: string[][];
  nodes: Set<string>;
}

export function validateGraphInputString(str: string): string {
  // Remove All whitespaces which are not after a comma (for better display)
  str = str.replaceAll(/[^, ] /g, "");
  // Ensure that input in correct format
  return replace(str, GRAPH_REGEX, (match, arg) => match.split("").join("-"));
}

export function parseBasicGraphFromString(str: string): BasicGraph {
  if (!str) {
    return {
      links: [],
      nodes: new Set(),
    };
  }
  str = str.replaceAll(" ", "");
  let links: string[][] = [];
  let nodes = new Set(
    str.split(",").reduce((acc: string[], g: string) => {
      if (!g) {
        return acc;
      }
      const link = g.split("-");
      for (let index = 0; index < link.length - 1; index++) {
        links = [...links, [link[index], link[index + 1]]];
      }
      return [...acc, ...link];
    }, [])
  );

  return {
    links,
    nodes,
  };
}

export function parseGraphfromString(str: string): Graph<string> {
  if (!str) {
    return new Graph<string>();
  }
  const graph = new Graph<string>();
  const basicGraph = parseBasicGraphFromString(str);
  basicGraph.nodes.forEach((x) => graph.addNode(x));
  basicGraph.links.forEach((l) => {
    graph.addEdge(l[0], l[1]);
  });
  return graph;
}
