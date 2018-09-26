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
      window.cartCards = window.formCartList(evt.currentTarget);

      window.emptyCartBottom.classList.add('visually-hidden');
      window.fillTextContent(window.emptyCartHeader, 'В корзине ' + window.cartCards.length + ' ' + window.getStringEnding(['товар', 'товара', 'товаров'], window.cartCards.length));
      window.fillCards.cartCards();
      window.checkCart();
    }
  };
})();
