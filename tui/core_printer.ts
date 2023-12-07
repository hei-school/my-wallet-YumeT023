import { Action } from "../core/Action.ts";
import { printHeader } from "./ui.ts";

export const printHistory = (history: Action[]) => {
  printHeader("History");
  console.table(history);
}