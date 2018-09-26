'use strict';

(function () {
  var cardNumberInput = document.querySelector('#payment__card-number');

  function getLuhnValidation(string) {
    var sum = 0;
    string.split('').forEach(function (elem) {
      elem = Number(elem);

      if (elem % 2 !== 0) {
        elem *= 2;
        if (elem >= 10) {
          elem -= 9;
        }
      }
      sum += elem;
    });

    if (sum % 10 === 0) {
      return true;
    } else {
      return false;
    }
  }

  cardNumberInput.addEventListener('input', function (evt) {
    var cardStatus = 'Не определен';
    if (getLuhnValidation(evt.currentTarget.value)) {
      cardStatus = 'Одобрено';
    }
    document.querySelector('.payment__card-status').textContent = cardStatus;
  });

  var formSubmitBtn = document.querySelector('.buy__submit-btn');

  formSubmitBtn.addEventListener('click', function (evt) {
    if (formSubmitBtn.checkValidity()) {
      if (!getLuhnValidation(cardNumberInput.value)) {
        evt.preventDefault();
      }
    }
  });
})();
