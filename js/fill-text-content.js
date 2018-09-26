'use strict';

// заполняет свойство textContent DOM - элемента

(function () {
  window.fillTextContent = function (owner, text) {
    owner.textContent = text;
  };
})();
