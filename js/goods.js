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
var cartList = [];

var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
var FAVORITE_SELECTED_CLASS = FAVORITE_BUTTON_CLASS + '--selected';
var ADD_TO_CART_BUTTON_CLASS = 'card__btn';

var DELETE_FROM_CART_BUTTON = 'card-order__close';
var CART_INCREASE_BUTTON = 'card-order__btn--increase';
var CART_DECREASE_BUTTON = 'card-order__btn--decrease';


var deliverStoreBtnId = 'deliver__store';
var deliverCourierBtnId = 'deliver__courier';
// -------------------------------------------------
// 2. NODES - НОДЫ
// -------------------------------------------------

var emptyCartHeader = document.querySelector('.main-header__basket');
var emptyCartBottom = document.querySelector('.goods__card-empty');
var deliverStoreBlock = document.querySelector('.deliver__store');
var deliverStoreBtn = document.querySelector('#deliver__store');
var deliverCourierBlock = document.querySelector('.deliver__courier');
var deliverCourierBtn = document.querySelector('#deliver__courier');
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

function delCartItem(list, index) {
  list.splice(index, 1);
}

function increaseCartItem(list, index) {
  if (list[index].amount > list[index].count) {
    list[index].count += 1;
    list[index].amount -= 1;
  }
}

function decreaseCartItem(list, index) {
  if (list[index].count > 1) {
    list[index].count -= 1;
    list[index].amount += 1;
  }
}

// изменяет массив, соответствующий состоянию корзины по щелчку по карточке
function formCartList(currentCard, list) {
  var cardClicked = currentCard.querySelector('.card__title').textContent;
  var isInCart = isCardInList(cardClicked, list);


  if (isInCart !== false) {
    increaseCartItem(list, isInCart);
  } else {
    var newCartItemIndex = isCardInList(cardClicked, cards);

    list.push(Object.assign({}, cards[newCartItemIndex], {count: 1}));
  }

  return list;
}


function modifyCartList(currentCard, list, mode) {
  var cardClicked = currentCard.querySelector('.card-order__title').textContent;
  var isInCart = isCardInList(cardClicked, list);
  switch (true) {
    case (mode === 'Del'):
      delCartItem(list, isInCart);
      break;
    case (mode === 'Inc'):
      increaseCartItem(list, isInCart);
      break;
    case (mode === 'Dec'):
      decreaseCartItem(list, isInCart);
      break;
  }

  return list;
}

// алгоритм обработчика событий по клику на карточку каталога

function onClickCatalogCard(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains(FAVORITE_BUTTON_CLASS)) {
    evt.target.classList.toggle(FAVORITE_SELECTED_CLASS);
  } else if (evt.target.classList.contains(ADD_TO_CART_BUTTON_CLASS)) {
    cartList = formCartList(evt.currentTarget, cartList);
    emptyCartBottom.classList.add('visually-hidden');
    fillTextContent(emptyCartHeader, 'В корзине ' + cartList.length + ' ' + declOfNum(['товар', 'товара', 'товаров'], cartList.length));
    fillCards(new BuildTemplate(CART_TEMPLATE), cartList, onClickCartCard);
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

  cartList = modifyCartList(evt.currentTarget, cartList, mode);
  if (cartList.length === 0) {
    emptyCartBottom.classList.remove('visually-hidden');
    fillTextContent(emptyCartHeader, 'В корзине ничего нет');
  }

  fillCards(new BuildTemplate(CART_TEMPLATE), cartList, onClickCartCard);
  fillTextContent(emptyCartHeader, 'В корзине ' + cartList.length + ' ' + declOfNum(['товар', 'товара', 'товаров'], cartList.length));
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

  var myListHide = toBeShown.querySelectorAll('label');
  for (var i = 0; i < myListHide.length; i++) {
    myListHide[i].previousElementSibling.setAttribute('disabled', true);
  }

  var myListShow = toBeHidden.querySelectorAll('label');

  for (var j = 0; j < myListShow.length; j++) {
    myListShow[j].previousElementSibling.removeAttribute('disabled');
  }
}

// -------------------------------------------------
// 4. EVT - ОБРАБОТЧИКИ СОБЫТИЙ
// -------------------------------------------------

deliverStoreBtn.addEventListener('click', onClickDelivery);

deliverCourierBtn.addEventListener('click', onClickDelivery);

// -------------------------------------------------
// 5. INIT - ИСПОЛНЕНИЕ
// -------------------------------------------------

// @@@INIT Раздел 3.1

var cards = collectCards(CARDS_QTY);

// @@@INIT Раздел 3.2

fillCards(new BuildTemplate(CATALOG_TEMPLATE), cards, onClickCatalogCard);

// @@@INIT Раздел 3.3
// var cartCards = collectCards(CART_QTY);
//
// fillCart(new BuildTemplate(CART_TEMPLATE), cartCards, cart);
