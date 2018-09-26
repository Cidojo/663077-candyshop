'use strict';

(function () {
  var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
  var FAVORITE_SELECTED_CLASS = FAVORITE_BUTTON_CLASS + '--selected';
  var ADD_TO_CART_BUTTON_CLASS = 'card__btn';

  window.onClickCatalogCard = function (evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(FAVORITE_BUTTON_CLASS)) {
      evt.target.classList.toggle(FAVORITE_SELECTED_CLASS);
      evt.target.blur();
    } else if (evt.target.classList.contains(ADD_TO_CART_BUTTON_CLASS)) {
      window.cartCards = window.modifyCartList(evt);
      window.fillCards.cartCards();
      window.checkCart();
    }
  };
})();
