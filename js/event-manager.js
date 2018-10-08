'use strict';

(function () {

  // Клик по карточке каталога


  var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
  var FAVORITE_BUTTON_ADD_CLASS = 'card__btn';
  var COMPOSITION_BUTTON_CLASS = 'card__btn-composition';
  var CART_CARD_CLASS = 'card-order';
  var PAYMENT_STATUS_APPROVED = 'Одобрено';
  var PAYMENT_STATUS_INVALID = 'Не определен';

  var deliverStoreBtn = document.querySelector('#deliver__store');
  var deliverCourierBtn = document.querySelector('#deliver__courier');
  var deliverStoreBlock = document.querySelector('.deliver__store');
  var deliverCourierBlock = document.querySelector('.deliver__courier');
  var paymentCardBtn = document.querySelector('#payment__card');
  var paymentCashBtn = document.querySelector('#payment__cash');
  var paymentCardBlock = document.querySelector('.payment__card-wrap');
  var paymentCashBlock = document.querySelector('.payment__cash-wrap');
  var cardNumberInput = document.querySelector('#payment__card-number');
  var paymentStatus = document.querySelector('.payment__card-status');
  var form = document.querySelector('.buy form');
  var mapImg = document.querySelector('.deliver__store-map-wrap img');
  var selfCarryInputs = document.querySelectorAll('input[name="store"]');
  var selfCarryLabels = document.querySelectorAll('input[name="store"] + label');


  function getCurrentCatalogCardNode(cardTitle) {
    var renderedCatalog = document.querySelectorAll('.catalog__card');
    var indexFound = Array.from(renderedCatalog).findIndex(function (it) {
      return it.querySelector('h3').textContent === cardTitle;
    });
    return renderedCatalog[indexFound];
  }


  function getCardsIndexes(name) {
    return {
      cart: window.util.getCardIndex(window.cart.items, name),
      catalog: window.util.getCardIndex(window.backend.catalogCards, name)
    };
  }


  function getCardClicked(evt) {
    var card = {
      name: evt.currentTarget.querySelector('h3').textContent,
      isInCatalog: evt.currentTarget.classList.contains('catalog__card')
    };

    card.currentCatalogCardNode = getCurrentCatalogCardNode(card.name);
    card.indexes = getCardsIndexes(card.name);

    return card;
  }


  function onClickDelivery(evt) {
    var myArray = [deliverStoreBlock, deliverCourierBlock];

    if (evt.target === deliverCourierBtn) {
      myArray.reverse();
    }

    ['remove', 'add'].forEach(function (method, index) {
      myArray[index].classList[method]('visually-hidden');
    });

    window.cart.checkCart();
  }


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


  function getInvalidityOfGroup(fields) {
    var myArr = [];
    fields.forEach(function (field) {
      myArr.push(field.checkValidity());
    });
    return myArr.some(function (status) {
      return status === false;
    });
  }


  deliverStoreBtn.addEventListener('click', onClickDelivery);
  deliverCourierBtn.addEventListener('click', onClickDelivery);


  window.inputManager.formInputsByBlock[1].inputs.forEach(function (field) {
    field.addEventListener('input', function () {
      var cardStatus = PAYMENT_STATUS_INVALID;
      if (window.util.getLuhnValidation(cardNumberInput.value) && !getInvalidityOfGroup(window.inputManager.formInputsByBlock[1].inputs)) {
        cardStatus = PAYMENT_STATUS_APPROVED;
      }
      cardNumberInput.customValidity = 'Неверно введен номер карты';
      paymentStatus.textContent = cardStatus;
    });
  });


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (form.checkValidity() && (cardNumberInput.disabled || window.util.getLuhnValidation(cardNumberInput.value))) {
      window.backend.upload(new FormData(form));
    } else if (!cardNumberInput.disabled && !window.util.getLuhnValidation(cardNumberInput.value)) {
      cardNumberInput.focus();
    }
  });


  selfCarryInputs.forEach(function (button, buttonIndex) {
    button.addEventListener('change', function (evt) {
      if (evt.currentTarget.checked) {
        mapImg.setAttribute('src', 'img/map/' + evt.currentTarget.value + '.jpg');
        mapImg.setAttribute('alt', selfCarryLabels[buttonIndex].textContent);
      }
    });
  });


  window.eventManager = {
    onCardClick: function (evt) {
      evt.preventDefault();
      var targetClassList = evt.target.classList;
      var currentCard = getCardClicked(evt);

      if (targetClassList.contains(FAVORITE_BUTTON_CLASS)) {
        window.favorite.updateFavoriteList(currentCard, evt.target);

      } else if (targetClassList.contains(COMPOSITION_BUTTON_CLASS)) {
        evt.currentTarget.querySelector('.card__composition').classList.toggle('card__composition--hidden');

      } else if (evt.currentTarget.classList.contains(CART_CARD_CLASS) || targetClassList.contains(FAVORITE_BUTTON_ADD_CLASS)) {
        window.cart.modify(evt, currentCard);
      }
    }
  };

})();
