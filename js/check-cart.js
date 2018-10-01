'use strict';

(function () {
  var emptyCartHeader = document.querySelector('.main-header__basket');
  var emptyCartBottom = document.querySelector('.goods__card-empty');

  function toggleCartVisibility(_toggle) {
    var message = !_toggle ? 'В корзине ничего нет' :
      'В корзине ' + window.cartCards.cartCards.length + ' ' + window.getStringEnding(['товар', 'товара', 'товаров'], window.cartCards.cartCards.length) + ' на сумму ' +
          window.cartCards.cartCards.reduce(function (sum, current) {
            return sum + current.price;
          }, 0) + ' ' + window.getStringEnding(['рубль', 'рубля', 'рублей']) + '.';

    emptyCartBottom.classList.toggle('visually-hidden', _toggle);
    window.fillTextContent(emptyCartHeader, message);
  }

  window.checkCart = function () {
    var toggle = window.cartCards.cartCards.length ? true : false;
    window.disableInputToggle.disableInputToggle();
    toggleCartVisibility(toggle);
  };

  window.checkCart();
})();
