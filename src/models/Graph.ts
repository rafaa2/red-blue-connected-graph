import { cloneDeep } from "lodash";

export type RedBlue = "RED" | "BLUE";
export class Node<Char> {
  data: Char;
  color: RedBlue;
  adjacent: Node<Char>[];

  constructor(data: Char, color: RedBlue) {
    this.data = data;
    this.adjacent = [];
    this.color = color;
  }

  addAdjacent(node: Node<Char>): void {
    this.adjacent.push(node);
  }
}

export default class Graph<T> {
  private nodes: Map<T, Node<T>> = new Map();
  private nextColor: RedBlue = "RED";
  private _isRedBlue: boolean = true;

  constructor() {}

  /**
   * Add a new node if it was not added before
   *
   * @param {T} data
   * @returns {Node<T>}
   */
  addNode(data: T): Node<T> {
    let node = this.nodes.get(data);

    if (node) return node;

    node = new Node(data, this.nextColor);
    this.nextColor = this.nextColor === "RED" ? "BLUE" : "RED";
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
    if (sourceNode.color === destinationNode.color) this._isRedBlue = false;
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
      return false;
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

  isRedBlue() {
    return this._isRedBlue && this.isConnectedGraph();
  }
}
