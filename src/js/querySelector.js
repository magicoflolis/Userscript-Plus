'use strict';

export const qsA = (element,selector) => {
  selector = selector ?? document;
  return selector.querySelectorAll(element);
},
qs = (element,selector) => {
  selector = selector ?? document;
  return selector.querySelector(element);
};

// export { qsA,qs };