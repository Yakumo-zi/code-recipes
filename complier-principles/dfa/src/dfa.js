import { dfaState, tokenType } from "./constants.js";
import { isAlpha, isDigit, isBlank } from "./utils.js";
import { Token } from "./type.js";

const initToken = (c, token) => {
  let state = dfaState.Initial;
  if (isAlpha(c)) {
    if (c == "i") {
      state = dfaState.Id_int1;
    } else {
      state = dfaState.Id;
    }
    token.type = tokenType.Identifier;
    token.text += c;
  } else if (isDigit(c)) {
    state = dfaState.IntLiteral;
    token.type = tokenType.IntLiteral;
    token.text += c;
  } else if (c == ">") {
    state = dfaState.GT;
    token.type = tokenType.GT;
    token.text += c;
  } else if (c == "=") {
    state = dfaState.EQ;
    token.type = tokenType.EQ;
    token.text += c;
  } else if (c == "!") {
    state = dfaState.NOT;
    token.type = tokenType.NOT;
    token.text += c;
  }
  return state;
};
/**
 * @param {String} input
 */
export function dfa(input) {
  let tokens = [];
  let token = null;
  let state = dfaState.Initial;
  let i = 0;
  while (i < input.length) {
    let c = input[i];
    switch (state) {
      case dfaState.Initial:
        if (isBlank(c)) {
          break;
        }
        if (token != null) {
          tokens.push(token);
        }
        token = new Token();
        state = initToken(c, token);
        break;
      case dfaState.Id_int1:
        if (c == "n") {
          state = dfaState.Id_int2;
        } else if (isAlpha(c) || isDigit(c)) {
          state = dfaState.Id;
        } else {
          state = dfaState.Initial;
        }
        token.text += c;
        break;
      case dfaState.Id_int2:
        if (c == "t") {
          state = dfaState.Id_int3;
        } else if (isAlpha(c) || isDigit(c)) {
          state = dfaState.Id;
        } else {
          state = dfaState.Initial;
        }
        token.text += c;
        break;
      case dfaState.Id_int3:
        if (isBlank(c)) {
          token.type = tokenType.Int;
          state = dfaState.Initial;
        } else {
          state = dfaState.Id;
          token.text += c;
        }
        break;
      case dfaState.Id:
        if (isAlpha(c) || isDigit(c)) {
          token.text += c;
        } else {
          state = dfaState.Initial;
          continue;
        }
        break;
      case dfaState.IntLiteral:
        if (isDigit(c)) {
          token.text += c;
        } else {
          state = dfaState.Initial;
          continue;
        }
        break;
      case dfaState.GT:
        if (c == "=") {
          token.type = tokenType.GE;
          token.text += c;
        }
        state = dfaState.Initial;
        break;
      case dfaState.GE:
        state = dfaState.Initial;
        break;
      case dfaState.EQ:
        if (c == "=") {
          token.type = tokenType.EQ;
          token.text += c;
        } else if (isBlank(c) || isAlpha(c) || isDigit(c)) {
          token.type = tokenType.Assignment;
        }
        state = dfaState.Initial;
        break;
      case dfaState.NOT:
        if (c == "=") {
          token.type = tokenType.NE;
          token.text += c;
        } else if (isAlpha(c) || isDigit(c)) {
          token.type = tokenType.NOT;
        }
        state = dfaState.Initial;
        break;
    }
    i++;
  }
  if (token != null) {
    tokens.push(token);
  }
  return tokens;
}