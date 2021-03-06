import { cloneDeep } from "lodash";

export type RedBlue = "RED" | "BLUE";
export class Node<Char> {
  data: Char;
  color?: RedBlue;
  adjacent: Node<Char>[];

  constructor(data: Char) {
    this.data = data;
    this.adjacent = [];
  }

  addAdjacent(node: Node<Char>): void {
    this.adjacent.push(node);
  }
}

export default class Graph<T> {
  private nodes: Map<T, Node<T>> = new Map();

  /**
   * Add a new node if it was not added before
   *
   * @param {T} data
   * @returns {Node<T>}
   */
  addNode(data: T): Node<T> {
    let node = this.nodes.get(data);

    if (node) return node;

    node = new Node(data);
    this.nodes.set(data, node);
    return node;
  }

  /**
   * Create an edge between two nodes
   *
   * @param {T} source
   * @param {T} destination
   */
  addEdge(source: T, destination: T): void {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addAdjacent(destinationNode);
    destinationNode.addAdjacent(sourceNode);
  }

  getNodes() {
    return cloneDeep(this.nodes);
  }

  /**
   * Depth-first search
   *
   * @param {T} data
   * @param {Map<String, boolean>} visited
   * @returns
   */
  private depthFirstSearch(node: Node<T>, visited: Map<T, boolean>): void {
    if (!node) return;

    visited.set(node.data, true);
    node.adjacent.forEach((item) => {
      if (!visited.has(item.data)) {
        this.depthFirstSearch(item, visited);
      }
    });
  }

  isConnectedGraph() {
    if (this.nodes.size === 0) {
      return true;
    }
    const visited: Map<T, boolean> = new Map();

    const entryNode = this.nodes.get(this.nodes.entries().next().value[0]);
    if (entryNode) {
      this.depthFirstSearch(entryNode, visited);

      if (visited.size === this.nodes.size) return true;
      return false;
    }
    return false;
  }

  isRedBlue(): boolean {
    if (this.nodes.size === 0) {
      return true;
    }

    const entryNode = this.nodes.get(this.nodes.entries().next().value[0]);
    if (entryNode) {
      return this.isRedBlueAux(entryNode);
    }
    return true;
  }
  isRedBlueAux(entryNode: Node<T>, nextColor: RedBlue = "RED"): boolean {
    entryNode.color = nextColor;
    nextColor = nextColor === "RED" ? "BLUE" : "RED";
    let isRedBlue = true;
    entryNode.adjacent.forEach((node) => {
      if (node.color === entryNode.color) {
        isRedBlue = false;
      } else if (node.color === nextColor) {
        isRedBlue = true;
      } else {
        isRedBlue = this.isRedBlueAux(node, nextColor);
      }
    });
    return isRedBlue;
  }
}
