'use strict';

// -------------------------------------------------
// 1. DATA - ИСХОДНЫЕ ДАННЫЕ
// -------------------------------------------------

// @@@DATA Раздел 3.1

var CARDS_QTY = 10;

var CARD_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
  'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка',
  'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа',
  'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
  'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное',
  'Острый язычок'];

var PICTURE_NAMES = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg',
  'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg',
  'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg',
  'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg',
  'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg',
  'soda-russian.jpg'];

var PICTURE_PATH = 'img/cards/';

var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор',
  'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит ', 'карбамид', 'вилларибо', 'виллабаджо'];

var RATING = {
  values: [1, 5],
  numbers: [10, 900]
};

var AMOUNT = {
  min: 0,
  max: 20
};

var PRICE = {
  min: 100,
  max: 1500,
  round: 50
};

var WEIGHT = {
  min: 30,
  max: 300
};

var ENERGY = {
  min: 70,
  max: 500
};

var MAX_AMOUNT = 5;

var STARS_LITERALS = ['one', 'two', 'three', 'four', 'five'];

// @@@DATA Раздел 3.2

var CATALOG_TEMPLATE = {
  parent: '.catalog__cards',
  template: '#card',
  nest: '.catalog__card',
  title: '.card__title',
  pictureRef: '.card__img',
  price: '.card__price',
  weight: '.card__weight',
  stars: '.stars__rating',
  starsCount: '.star__count',
  characteristics: '.card__characteristic',
  composition: '.card__composition-list'
};

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

var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
var FAVORITE_SELECTED_CLASS = FAVORITE_BUTTON_CLASS + '--selected';
var ADD_TO_CART_BUTTON_CLASS = 'card__btn';

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

function getRandomInt(min, max, round) {
  round = round || 1;
  return Math.round(((min + Math.round(Math.random() * (max - min))) / round)) * round;
}

// возвращает объект raiting объекта - карточки товара

function getRating(rating) {
  return {
    value: getRandomInt(rating.values[0], rating.values[1]),
    number: getRandomInt(rating.numbers[0], rating.numbers[1])
  };
}

// возвращает объект nutritionFacts объекта - карточки товара

function getNutrition(contentsInitial) {
  var contentsCustom = contentsInitial.slice(0);
  var tries = getRandomInt(1, contentsCustom.length - 1);

  for (var i = 0; i < tries; i++) {
    var randomIndex = getRandomInt(0, contentsCustom.length - 1);

    contentsCustom.splice(randomIndex, 1);
  }

  return {
    sugar: !!Math.round(Math.random()),
    energy: getRandomInt(ENERGY.min, ENERGY.max),
    contents: contentsCustom.join(', ') + '.'
  };
}

// создает объект - карточку товара

function createCard(name, imgLink) {
  return {
    name: name,
    picture: imgLink,
    amount: getRandomInt(AMOUNT.min, AMOUNT.max),
    price: getRandomInt(PRICE.min, PRICE.max, PRICE.round),
    weight: getRandomInt(WEIGHT.min, WEIGHT.max),
    rating: getRating(RATING),
    nutritionFacts: getNutrition(CONTENTS)
  };
}

// возвращает массив объектов - карточек товаров

function collectCards(quantity) {
  var cardsCollection = [];
  var cloneNames = CARD_NAMES.slice(0);
  var clonePictureNames = PICTURE_NAMES.slice(0);

  for (var i = 0; i < quantity; i++) {
    var nameIndex = getRandomInt(0, cloneNames.length - 1);
    var pictureNamesIndex = getRandomInt(0, clonePictureNames.length - 1);

    cardsCollection.push(createCard(cloneNames[nameIndex], clonePictureNames[pictureNamesIndex]));
    cloneNames.splice(nameIndex, 1);
    clonePictureNames.splice(pictureNamesIndex, 1);
  }

  return cardsCollection;
}

// @@@FUNC Раздел 3.2

// изменяет окончание в зависимости от количества

