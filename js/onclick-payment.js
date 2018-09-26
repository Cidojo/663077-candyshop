'use strict';

(function () {
  var paymentCardBtn = document.querySelector('#payment__card');
  var paymentCashBtn = document.querySelector('#payment__cash');
  var paymentCardBlock = document.querySelector('.payment__card-wrap');
  var paymentCashBlock = document.querySelector('.payment__cash-wrap');

  function onClickPayment(evt) {
    var myArray = [paymentCardBlock, paymentCashBlock];

    if (evt.target === paymentCashBtn) {
      myArray.reverse();
    }

    myArray[0].classList.remove('visually-hidden');
    myArray[1].classList.add('visually-hidden');

    window.checkCart();
  }

  paymentCardBtn.addEventListener('click', onClickPayment);
  paymentCashBtn.addEventListener('click', onClickPayment);
})();
