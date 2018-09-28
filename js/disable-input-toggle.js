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

  function getFormNodes(obj) {
    obj.block = document.querySelector(obj.fieldSelector);
    obj.inputs = obj.block.querySelectorAll(obj.inputsSelector);
  }

  formInputsByBlock.forEach(function (elem) {
    getFormNodes(elem);
  });

  window.disableInputToggle = {
    disableInputToggle: function () {
      this.formInputsByBlock.forEach(function (elem) {
        if (elem.block.classList.contains('visually-hidden') || !window.cartCards.cartCards.length) {
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
