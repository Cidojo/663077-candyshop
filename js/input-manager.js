'use strict';

(function () {
  var formInputsByBlock = [
    {
      fieldSelector: '.contact-data',
      inputsSelector: '.text-input__input'
    },
    {
      fieldSelector: '.payment__card-wrap',
      inputsSelector: '.text-input__input'
    },
    {
      fieldSelector: '.payment__cash-wrap'
    },
    {
      fieldSelector: '.deliver__store',
      inputsSelector: '.input-btn__input'
    },
    {
      fieldSelector: '.deliver__courier',
      inputsSelector: 'fieldset'
    }
  ];

  function initFormNodes(inputsByBlock) {
    inputsByBlock.forEach(function (elem) {
      elem.block = document.querySelector(elem.fieldSelector);
      elem.inputs = elem.block.querySelectorAll(elem.inputsSelector);
    });
  }

  initFormNodes(formInputsByBlock);

  window.inputManager = {
    disableInputToggle: function () {
      this.formInputsByBlock.forEach(function (elem) {
        if (elem.block.classList.contains('visually-hidden') || !window.cart.items.length) {
          elem.inputs.forEach(function (it) {
            it.disabled = 'true';
          });
        } else {
          elem.inputs.forEach(function (it) {
            it.disabled = '';
          });
        }
      });
    },
    formInputsByBlock: formInputsByBlock
  };
})();
