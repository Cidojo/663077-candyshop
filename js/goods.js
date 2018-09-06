'use strict';

// Part 1. Generate array of card objects

// Data

var CARD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
  'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка',
  'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа',
  'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
  'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное',
  'Острый язычок'];

var PICTURE_NAMES = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg',
  'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg',
  'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg',
  'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор',
  'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит ', 'карбамид', 'вилларибо', 'виллабаджо'];

// get random number from interval

function getRandomInt(min, max, round) {
  var number = min + Math.round(Math.random() * (max - min));

  if (!isNaN(round) || round !== undefined) {
    number = Math.round((number / round)) * round;
  }

  return number;
}

// generates rating object

function getRating() {
  var myObj = {};

  myObj.value = getRandomInt(1, 5);
  myObj.number = getRandomInt(10, 900);

  return myObj;
}

// generates nutrition_facts object

function getNutrition(contentsList) {
  var myObj = {};
  var myArray = contentsList.slice(0);
  var tries = getRandomInt(1, myArray.length - 1);
  var contents = [];

  for (var i = 0; i < tries; i++) {
    var randomIndex = getRandomInt(0, myArray.length - 1);

    contents.push(myArray[randomIndex]);
    myArray.splice(randomIndex, 1);
  }

  myObj.sugar = !!Math.round(Math.random());
  myObj.energy = getRandomInt(70, 500);
  myObj.contents = contents.join(', ') + '.';

  return myObj;
}

// creates new catalog card

function createCard(name, imgLink) {
  var myObj = {};

  myObj.name = name;
  myObj.picture = 'img/cards/' + imgLink;
  myObj.amount = getRandomInt(0, 20);
  myObj.price = getRandomInt(100, 1500, 50);
  myObj.weight = getRandomInt(30, 300);
  myObj.rating = getRating();
  myObj['nutrition_facts'] = getNutrition(CONTENTS);

  return myObj;
}

// build specified amount of catalog cards

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

var cards = collectCards(26);

// Part 2. DOM tree modification

document.querySelector('.catalog__load').classList.add('visually-hidden');

var catalogCardsNest = document.querySelector('.catalog__cards');
catalogCardsNest.classList.remove('catalog__cards--load');

// fill textContent property of an owner

function fillTextContent(owner, text) {
  owner.textContent = text;
}

// fill picture link

function fillPictureSource(owner, src) {
  owner.src = src;
}

// add special class in depend on amount

function renderAmount(amount) {
  var myClass = '';

  if (amount > 5) {
    myClass = 'card--in-stock';
  } else if (amount >= 1 && amount <= 5) {
    myClass = 'card--little';
  } else if (amount === 0) {
    myClass = 'card--soon';
  }

  return myClass;
}

// add class and change text in depend on stars raiting

function renderStars(owner, data) {
  var rating = '';
  var ratingText = ' звезды';

  switch (data.rating.value) {
    case 1:
      rating = 'one';
      ratingText = ' звезда';
      break;
    case 2:
      rating = 'two';
      break;
    case 3:
      rating = 'three';
      break;
    case 4:
      rating = 'four';
      break;
    case 5:
      rating = 'five';
      ratingText = ' звезд';
      break;
  }

  fillTextContent(owner, 'Рейтинг: ' + data.rating.value + ratingText);
  return 'stars__rating--' + rating;
}

// change text in depend on sugar

function renderIfSugar(data) {
  var ifSugar = (data.nutrition_facts.sugar === true) ?
    'Без сахара. ' + data.nutrition_facts.energy + ' ккал'
    :
    'Содержит сахар. ' + data.nutrition_facts.energy + ' ккал';

  return ifSugar;
}

// create single card

function createCatalogCard(data) {
  var cardTemplate = document.querySelector('#card').cloneNode(true).content;
  var card = cardTemplate.querySelector('.catalog__card');
  var cardTitle = card.querySelector('.card__title');
  var cardPictureSource = card.querySelector('.card__img');
  var cardPrice = card.querySelector('.card__price').firstChild;
  var cardWeight = card.querySelector('.card__weight');
  var cardStars = card.querySelector('.stars__rating');
  var cardStarsCount = card.querySelector('.star__count');
  var cardCharacteristics = card.querySelector('.card__characteristic');
  var cardComposition = card.querySelector('.card__composition-list');

  card.classList.add(renderAmount(data.amount));
  cardStars.classList.remove('stars__rating--five');
  cardStars.classList.add(renderStars(cardStars, data));
  fillTextContent(cardTitle, data.name);
  fillPictureSource(cardPictureSource, data.picture);
  fillTextContent(cardPrice, data.price);
  fillTextContent(cardWeight, '/ ' + data.weight + ' Г');
  fillTextContent(cardStarsCount, data.rating.number);
  fillTextContent(cardCharacteristics, renderIfSugar(data));
  fillTextContent(cardComposition, data.nutrition_facts.contents);

  return card;
}

// modify DOM tree

function fillCards(data, nest) {
  var fragment = document.createDocumentFragment();
  var cardsNest = nest;

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createCatalogCard(data[i]));
  }

  cardsNest.appendChild(fragment);
}

fillCards(cards, catalogCardsNest);


// Part 3. Generate cart products
document.querySelector('.goods__card-empty').classList.add('visually-hidden');

var cartCards = collectCards(3);
var cartCardsNest = document.querySelector('.goods__cards');
cartCardsNest.classList.remove('goods__cards--empty');

function createCartCard(data) {
  var cardTemplate = document.querySelector('#card-order').cloneNode(true).content;
  var card = cardTemplate.querySelector('.card-order');
  var cardTitle = card.querySelector('.card-order__title');
  var cardPictureSource = card.querySelector('.card-order__img');
  var cardPrice = card.querySelector('.card-order__price').firstChild;
  var cardQuantity = card.querySelector('.card-order__count');

  fillTextContent(cardTitle, data.name);
  fillPictureSource(cardPictureSource, data.picture);
  cardQuantity.value = getRandomInt(1, data.amount);
  fillTextContent(cardPrice, data.price * cardQuantity.value + ' ₽');

  return card;
}

function fillCartCards(data, nest) {
  var fragment = document.createDocumentFragment();
  var cardsNest = nest;

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createCartCard(data[i]));
  }

  cardsNest.appendChild(fragment);
}

fillCartCards(cartCards, cartCardsNest);
