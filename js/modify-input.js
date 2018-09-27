'use strict';

(function () {
  window.modifyInput = function (sectionObj, toggle) {
    var block = document.querySelector(sectionObj.block);
    var nodeList = block.querySelectorAll(sectionObj.inputs);
    var isHidden = block.classList.contains('visually-hidden') || false;

    if (isHidden) {
      toggle = 'on';
    }

    if (toggle === 'on') {
      nodeList.forEach(function (it) {
        it.disabled = 'true';
      });
    } else if (toggle === 'off') {
      nodeList.forEach(function (it) {
        it.disabled = '';
      });
    }
  };
})();
