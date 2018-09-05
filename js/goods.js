'use strict'

var CARD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
    'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка',
    'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа',
    'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
    'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное',
    'Острый язычок'];

function generateString(myArray, isComplex) {
  var randomIndex = 0;
  var myString = '';
  var cloneArray = myArray.slice(0);

  if (isComplex === true) {
    var tries = generateNumber(1, cloneArray.length);

    for (var i = 1; i <= tries; i++) {
      if (i === tries) {
        randomIndex = Math.round(Math.random() * (cloneArray.length - 1));
        myString += cloneArray[randomIndex] + '.';
      } else {
        randomIndex = Math.round(Math.random() * (cloneArray.length - 1));
        myString += cloneArray[randomIndex] + ', ';
        cloneArray.splice(randomIndex, 1);
      }
    }

  } else {
      randomIndex = Math.round(Math.random() * (cloneArray.length - 1));
      myString = cloneArray[randomIndex];
    }

  return myString;
}

function generateNumber(from , to, adjustRound) {
  var number =  from + Math.round(Math.random() * (to - from));

  if (!isNaN(adjustRound) || adjustRound !== undefined) {
    number += Math.round((number % adjustRound) / adjustRound) * adjustRound - (number % adjustRound);
  }
  return number;
}

var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор',
    'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит ', 'карбамид', 'вилларибо', 'виллабаджо'];

function generateRating() {
  var myObj = {};
  myObj.value = generateNumber(1, 5);
  myObj.number = generateNumber(10, 900);
  return myObj;
}

function generateNutrition(contentsList) {
  var myObj = {};

  myObj.sugar = !!Math.round(Math.random());
  myObj.energy = generateNumber(70, 500);
  myObj.contents = generateString(contentsList, true);

  return myObj;
}

function createCard(names) {
  var myObj = {};

  myObj.name = generateString(names);
  myObj.amount = generateNumber(0, 20);
  myObj.price = generateNumber(25, 300);
  myObj.weight = generateNumber(30, 120);
  myObj.rating = generateRating();
  myObj.nutrition_facts = generateNutrition(CONTENTS);

  return myObj;
}

function collectCards (quantity) {
  var cardsCollection = [];
  var cloneNames = CARD_NAME.slice(0);

  for (var i = 0; i < quantity; i++) {
    cardsCollection.push(createCard(cloneNames));
    for (var j = 0; j < cloneNames.length; j++) {
      if (cloneNames[j] === cardsCollection[i].name) {
        cloneNames.splice(j, 1);
        break
      }
    }
  }

  return cardsCollection;
}

var CARDS = collectCards(26);
