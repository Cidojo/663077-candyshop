'use strict';

(function () {
  // Клик по карточке каталога
  var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
  var FAVORITE_SELECTED_CLASS = FAVORITE_BUTTON_CLASS + '--selected';
  var ADD_TO_CART_BUTTON_CLASS = 'card__btn';


  window.eventManager = {
  // Клик по карточке каталога
    onCatalogCardClick: function (evt) {
      evt.preventDefault();
      var targetClassList = evt.target.classList;

      if (targetClassList.contains(FAVORITE_BUTTON_CLASS)) {
        targetClassList.toggle(FAVORITE_SELECTED_CLASS);
        evt.target.blur();
      } else if (targetClassList.contains(ADD_TO_CART_BUTTON_CLASS)) {
        window.cartCards.modifyCartCards(evt);
        window.renderCards.renderCartCards();
        window.checkCart();
      }
    },

    // Клик по карточке корзины

    onCartCardClick: function (evt) {
      evt.preventDefault();

      window.cartCards.modifyCartCards(evt);
      window.renderCards.renderCartCards();
      window.checkCart();
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

    myArray[0].classList.remove('visually-hidden');
    myArray[1].classList.add('visually-hidden');

    window.checkCart();
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

    window.checkCart();
  }

  paymentCardBtn.addEventListener('click', onClickPayment);
  paymentCashBtn.addEventListener('click', onClickPayment);


  // Перемещение ползунков цены

  var priceHandlerLeft = document.querySelector('.range__btn--left');
  var priceHandlerRight = document.querySelector('.range__btn--right');
  var priceFillLine = document.querySelector('.range__fill-line');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  var priceBarLength = document.querySelector('.range__filter').offsetWidth;

  var handlerHalfWidth = priceHandlerLeft.offsetWidth / 2;
  var maxPrice = Math.max.apply(null, window.catalogCards.map(function (current) {
    return current.price;
  }));

  var priceBarScale = maxPrice / priceBarLength;

  priceHandlerLeft.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;

      var jump = priceHandlerLeft.offsetLeft - shiftX;

      jump = (jump < 0) ? 0 : jump;
      jump = (jump > priceHandlerRight.offsetLeft) ? priceHandlerRight.offsetLeft : jump;

      priceHandlerLeft.style.left = jump + 'px';
      priceFillLine.style.left = handlerHalfWidth + jump + 'px';
      rangePriceMin.textContent = Math.round(jump * priceBarScale);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  priceHandlerRight.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;

      var jump = priceHandlerRight.offsetLeft - shiftX;

      jump = (jump > priceBarLength) ? priceBarLength : jump;
      jump = (jump < priceHandlerLeft.offsetLeft) ? priceHandlerLeft.offsetLeft : jump;

      priceHandlerRight.style.left = jump + 'px';
      priceFillLine.style.right = priceBarLength - jump - handlerHalfWidth + 'px';
      rangePriceMax.textContent = Math.round(jump * priceBarScale);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  rangePriceMin.textContent = Math.round((priceHandlerLeft.offsetLeft - handlerHalfWidth) * priceBarScale);
  rangePriceMax.textContent = Math.round((priceHandlerRight.offsetLeft - handlerHalfWidth) * priceBarScale);
})();
