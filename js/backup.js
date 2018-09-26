'use strict';

(function () {

})();

// -------------------------------------------------
// 1. DATA - ИСХОДНЫЕ ДАННЫЕ
// -------------------------------------------------

// @@@DATA Раздел 3.1

// @@@DATA Раздел 3.2

var CART_TEMPLATE = {
  parent: '.goods__cards',
  template: '#card-order',
  nest: '.card-order',
  title: '.card-order__title',
  pictureRef: '.card-order__img',
  price: '.card-order__price',
  count: '.card-order__count'
};

// @@@DATA Раздел 4.1

var cartCards = [];


var DELETE_FROM_CART_BUTTON = 'card-order__close';
var CART_INCREASE_BUTTON = 'card-order__btn--increase';
var CART_DECREASE_BUTTON = 'card-order__btn--decrease';


var FORM_INPUTS = {
  contacts: {
    block: '.contact-data',
    inputs: '.text-input__input'
  },
  paymentCard: {
    block: '.payment__card-wrap',
    inputs: '.text-input__input'
  },
  paymentCash: {
    block: '.payment__cash-wrap'
  },
  deliverStore: {
    block: '.deliver__store',
    inputs: '.input-btn__input'
  },
  deliverCourier: {
    block: '.deliver__courier',
    inputs: 'fieldset'
  }
};

// -------------------------------------------------
// 2. NODES - НОДЫ
// -------------------------------------------------

var emptyCartHeader = document.querySelector('.main-header__basket');
var emptyCartBottom = document.querySelector('.goods__card-empty');
var deliverStoreBlock = document.querySelector('.deliver__store');
var deliverStoreBtn = document.querySelector('#deliver__store');
var deliverCourierBlock = document.querySelector('.deliver__courier');
var deliverCourierBtn = document.querySelector('#deliver__courier');
var deliverCourierBtnId = 'deliver__courier';
var paymentCardBlock = document.querySelector('.payment__card-wrap');
var paymentCashBlock = document.querySelector('.payment__cash-wrap');
var paymentCashBtnId = 'payment__cash';
var paymentCardBtn = document.querySelector('#payment__card');
var paymentCashBtn = document.querySelector('#payment__cash');
// -------------------------------------------------
// 3. FUNC - ФУНКЦИИ И МЕТОДЫ
// -------------------------------------------------

// @@@FUNC Раздел 3.1

// возвращает случайное число из интервала, {round} - кратность окончания полученного числа из ряда [5, 10, 50, 100 ...]

// возвращает объект raiting объекта - карточки товара

// возвращает объект nutritionFacts объекта - карточки товара
// создает объект - карточку товара

// возвращает массив объектов - карточек товаров

// @@@FUNC Раздел 3.2

// изменяет окончание в зависимости от количества

// заполняет свойство textContent у DOM/fragment элемента

// заполняет свойтво src у DOM/fragment элемента

// заполняет цену

// добавляет класс DOM/fragment элементу в зависимости от количества

// добавляет класс DOM/fragment элементу + меняет текст(окончание) в зависимости от количества звезд

// конструктор? для создания объекта с установленными методами


// формирует новый fragment в документе, соответствующий карточке товара

// вставляет fragment - лист заданного количества карточек в DOM дерево

// @@@FUNC Раздел 4.1

// удаляет всех потомков DOM элемента, кроме первого


// проверяет, есть ли переданный элемент в переданном списке --- используется для добавления товара в корзину

// изменяет массив, соответствующий состоянию корзины по щелчку по карточке

// алгоритм обработчика событий по клику на карточку каталога


// алгоритм обработчика событий по клику на карточку каталога

function onClickCartCard(evt) {
  evt.preventDefault();
  var mode;

  if (evt.target.classList.contains(DELETE_FROM_CART_BUTTON)) {
    mode = 'Del';
  } else if (evt.target.classList.contains(CART_INCREASE_BUTTON)) {
    mode = 'Inc';
  } else if (evt.target.classList.contains(CART_DECREASE_BUTTON)) {
    mode = 'Dec';
  }

  cartCards = modifyCartList(evt.currentTarget, mode);
  if (cartCards.length === 0) {
    emptyCartBottom.classList.remove('visually-hidden');
    fillTextContent(emptyCartHeader, 'В корзине ничего нет');
  }

  fillCards(new BuildTemplate(CART_TEMPLATE), cartCards, onClickCartCard);
  fillTextContent(emptyCartHeader, 'В корзине ' + cartCards.length + ' ' + declOfNum(['товар', 'товара', 'товаров'], cartCards.length));
  checkCart();
}

