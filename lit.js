import {mapValuesAndKeys} from 'mk-js-utils';

//todo How about GC
const memoizedParse =_.memoize(JSON.parse);
export const staticProp = (object) => {
  return memoizedParse(JSON.stringify(object));
};

//todo Fix unintentional caching results just like cache directive. Idea: Create own directive.
const staticElements = new WeakMap;
export const staticElement = (host, key, tagName, props, attrs) => {
  const staticElementsOfHost = staticElements.get(host) || new Map;
  staticElements.set(host, staticElementsOfHost);
  const element = staticElementsOfHost.get(key) || document.createElement(tagName);
  staticElementsOfHost.set(key, element);
  mapValuesAndKeys(_, (attrValue, attrName) => element.setAttribute(attrName, attrValue), attrs);
  return Object.assign(element, props);
};
