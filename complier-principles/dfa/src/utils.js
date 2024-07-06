export const isAlpha = (c) => {
  return /[a-zA-Z]/.test(c);
};
export const isDigit = (c) => {
  return /[0-9]/.test(c);
};
export const isBlank = (c) => {
  return /\s/.test(c);
};