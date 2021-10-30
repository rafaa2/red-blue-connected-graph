import { replace } from "lodash";

export const GRAPH_REGEX = /([^-, ][^-,])/g;

export function validateGraph(graphString: string): boolean {
  return true;
}

export function validateGraphInputString(str: string): string {
  // Remove All whitespaces which are not after a comma (for better display)
  str = str.replaceAll(/[^, ] /g, "");
  // Ensure that input in correct format
  return replace(str, GRAPH_REGEX, (match, arg) => match.split("").join("-"));
}
