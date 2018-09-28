'use strict';

(function () {
  window.onCartCardClick = function (evt) {
    evt.preventDefault();

    window.cartCards.modifyCartCards(evt);
    window.renderCards.renderCartCards();
    window.checkCart();
  };
})();
