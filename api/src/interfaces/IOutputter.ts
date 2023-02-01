export interface IOutputter {
  toJSON: () => object;
  toString: () => string;
}
