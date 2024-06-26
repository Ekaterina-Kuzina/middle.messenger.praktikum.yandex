import { Block } from './Block.ts';

type PlainObject<T = unknown> = {
  [k in string]: T;
};

export const isEqual = (lhs: unknown, rhs: unknown) => {
  return lhs === rhs;
};

const isPlainObject = (value: unknown): value is PlainObject => {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
};

const isArray = (value: unknown): value is [] => {
  return Array.isArray(value);
};

const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
  return isPlainObject(value) || isArray(value);
};

export const isDeepEqual = (lhs: PlainObject, rhs: PlainObject) => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }
    if (value !== rightValue) {
      return false;
    }
  }
  return true;
};

export const renderDOM = (block: Block) => {
  const root = document.getElementById('app') as HTMLElement;
  const element = block.getContent();
  if (element) root?.appendChild(element);
  return root;
};
