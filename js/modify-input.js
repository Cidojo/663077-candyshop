'use strict';

(function () {
  window.modifyInput = function (sectionObj, toggle) {
    var block = document.querySelector(sectionObj.block);
    var nodeList = block.querySelectorAll(sectionObj.inputs);
    var isHidden = block.classList.contains('visually-hidden') || false;

    if (isHidden) {
      toggle = 'on';
    }

    for (var i = 0; i < nodeList.length; i++) {
      if (toggle === 'on') {
        nodeList[i].disabled = 'true';
      } else if (toggle === 'off') {
        nodeList[i].disabled = '';
      }
    }
  };
})();
