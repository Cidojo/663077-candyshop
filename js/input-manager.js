'use strict';

(function () {
  window.inputManager = {
    disableToggle: function () {
      this.formInputsByBlock.forEach(function (elem) {
        if (elem.block.classList.contains('visually-hidden') || !window.cart.items.length) {
          elem.inputs.forEach(function (it) {
            it.disabled = true;
          });
        } else {
          elem.inputs.forEach(function (it) {
            it.disabled = false;
          });
        }
      });
    },
    resetFormNodes: function () {
      this.formInputsByBlock.forEach(function (elem) {
        elem.inputs.forEach(function (_elem) {
          if (!_elem.disabled) {
            _elem.value = '';
          }
        });
      });
    },
    initFormNodes: function () {
      this.formInputsByBlock.forEach(function (elem) {
        elem.block = document.querySelector(elem.fieldSelector);
        elem.inputs = elem.block.querySelectorAll(elem.inputsSelector);
      });
    },
    formInputsByBlock: [
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
        inputsSelector: '.text-input__input, textarea'
      }
    ]
  };


  window.inputManager.initFormNodes();
})();
