'use strict';

(function () {
  window.domManager = {
    fillTextContent: function (owner, text) {
      owner.textContent = text;
    },
    removeDomChild: function (elem, start) {
      while (elem.children[start - 1]) {
        elem.removeChild(elem.children[start - 1]);
      }
    }
  };
})();
