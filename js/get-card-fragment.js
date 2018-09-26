'use strict';

(function () {
  var MAX_AMOUNT = 5;

  var STARS_LITERALS = ['one', 'two', 'three', 'four', 'five'];

  var PICTURE_PATH = 'img/cards/';

  // заполняет свойство src значением из соответствующего свойства переданного объекта (карточки)


  function fillSource(owner, src) {
    owner.src = src;
  }

  // заполняет цену

  function fillPrice(owner, data) {
    var myString = owner.textContent.split(' ');
    myString[0] = data;
    myString = myString.join(' ');

    window.fillTextContent(owner, myString);
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
    var ratingText = ' ' + window.getStringEnding(['звезда', 'звезды', 'звезд'], data.rating.value);

    window.fillTextContent(owner, 'Рейтинг: ' + data.rating.value + ratingText);
    return 'stars__rating--' + STARS_LITERALS[data.rating.value - 1];
  }

  // проверяет содержит ли сахар и добавляет соответствующий текст

  function renderIfSugar(data) {
    return ((data.nutritionFacts.sugar === true) ? 'Без сахара. ' : 'Содержит сахар. ')
    + data.nutritionFacts.energy + ' ккал';
  }

  window.getCardFragment = function (obj, data) {
    obj.getNest();

    window.fillTextContent(obj.getDomElement(obj.title), data.name);
    fillSource(obj.getDomElement(obj.pictureRef), PICTURE_PATH + data.picture);
    fillPrice(obj.getDomElement(obj.price).firstChild, data.price);
    renderAmount(obj.fragment, data.amount);

    if (obj.stars) {
      obj.getDomElement(obj.stars).classList.remove('stars__rating--five');
      obj.getDomElement(obj.stars).classList.add(renderStars(obj.getDomElement(obj.stars), data));
    }
    if (obj.weight) {
      window.fillTextContent(obj.getDomElement(obj.weight), '/ ' + data.weight + ' Г');
    }
    if (obj.starsCount) {
      window.fillTextContent(obj.getDomElement(obj.starsCount), data.rating.number);
    }
    if (obj.characteristics) {
      window.fillTextContent(obj.getDomElement(obj.characteristics), renderIfSugar(data));
    }
    if (obj.composition) {
      window.fillTextContent(obj.getDomElement(obj.composition), data.nutritionFacts.contents);
    }
    if (obj.count) {
      obj.getDomElement(obj.count).value = data.count;
    }

    return obj.fragment;
  };
})();
