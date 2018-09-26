'use strict';

(function () {
  window.removeDomChild = function (elem, start) {
    while (elem.children[start - 1]) {
      elem.removeChild(elem.children[start - 1]);
    }
  };
})();
