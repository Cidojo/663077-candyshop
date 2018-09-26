'use strict';

(function () {
  window.FORM_INPUTS = {
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

  window.checkCart = function () {
    for (var subObj in window.FORM_INPUTS) {
      if (window.cartCards.length === 0) {
        window.modifyInput(window.FORM_INPUTS[subObj], 'on');
      } else {
        window.modifyInput(window.FORM_INPUTS[subObj], 'off');
      }
    }
  };

  window.checkCart();
})();
