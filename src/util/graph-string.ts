import { replace } from "lodash";
import Graph, { RedBlue } from "../models/Graph";

export const GRAPH_REGEX = /([^-, ][^-,])/g;

interface BasicNode {
  name: string;
  color: RedBlue;
}

/**
 *
 * Helper Interface for D3
 *
 *  */
interface BasicGraph<T, S = T> {
  links: S[][];
  nodes: Set<T>;
}

export function validateGraphInputString(str: string): string {
  // Remove All whitespaces which are not after a comma (for better display)
  str = str.replaceAll(/[^, ] /g, "");
  // Ensure that input in correct format
  return replace(str, GRAPH_REGEX, (match, arg) => match.split("").join("-"));
}

export function parseBasicGraphFromString(str: string): BasicGraph<string> {
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
      const link = g.split("-").filter((x) => x);

      for (let index = 0; index < link.length - 1; index++) {
        console.log(link[index], !link[index + 1]);
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

export function parseBasicGraphFromGraph(
  graph: Graph<string>
): BasicGraph<BasicNode, string> {
  const nodes = new Set<BasicNode>();
  const links: string[][] = [];
  const visited = new Map<string, boolean>();
  graph.getNodes().forEach((x) => {
    visited.set(x.data, true);
    nodes.add({ name: x.data, color: x.color });
    x.adjacent.forEach((l) => {
      if (!visited.has(l.data)) {
        links.push([x.data, l.data]);
      }
    });
  });
  console.log(graph, graph.getNodes());
  return {
    nodes,
    links,
  };
}
