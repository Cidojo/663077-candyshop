'use strict';

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

function generateNumber(from, to, adjustRound) {
  var number = from + Math.round(Math.random() * (to - from));

  if (!isNaN(adjustRound) || adjustRound !== undefined) {
    number += Math.round((number % adjustRound) / adjustRound) * adjustRound - (number % adjustRound);
  }

  return number;
}

function generateRating() {
  var myObj = {};

  myObj.value = generateNumber(1, 5);
  myObj.number = generateNumber(10, 900);

  return myObj;
}

function generateNutrition(contentsList) {
  var myObj = {};
  var myArray = contentsList.slice(0);
  var tries = generateNumber(1, myArray.length - 1);
  var contents = [];

  for (var i = 0; i < tries; i++) {
    var randomIndex = generateNumber(0, myArray.length - 1);

    contents.push(myArray[randomIndex]);
    myArray.splice(randomIndex, 1);
  }

  myObj.sugar = !!Math.round(Math.random());
  myObj.energy = generateNumber(70, 500);
  myObj.contents = contents.join(', ') + '.';

  return myObj;
}

function createCard(name, imgLink) {
  var myObj = {};

  myObj.name = name;
  myObj.picture = 'img/cards/' + imgLink;
  myObj.amount = generateNumber(0, 20);
  myObj.price = generateNumber(100, 1500, 50);
  myObj.weight = generateNumber(30, 300);
  myObj.rating = generateRating();
  myObj['nutrition_facts'] = generateNutrition(CONTENTS);

  return myObj;
}

function collectCards(quantity) {
  var cardsCollection = [];
  var cloneNames = CARD_NAME.slice(0);
  var clonePictureNames = PICTURE_NAMES.slice(0);

  for (var i = 0; i < quantity; i++) {
    var nameIndex = generateNumber(0, cloneNames.length - 1);
    var pictureNamesIndex = generateNumber(0, clonePictureNames.length - 1);

    cardsCollection.push(createCard(cloneNames[nameIndex], clonePictureNames[pictureNamesIndex]));
    cloneNames.splice(nameIndex, 1);
    clonePictureNames.splice(pictureNamesIndex, 1);
  }

  return cardsCollection;
}

var cards = collectCards(26);
//
// for (var i = 0; i < CARDS.length; i++) {
// console.log(CARDS[i].picture)
// }

document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var catalogNest = document.querySelector('.catalog__cards-wrap');

for (var i = 0; i < cards.length; i++) {
  var newCard = cardTemplate.cloneNode(true);

  if (cards[i].amount > 5) {
    newCard.classList.add('card--in-stock');
  } else if (cards[i].amount >= 1 && cards[i].amount <= 5) {
    newCard.classList.add('card--little');
  } else if (cards[i].amount === 0) {
    newCard.classList.add('card--soon');
  }

  newCard.querySelector('.card__title').textContent = cards[i].name;
  newCard.querySelector('.card__img').src = cards[i].picture;
  newCard.querySelector('.card__price').firstChild.textContent = cards[i].price + ' ';
  newCard.querySelector('.card__weight').textContent = '/ ' + cards[i].weight + ' Г';
  newCard.querySelector('.star__count').textContent = cards[i].rating.number;

  if (cards[i].nutrition_facts.sugar === true) {
    newCard.querySelector('.card__characteristic').textContent = 'Без сахара. ' + cards[i].nutrition_facts.energy + ' ккал';
  } else {
    newCard.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + cards[i].nutrition_facts.energy + ' ккал';
  }
  newCard.querySelector('.card__composition-list').textContent = cards[i].nutrition_facts.contents;

  catalogNest.appendChild(newCard);
}
