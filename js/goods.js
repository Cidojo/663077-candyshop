'use strict';

// -------------------------------------------------
// PART 1. Generate an array of card objects
// -------------------------------------------------

// DATA

var CARDS_AMOUNT = 26;

var CARD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
  'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка',
  'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа',
  'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
  'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное',
  'Острый язычок'];

var PICTURE_NAMES = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'];

var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор',
  'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит ', 'карбамид', 'вилларибо', 'виллабаджо'];

var RATING = {
  value: [1, 5],
  number: [10, 900]
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

var STARS_LITERAL = ['one', 'two', 'three', 'four', 'five'];

// METHODS.1

// get random number from interval

function getRandomInt(min, max, round) {
  round = round || 1;
  return Math.round(((min + Math.round(Math.random() * (max - min))) / round)) * round;
}

// generate rating object

function getRating(rating) {
  return {
    value: getRandomInt(rating.value[0], rating.value[1]),
    number: getRandomInt(rating.number[0], rating.number[1])
  };
}

// generate nutritioFacts object

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

// PRECEDING RESULT: create new catalog card

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

// RESULTto generate certain number of catalog cards

function collectCards(quantity) {
  var cardsCollection = [];
  var cloneNames = CARD_NAME.slice(0);
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

// PART 1 CALLBACK

var cards = collectCards(CARDS_AMOUNT);

// -------------------------------------------------
// PART 2. OPERATIONS WITH DOM: generate DOM elements and modify DOM tree
// -------------------------------------------------

// DATA

var catalog = document.querySelector('.catalog__cards');

// NODES

document.querySelector('.catalog__load').classList.add('visually-hidden');
catalog.classList.remove('catalog__cards--load');

// METHODS.2

// fill textContent property of an owner

function fillTextContent(owner, text) {
  owner.textContent = text;
}

// fill source link

function fillSource(owner, src) {
  owner.src = src;
}

// add special class in depend on amount

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

function fillPrice(owner, data) {
  fillTextContent(owner, '' + data + owner.textContent.substr(owner.textContent.indexOf(' ')));
}

// add class and change text in depend on stars raiting

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
  return 'stars__rating--' + STARS_LITERAL[data.rating.value - 1];
}

// change text in depend on sugar

function renderIfSugar(data) {
  return ((data.nutritionFacts.sugar === true) ? 'Без сахара. ' : 'Содержит сахар. ')
  + data.nutritionFacts.energy + ' ккал';
}

// create single card

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

// generate new HTML fragment in DOM

function generateFragment(obj, data) {
  obj.getNest();

  fillAmount(obj.fragment, data.amount);
  fillTextContent(obj.getDomElement(obj.title), data.name);
  fillSource(obj.getDomElement(obj.pictureRef), data.picture);
  fillPrice(obj.getDomElement(obj.price).firstChild, data.price);

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

  return obj.fragment;
}

// RESULT.2to create new CARDS in DOM tree

function fillCards(template, data, parent) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {

    fragment.appendChild(generateFragment(template, data[i]));
  }

  parent.appendChild(fragment);
}

// PART 2 CALLBACK

fillCards(new BuildTemplate(CATALOG_TEMPLATE), cards, catalog);

// -------------------------------------------------
// Part 3. Generate cart products
// -------------------------------------------------

// DATA
var CART_AMOUNT = 3;
var cart = document.querySelector('.goods__cards');
var cartCards = collectCards(CART_AMOUNT);

// NODES

document.querySelector('.goods__card-empty').classList.add('visually-hidden');
cart.classList.remove('goods__cards--empty');

// PART 3 CALLBACK

fillCards(new BuildTemplate(CART_TEMPLATE), cartCards, cart);