var declOfNum = (function () {
  var cases = [2, 0, 1, 1, 1, 2];
  var declOfNumSubFunction = function (titles, number) {
    number = Math.abs(number);
    return titles[
      (number % 100 > 4 && number % 100 < 20) ?
        2 : cases[(number % 10 < 5) ?
          number % 10 : 5]];
  };
  return function (_titles) {
    if (arguments.length === 1) {
      return function (_number) {
        return declOfNumSubFunction(_titles, _number);
      };
    } else {
      return declOfNumSubFunction.apply(null, arguments);
    }
  };
})();

// заполняет свойство textContent у DOM/fragment элемента

function fillTextContent(owner, text) {
  owner.textContent = text;
}

// заполняет свойтво src у DOM/fragment элемента

function fillSource(owner, src) {
  owner.src = src;
}

// заполняет цену

function fillPrice(owner, data) {
  var myString = owner.textContent.split(' ');
  myString[0] = data;
  myString = myString.join(' ');

  fillTextContent(owner, myString);
}

// добавляет класс DOM/fragment элементу в зависимости от количества

function renderAmount(owner, amount) {
  var myClass;

  switch (true) {
    case (amount > MAX_AMOUNT):
      myClass = 'card--in-stock';
      break;
    case (amount >= 1 && amount <= MAX_AMOUNT):
      myClass = 'card--little';
      break;
    case (amount === 0):
      myClass = 'card--soon';
      break;
    default:
      myClass = '';
      break;
  }

  owner.classList.add(myClass);
}

// добавляет класс DOM/fragment элементу + меняет текст(окончание) в зависимости от количества звезд

function renderStars(owner, data) {
  var ratingText = ' ' + declOfNum(['звезда', 'звезды', 'звезд'], data.rating.value);

  fillTextContent(owner, 'Рейтинг: ' + data.rating.value + ratingText);
  return 'stars__rating--' + STARS_LITERALS[data.rating.value - 1];
}

// проверяет содержит ли сахар и добавляет соответствующий текст

function renderIfSugar(data) {
  return ((data.nutritionFacts.sugar === true) ? 'Без сахара. ' : 'Содержит сахар. ')
  + data.nutritionFacts.energy + ' ккал';
}

// конструктор? для создания объекта с установленными методами

function BuildTemplate(Obj) {
  Object.assign(this, Obj);

  this.getTemplate = function () {
    return document.querySelector(this.template).cloneNode(true).content;
  };
  this.getNest = function () {
    this.fragment = this.getTemplate().querySelector(this.nest);
  };
  this.getDomElement = function (selector) {
    return this.fragment.querySelector(selector);
  };
}

// формирует новый fragment в документе, соответствующий карточке товара

function getCatalog(obj, data) {
  obj.getNest();

  fillTextContent(obj.getDomElement(obj.title), data.name);
  fillSource(obj.getDomElement(obj.pictureRef), PICTURE_PATH + data.picture);
  fillPrice(obj.getDomElement(obj.price).firstChild, data.price);
  renderAmount(obj.fragment, data.amount);

  if (obj.stars) {
    obj.getDomElement(obj.stars).classList.remove('stars__rating--five');
    obj.getDomElement(obj.stars).classList.add(renderStars(obj.getDomElement(obj.stars), data));
  }
  if (obj.weight) {
    fillTextContent(obj.getDomElement(obj.weight), '/ ' + data.weight + ' Г');
  }
  if (obj.starsCount) {
    fillTextContent(obj.getDomElement(obj.starsCount), data.rating.number);
  }
  if (obj.characteristics) {
    fillTextContent(obj.getDomElement(obj.characteristics), renderIfSugar(data));
  }
  if (obj.composition) {
    fillTextContent(obj.getDomElement(obj.composition), data.nutritionFacts.contents);
  }
  if (obj.count) {
    obj.getDomElement(obj.count).value = data.count;
  }

  return obj.fragment;
}

// вставляет fragment - лист заданного количества карточек в DOM дерево

