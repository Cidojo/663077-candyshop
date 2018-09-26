'use strict';

(function () {
  var DELETE_FROM_CART_BUTTON = 'card-order__close';
  var CART_INCREASE_BUTTON = 'card-order__btn--increase';
  var CART_DECREASE_BUTTON = 'card-order__btn--decrease';

  window.onClickCartCard = function (evt) {
    evt.preventDefault();
    var mode;

    if (evt.target.classList.contains(DELETE_FROM_CART_BUTTON)) {
      mode = 'Del';
    } else if (evt.target.classList.contains(CART_INCREASE_BUTTON)) {
      mode = 'Inc';
    } else if (evt.target.classList.contains(CART_DECREASE_BUTTON)) {
      mode = 'Dec';
    }

    window.cartCards = window.modifyCartList(evt.currentTarget, mode);
    if (window.cartCards.length === 0) {
      window.emptyCartBottom.classList.remove('visually-hidden');
      window.fillTextContent(window.emptyCartHeader, 'В корзине ничего нет');
    }

    window.fillCards.cartCards();
    window.fillTextContent(window.emptyCartHeader, 'В корзине ' + window.cartCards.length + ' ' + window.getStringEnding(['товар', 'товара', 'товаров'], window.cartCards.length));
    window.checkCart();
  };
})();
