'use strict';

(function () {
  window.onCartCardClick = function (evt) {
    evt.preventDefault();

    window.modifyCartList(evt);
    window.fillCards.renderCartCards();
    window.checkCart();
  };
})();
