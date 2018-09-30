'use strict';

(function () {
  var MAX_AMOUNT = 5;

  var STARS_LITERALS = ['one', 'two', 'three', 'four', 'five'];

  var PICTURE_PATH = 'img/cards/';

  // заполняет свойство src значением из соответствующего свойства переданного объекта (карточки)


  function fillPicture(owner, card) {
    owner.src = PICTURE_PATH + card.picture;
    owner.alt = card.name;
  }

  // заполняет цену

  function fillPrice(owner, data) {
    var myString = owner.textContent.split(' ');
    myString[0] = data;
    myString = myString.join(' ');

    window.fillTextContent(owner, myString);
  }

  // добавляет класс DOM/fragment элементу в зависимости от количества

  function fillAmount(owner, amount) {
    if (amount > MAX_AMOUNT) {
      return;
    }

    owner.classList.remove('card--in-stock');

    owner.classList.add(amount ? 'card--little' : 'card--soon');
  }

  // добавляет класс DOM/fragment элементу + меняет текст(окончание) в зависимости от количества звезд

  function fillStars(owner, data) {
    var ratingText = 'Рейтинг: ' +
        data.rating.value + ' ' +
        window.getStringEnding(['звезда', 'звезды', 'звезд'], data.rating.value);

    window.fillTextContent(owner, ratingText);
    return 'stars__rating--' + STARS_LITERALS[data.rating.value - 1];
  }

  // проверяет содержит ли сахар и добавляет соответствующий текст

  function fillSugar(data) {
    return data.nutritionFacts.sugar ? 'Без сахара. ' : 'Содержит сахар. ' +
        data.nutritionFacts.energy + ' ккал';
  }

  window.getCardFragment = function (obj, data) {
    obj.getNest();

    window.fillTextContent(obj.getDomElement(obj.title), data.name);
    fillPicture(obj.getDomElement(obj.img), data);
    fillPrice(obj.getDomElement(obj.price).firstChild, data.price);
    fillAmount(obj.fragment, data.amount);

    if (obj.stars) {
      obj.getDomElement(obj.stars).classList.remove('stars__rating--five');
      obj.getDomElement(obj.stars).classList.add(fillStars(obj.getDomElement(obj.stars), data));
    }
    if (obj.weight) {
      window.fillTextContent(obj.getDomElement(obj.weight), '/ ' + data.weight + ' Г');
    }
    if (obj.starsCount) {
      window.fillTextContent(obj.getDomElement(obj.starsCount), data.rating.number);
    }
    if (obj.characteristics) {
      window.fillTextContent(obj.getDomElement(obj.characteristics), fillSugar(data));
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