// выбор доставки

function onClickDelivery(evt) {
  var toBeShown = deliverStoreBlock;
  var toBeHidden = deliverCourierBlock;

  if (evt.target.id === deliverCourierBtnId) {
    toBeShown = deliverCourierBlock;
    toBeHidden = deliverStoreBlock;
  }

  toBeShown.classList.remove('visually-hidden');
  toBeHidden.classList.add('visually-hidden');

  modifyInput(FORM_INPUTS.deliverStore, 'off');
  modifyInput(FORM_INPUTS.deliverCourier, 'off');
  checkCart();
}

function onClickPayment(evt) {
  var toBeShown = paymentCardBlock;
  var toBeHidden = paymentCashBlock;

  if (evt.target.id === paymentCashBtnId) {
    toBeShown = paymentCashBlock;
    toBeHidden = paymentCardBlock;
  }

  toBeShown.classList.remove('visually-hidden');
  toBeHidden.classList.add('visually-hidden');

  modifyInput(FORM_INPUTS.paymentCard, 'off');
  modifyInput(FORM_INPUTS.paymentCash, 'off');
  checkCart();
}

function modifyInput(sectionObj, toggle) {
  var block = document.querySelector(sectionObj.block);
  var nodeList = block.querySelectorAll(sectionObj.inputs);
  var isHidden = block.classList.contains('visually-hidden') || false;

  if (isHidden) {
    toggle = 'on';
  }

  for (var i = 0; i < nodeList.length; i++) {
    if (toggle === 'on') {
      nodeList[i].setAttribute('disabled', true);
    } else if (toggle === 'off') {
      nodeList[i].removeAttribute('disabled');
    }
  }
}

// проверка товаров в корзине

function checkCart() {
  for (var subObj in FORM_INPUTS) {
    if (cartCards.length === 0) {
      modifyInput(FORM_INPUTS[subObj], 'on');
    } else {
      modifyInput(FORM_INPUTS[subObj], 'off');
    }
  }
}

// -------------------------------------------------
// 4. EVT - ОБРАБОТЧИКИ СОБЫТИЙ
// -------------------------------------------------

deliverStoreBtn.addEventListener('click', onClickDelivery);
deliverCourierBtn.addEventListener('click', onClickDelivery);
paymentCardBtn.addEventListener('click', onClickPayment);
paymentCashBtn.addEventListener('click', onClickPayment);

// -------------------------------------------------
// 5. INIT - ИСПОЛНЕНИЕ
// -------------------------------------------------

// @@@INIT Раздел 3.1

// @@@INIT Раздел 3.2

// @@@INIT Раздел 4.2

checkCart();

// ЕЩЕ НЕ РЕФАКТОРИЛ, НАПИСАНО КАК ЕСТЬ
//  | | | | | | | | | | | | | | | | | |
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

//  price filters

var priceHandlerLeft = document.querySelector('.range__btn--left');
var priceHandlerRight = document.querySelector('.range__btn--right');
var priceFillLine = document.querySelector('.range__fill-line');
var rangePriceMin = document.querySelector('.range__price--min');
var rangePriceMax = document.querySelector('.range__price--max');

function getCurrentHandlerX(handler) {
  return handler.offsetLeft;
}

priceHandlerLeft.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;

    startCoordsX = moveEvt.clientX;

    var jump = (priceHandlerLeft.offsetLeft - shiftX);

    jump = (jump < 0) ? 0 : jump;
    jump = (jump > getCurrentHandlerX(priceHandlerRight)) ? getCurrentHandlerX(priceHandlerRight) : jump;

    priceHandlerLeft.style.left = jump + 'px';
    priceFillLine.style.left = priceHandlerLeft.offsetWidth + jump + 'px';
    rangePriceMin.textContent = jump;
  }

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

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

    var jump = (priceHandlerRight.offsetLeft - shiftX);
    var max = document.querySelector('.range__filter').offsetWidth;

    jump = (jump > max) ? max : jump;
    jump = (jump < getCurrentHandlerX(priceHandlerLeft)) ? getCurrentHandlerX(priceHandlerLeft) : jump;

    priceHandlerRight.style.left = jump + 'px';
    priceFillLine.style.right = max - jump + 'px';
    rangePriceMax.textContent = jump;
  }

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Алгоритм Луна


var cardNumberInput = document.querySelector('#payment__card-number');

cardNumberInput.value = '4276550032461518';

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
