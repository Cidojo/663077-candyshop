'use strict';

(function () {
  // Клик по карточке каталога
  var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
  var FAVORITE_SELECTED_CLASS = FAVORITE_BUTTON_CLASS + '--selected';


  window.eventManager = {
    onCardClick: function (evt) {
      evt.preventDefault();
      var targetClassList = evt.target.classList;

      if (targetClassList.contains(FAVORITE_BUTTON_CLASS)) {
        targetClassList.toggle(FAVORITE_SELECTED_CLASS);
        evt.target.blur();
      } else {
        window.cart.modify(evt);
      }
    }
  };

  // Клик по блоку выбора доставки

  var deliverStoreBtn = document.querySelector('#deliver__store');
  var deliverCourierBtn = document.querySelector('#deliver__courier');
  var deliverStoreBlock = document.querySelector('.deliver__store');
  var deliverCourierBlock = document.querySelector('.deliver__courier');

  function onClickDelivery(evt) {
    var myArray = [deliverStoreBlock, deliverCourierBlock];

    if (evt.target === deliverCourierBtn) {
      myArray.reverse();
    }

    ['remove', 'add'].forEach(function (method, index) {
      myArray[index].classList[method]('visually-hidden');
    }); // это работает!))

    // myArray[0].classList.remove('visually-hidden');
    // myArray[1].classList.add('visually-hidden');

    window.cart.checkCart();
  }

  deliverStoreBtn.addEventListener('click', onClickDelivery);
  deliverCourierBtn.addEventListener('click', onClickDelivery);

  // Клик по блоку выбора оплаты

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

    window.cart.checkCart();
  }

  paymentCardBtn.addEventListener('click', onClickPayment);
  paymentCashBtn.addEventListener('click', onClickPayment);

  // Проверка по алгоритму Луна

  var PAYMENT_STATUS_APPROVED = 'Одобрено';
  var PAYMENT_STATUS_INVALID = 'Не определен';

  var cardNumberInput = document.querySelector('#payment__card-number');
  var formSubmitBtn = document.querySelector('.buy__submit-btn');
  var paymentStatus = document.querySelector('.payment__card-status');

  function getInvalidityOfGroup(fields) {
    var myArr = [];
    fields.forEach(function (field) {
      myArr.push(field.checkValidity());
    });
    return myArr.some(function (status) {
      return status === false;
    });
  }

  window.inputManager.formInputsByBlock[1].inputs.forEach(function (field) {
    field.addEventListener('input', function () {
      var cardStatus = PAYMENT_STATUS_INVALID;
      if (window.util.getLuhnValidation(cardNumberInput.value) && !getInvalidityOfGroup(window.inputManager.formInputsByBlock[1].inputs)) {
        cardStatus = PAYMENT_STATUS_APPROVED;
      }
      paymentStatus.textContent = cardStatus;
    });
  });

  formSubmitBtn.addEventListener('click', function (evt) {
    if (formSubmitBtn.checkValidity() && paymentStatus.textContent === PAYMENT_STATUS_APPROVED) {
      evt.preventDefault();
    }
  });

  var mapImg = document.querySelector('.deliver__store-map-wrap img');
  var selfCarryInputs = document.querySelectorAll('input[name="store"]');
  var selfCarryLabels = document.querySelectorAll('input[name="store"] + label');

  selfCarryInputs.forEach(function (button, buttonIndex) {
    button.addEventListener('change', function (evt) {
      if (evt.currentTarget.checked) {
        mapImg.setAttribute('src', 'img/map/' + evt.currentTarget.value + '.jpg');
        mapImg.setAttribute('alt', selfCarryLabels[buttonIndex].textContent);
      }
    });
  });

})();
