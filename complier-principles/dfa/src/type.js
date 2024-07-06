import { dfaState } from "./constants";
export class Token {
  constructor() {
    this.type = dfaState.Initial;
    this.text = "";
  }
}