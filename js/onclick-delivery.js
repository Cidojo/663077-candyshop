'use strict';

(function () {
  var deliverStoreBtn = document.querySelector('#deliver__store');
  var deliverCourierBtn = document.querySelector('#deliver__courier');
  var deliverStoreBlock = document.querySelector('.deliver__store');
  var deliverCourierBlock = document.querySelector('.deliver__courier');

  function onClickDelivery(evt) {
    var myArray = [deliverStoreBlock, deliverCourierBlock];

    if (evt.target === deliverCourierBtn) {
      myArray.reverse();
    }

    myArray[0].classList.remove('visually-hidden');
    myArray[1].classList.add('visually-hidden');

    window.checkCart();
  }

  deliverStoreBtn.addEventListener('click', onClickDelivery);
  deliverCourierBtn.addEventListener('click', onClickDelivery);
})();
