'use strict';

// -------------------------------------------------
// 1. DATA - ИСХОДНЫЕ ДАННЫЕ
// -------------------------------------------------

// @@@DATA Раздел 3.1

var CARDS_AMOUNT = 25;

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
  template: '#card-order',
  nest: '.card-order',
  title: '.card-order__title',
  pictureRef: '.card-order__img',
  price: '.card-order__price'
};

// @@@DATA Раздел 3.3

var CART_AMOUNT = 3;

// @@@DATA Раздел 4.1

var FAVORITE_BUTTON_CLASS = 'card__btn-favorite';
var FAVORITE_SELECTED_CLASS = FAVORITE_BUTTON_CLASS + '--selected';
var ADD_TO_CART_BUTTON_CLASS = 'card__btn';

// -------------------------------------------------
// 2. NODES - НОДЫ
// -------------------------------------------------

// @@@NODES Раздел 3.2

var catalog = document.querySelector('.catalog__cards');

// @@@NODES Раздел 3.3

var cart = document.querySelector('.goods__cards');

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

// заполняет свойство textContent у DOM/fragment элемента

function fillTextContent(owner, text) {
  owner.textContent = text;
}

// заполняет свойтво src у DOM/fragment элемента

function fillSource(owner, src) {
  owner.src = src;
}

// добавляет класс DOM/fragment элементу в зависимости от количества

function fillAmount(owner, amount) {
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
  var ratingText;

  switch (true) {
    case (data.rating.value % 10 === 1):
      ratingText = ' звезда';
      break;
    case (data.rating.value % 10 === 2 || data.rating.value % 10 === 3 || data.rating.value % 10 === 4):
      ratingText = ' звезды';
      break;
    default:
      ratingText = ' звезд';
      break;
  }

  fillTextContent(owner, 'Рейтинг: ' + data.rating.value + ratingText);
  return 'stars__rating--' + STARS_LITERALS[data.rating.value - 1];
}

// заполняет свойтво textContent DOM/fragment элемента в зависимости флага isSugar

function renderIfSugar(data) {
  return ((data.nutritionFacts.sugar === true) ? 'Без сахара. ' : 'Содержит сахар. ')
  + data.nutritionFacts.energy + ' ккал';
}

// шаблон для создания объекта с предустановленными методами

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

function getCatalogCard(obj, data) {
  obj.getNest();
  obj.getDomElement(obj.stars).classList.remove('stars__rating--five');
  obj.getDomElement(obj.stars).classList.add(renderStars(obj.getDomElement(obj.stars), data));

  fillTextContent(obj.getDomElement(obj.title), data.name);
  fillSource(obj.getDomElement(obj.pictureRef), PICTURE_PATH + data.picture);
  fillTextContent(obj.getDomElement(obj.price).firstChild, data.price + ' ');

  fillTextContent(obj.getDomElement(obj.weight), '/ ' + data.weight + ' Г');
  fillTextContent(obj.getDomElement(obj.starsCount), data.rating.number);
  fillTextContent(obj.getDomElement(obj.characteristics), renderIfSugar(data));
  fillTextContent(obj.getDomElement(obj.composition), data.nutritionFacts.contents);

  return obj.fragment;
}

// вставляет fragment - агрегатор заданного количества карточек в catalog

function fillCards(template, data, parent) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var rendered = getCatalogCard(template, data[i]);

    rendered.addEventListener('click', onClickCheckEvent);
    fragment.appendChild(rendered);
  }

  parent.appendChild(fragment);
}

// @@@FUNC Раздел 3.3

// формирует новый fragment в документе, соответствующий карточке товара в корзине

function getCartCard(obj, data) {
  obj.getNest();

  fillAmount(obj.fragment, data.amount);
  fillTextContent(obj.getDomElement(obj.title), data.name);
  fillSource(obj.getDomElement(obj.pictureRef), data.picture);
  fillPrice(obj.getDomElement(obj.price).firstChild, data.price);

  return obj.fragment;
}

// вставляет fragment - карточеку в корзину

function fillCarts(template, data, parent) {
  var fragment = document.createDocumentFragment();
  var rendered = getCartCard(template, data);

  fragment.appendChild(rendered);
  parent.appendChild(fragment);
}

// @@@FUNC 4.1

function getCardData(card, data) {
  var cardName = card.querySelector('.card__title').textContent;
  for (var i = 0; i < data.length; i++) {
    if (cardName === data[i].name) {
      return data[i];
    }
  }
  return data[i];
}

// @@@FUNC Раздел 4.1

function onClickCheckEvent(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains(FAVORITE_BUTTON_CLASS)) {
    evt.target.classList.toggle(FAVORITE_SELECTED_CLASS);
  } else if (evt.target.classList.contains(ADD_TO_CART_BUTTON_CLASS)) {
    fillCarts(new BuildTemplate(CART_TEMPLATE), getCardData(evt.currentTarget, cards), cart);
  }
}

// -------------------------------------------------
// 4. EVT - ОБРАБОТЧИКИ СОБЫТИЙ
// -------------------------------------------------

// -------------------------------------------------
// 5. INIT - ИСПОЛНЕНИЕ
// -------------------------------------------------

// @@@INIT Раздел 3.1

var cards = collectCards(CARDS_AMOUNT);

// @@@INIT Раздел 3.2

fillCards(new BuildTemplate(CATALOG_TEMPLATE), cards, catalog);

// @@@INIT Раздел 3.3

// var cartCards = collectCards(1);

// fillCards(new BuildTemplate(CART_TEMPLATE), cartCards, cart);
