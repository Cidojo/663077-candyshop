'use strict';

(function () {
  var FORM_INPUTS = {
    contacts: {
      block: '.contact-data',
      inputs: '.text-input__input'
    },
    paymentCard: {
      block: '.payment__card-wrap',
      inputs: '.text-input__input'
    },
    paymentCash: {
      block: '.payment__cash-wrap'
    },
    deliverStore: {
      block: '.deliver__store',
      inputs: '.input-btn__input'
    },
    deliverCourier: {
      block: '.deliver__courier',
      inputs: 'fieldset'
    }
  };

  var emptyCartHeader = document.querySelector('.main-header__basket');
  var emptyCartBottom = document.querySelector('.goods__card-empty');

  window.checkCart = function () {
    if (window.cartCards.length === 0) {
      Object.keys(FORM_INPUTS)
          .forEach(function (key) {
            window.modifyInput(FORM_INPUTS[key], 'on');
          });
      emptyCartBottom.classList.remove('visually-hidden');
      window.fillTextContent(emptyCartHeader, 'В корзине ничего нет');
    } else {
      Object.keys(FORM_INPUTS)
          .forEach(function (key) {
            window.modifyInput(FORM_INPUTS[key], 'off');
          });

      emptyCartBottom.classList.add('visually-hidden');

      var fullCartMessage = 'В корзине ' +
          window.cartCards.length +
              ' ' +
                  window.getStringEnding(['товар', 'товара', 'товаров'], window.cartCards.length) +
                      ' на сумму ' +
                          window.cartCards
                              .map(function (current) {
                                return current.price * current.count;
                              })
                              .reduce(function (sum, current) {
                                return sum + current;
                              }, 0) +
                                  ' ' +
                                      window.getStringEnding(['рубль', 'рубля', 'рублей']) +
                                          '.';
      window.fillTextContent(emptyCartHeader, fullCartMessage);
    }
  };

  window.checkCart();
})();