function fillCards(template, data, listener) {
  var parent = document.querySelector(template.parent);
  var fragment = document.createDocumentFragment();

  delSecondChild(parent);

  data.forEach(function (elem) {
    var rendered = getCatalog(template, elem);

    if (listener) {
      rendered.addEventListener('click', listener);
    }
    fragment.appendChild(rendered);
  });

  parent.appendChild(fragment);
}

// @@@FUNC Раздел 4.1

// удаляет всех потомков DOM элемента, кроме первого

function delSecondChild(elem) {
  while (elem.children[1]) {
    elem.removeChild(elem.children[1]);
  }
}

// проверяет, есть ли переданный элемент в переданном списке --- используется для добавления товара в корзину

function isCardInList(cardName, list) {
  var flag = false;

  if (list.length !== 0) {
    list.forEach(function (elem, index) {
      if (cardName === elem.name) {
        flag = index;
      }
    });
  }

  return flag;
}

function delCartItem(indexInCart, indexInCatalog) {
  catalogCards[indexInCatalog].amount += cartCards[indexInCart].count;
  cartCards.splice(indexInCart, 1);
}

function increaseCartItem(indexInCart, indexInCatalog) {
  if (catalogCards[indexInCatalog].amount > cartCards[indexInCart].count) {
    cartCards[indexInCart].count += 1;
    catalogCards[indexInCatalog].amount -= 1;
  }
}

function decreaseCartItem(indexInCart, indexInCatalog) {
  if (cartCards[indexInCart].count > 1) {
    cartCards[indexInCart].count -= 1;
    catalogCards[indexInCatalog].amount += 1;
  } else if (cartCards[indexInCart].count === 1) {
    delCartItem(indexInCart, indexInCatalog);
  }
}

// изменяет массив, соответствующий состоянию корзины по щелчку по карточке
function formCartList(currentCard) {
  var cardClicked = currentCard.querySelector('.card__title').textContent;
  var cartIndex = isCardInList(cardClicked, cartCards);
  var catalogIndex = isCardInList(cardClicked, catalogCards);

  if (cartIndex !== false) {
    increaseCartItem(cartIndex, catalogIndex);
  } else {
    cartCards.push(Object.assign({}, catalogCards[catalogIndex], {count: 1}));
    catalogCards[catalogIndex].amount -= 1;
  }

  return cartCards;
}


function modifyCartList(currentCard, mode) {
  var cardClicked = currentCard.querySelector('.card-order__title').textContent;
  var cartIndex = isCardInList(cardClicked, cartCards);
  var catalogIndex = isCardInList(cardClicked, catalogCards);

  switch (true) {
    case (mode === 'Del'):
      delCartItem(cartIndex, catalogIndex);
      break;
    case (mode === 'Inc'):
      increaseCartItem(cartIndex, catalogIndex);
      break;
    case (mode === 'Dec'):
      decreaseCartItem(cartIndex, catalogIndex);
      break;
  }

  return cartCards;
}

// алгоритм обработчика событий по клику на карточку каталога

function onClickCatalogCard(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains(FAVORITE_BUTTON_CLASS)) {
    evt.target.classList.toggle(FAVORITE_SELECTED_CLASS);
    evt.target.blur();
  } else if (evt.target.classList.contains(ADD_TO_CART_BUTTON_CLASS)) {
    cartCards = formCartList(evt.currentTarget);

    emptyCartBottom.classList.add('visually-hidden');
    fillTextContent(emptyCartHeader, 'В корзине ' + cartCards.length + ' ' + declOfNum(['товар', 'товара', 'товаров'], cartCards.length));
    fillCards(new BuildTemplate(CART_TEMPLATE), cartCards, onClickCartCard);
    checkCart();
  }
}

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

var catalogCards = collectCards(CARDS_QTY);

// @@@INIT Раздел 3.2

fillCards(new BuildTemplate(CATALOG_TEMPLATE), catalogCards, onClickCatalogCard);

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
