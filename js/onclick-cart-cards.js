'use strict';

(function () {
  window.onClickCartCard = function (evt) {
    evt.preventDefault();

    window.modifyCartList(evt);
    window.fillCards.cartCards();
    window.checkCart();
  };
})();
