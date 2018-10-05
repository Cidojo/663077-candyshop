'use strict';

(function () {

  // Клик по карточке каталога


  var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
  var FAVORITE_BUTTON_ADD_CLASS = 'card__btn';
  var COMPOSITION_BUTTON_CLASS = 'card__btn-composition';
  var CART_CARD_CLASS = 'card-order';


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
      catalog: window.util.getCardIndex(window.catalogCards, name)
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
