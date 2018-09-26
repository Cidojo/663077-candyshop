'use strict';

(function () {
  window.isCardInList = function (cardName, list) {
    var flag = false;

    if (list.length !== 0) {
      list.forEach(function (elem, index) {
        if (cardName === elem.name) {
          flag = index;
        }
      });
    }

    return flag;
  };
})();
