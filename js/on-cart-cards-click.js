'use strict';

(function () {
  window.onClickCartCard = function (evt) {
    evt.preventDefault();

    window.modifyCartList(evt);
    window.fillCards.renderCartCards();
    window.checkCart();
  };
})();
