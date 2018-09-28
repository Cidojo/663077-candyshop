'use strict';

(function () {
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

  // возвращает объект raiting объекта - карточки товара

  function getRating(rating) {
    return {
      value: window.getRandomInt(rating.values[0], rating.values[1]),
      number: window.getRandomInt(rating.numbers[0], rating.numbers[1])
    };
  }

  // возвращает объект nutritionFacts объекта - карточки товара

  function getNutrition(contentsInitial) {
    var contentsCustom = contentsInitial.slice(0);
    var tries = window.getRandomInt(1, contentsCustom.length - 1);

    for (var i = 0; i < tries; i++) {
      contentsCustom.splice(window.getRandomInt(0, contentsCustom.length - 1), 1);
    }

    return {
      sugar: !!Math.round(Math.random()),
      energy: window.getRandomInt(ENERGY.min, ENERGY.max),
      contents: contentsCustom.join(', ') + '.'
    };
  }

  //  возвращает объект - карточку товара из каталога

  window.createCard = function (name, imgLink) {
    return {
      name: name,
      picture: imgLink,
      amount: window.getRandomInt(AMOUNT.min, AMOUNT.max),
      price: window.getRandomInt(PRICE.min, PRICE.max, PRICE.round),
      weight: window.getRandomInt(WEIGHT.min, WEIGHT.max),
      rating: getRating(RATING),
      nutritionFacts: getNutrition(CONTENTS)
    };
  };
})();
