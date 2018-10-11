'use strict';

(function () {

  // Клик по карточке каталога


  var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
  var ADD_BUTTON_CLASS = 'card__btn';
  var COMPOSITION_BUTTON_CLASS = 'card__btn-composition';
  var CART_CARD_CLASS = 'card-order';
  var PAYMENT_STATUS_APPROVED = 'Одобрен';
  var PAYMENT_STATUS_INVALID = 'Не определен';
  var INVALID_CARD_NUMBER = 'Неверно введен номер карты';


  var buyForm = document.querySelector('.buy form');
  var deliverStoreTab = buyForm.querySelector('#deliver__store');
  var deliverCourierTab = buyForm.querySelector('#deliver__courier');
  var deliverStoreBlock = buyForm.querySelector('.deliver__store');
  var deliverCourierBlock = buyForm.querySelector('.deliver__courier');
  var paymentCardTab = buyForm.querySelector('#payment__card');
  var paymentCashTab = buyForm.querySelector('#payment__cash');
  var paymentCardBlock = buyForm.querySelector('.payment__card-wrap');
  var paymentCashBlock = buyForm.querySelector('.payment__cash-wrap');
  var cardNumberInput = buyForm.querySelector('#payment__card-number');
  var paymentStatus = buyForm.querySelector('.payment__card-status');
  var mapImg = buyForm.querySelector('.deliver__store-map-wrap img');
  var selfCarryInputs = buyForm.querySelectorAll('input[name="store"]');
  var selfCarryLabels = buyForm.querySelectorAll('input[name="store"] + label');


  function findCardElement(cardTitle) {
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

    card.currentCatalogCardNode = findCardElement(card.name);
    card.index = getCardsIndexes(card.name);

    return card;
  }


  // Переключение табов способа доставки и оплаты

  function toggleTabs(target, tabs, hiddenBlockTab) {
    if (target === hiddenBlockTab) {
      tabs.reverse();
    }

    ['remove', 'add'].forEach(function (method, index) {
      tabs[index].classList[method]('visually-hidden');
    });

    window.cart.check();
  }


  function onClickDeliveryTab(evt) {
    toggleTabs(evt.target, [deliverStoreBlock, deliverCourierBlock], deliverCourierTab);
  }


  function onClickPaymentTab(evt) {
    toggleTabs(evt.target, [paymentCardBlock, paymentCashBlock], paymentCashTab);
  }

  paymentCardTab.addEventListener('click', onClickPaymentTab);
  paymentCashTab.addEventListener('click', onClickPaymentTab);

  deliverStoreTab.addEventListener('click', onClickDeliveryTab);
  deliverCourierTab.addEventListener('click', onClickDeliveryTab);

  // Проверка валидации полей, return true если поля НЕ валидны
  function getCardPaymentInvalidity(fields) {
    if (!cardNumberInput.disabled && !window.util.getLuhnValidation(cardNumberInput.value)) {
      return true;
    }

    return Array.from(fields).map(function (field) {
      return field.checkValidity();
    }).some(function (status) {
      return status === false;
    });
  }


  window.inputManager.formInputsByBlock[1].inputs.forEach(function (field) {
    field.addEventListener('input', function () {
      var cardStatus = PAYMENT_STATUS_INVALID;
      if (!getCardPaymentInvalidity(window.inputManager.formInputsByBlock[1].inputs)) {
        cardStatus = PAYMENT_STATUS_APPROVED;
      }
      cardNumberInput.customValidity = INVALID_CARD_NUMBER;
      paymentStatus.textContent = cardStatus;
    });
  });


  buyForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!buyForm.checkValidity() || window.inputManager.formInputsByBlock[0].inputs[0].disabled) {
      return;
    }

    if (getCardPaymentInvalidity(window.inputManager.formInputsByBlock[1].inputs)) {
      cardNumberInput.focus();
      return;
    }

    window.backend.upload(new FormData(buyForm));
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
        window.favorite.updateList(currentCard, evt.target);

      } else if (targetClassList.contains(COMPOSITION_BUTTON_CLASS)) {
        evt.currentTarget.querySelector('.card__composition').classList.toggle('card__composition--hidden');

      } else if (evt.currentTarget.classList.contains(CART_CARD_CLASS) || targetClassList.contains(ADD_BUTTON_CLASS)) {
        window.cart.modify(evt, currentCard);
      }
    }
  };

})();
