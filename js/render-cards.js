'use strict';

(function () {
  var catalogTemplate = new BuildTemplate({
    parent: document.querySelector('.catalog__cards'),
    template: '#card',
    nest: '.catalog__card',
    title: '.card__title',
    img: '.card__img',
    price: '.card__price',
    weight: '.card__weight',
    stars: '.stars__rating',
    starsCount: '.star__count',
    characteristics: '.card__characteristic',
    composition: '.card__composition-list',
    favorite: '.card__btn-favorite'
  });

  var cartTemplate = new BuildTemplate({
    parent: document.querySelector('.goods__cards'),
    template: '#card-order',
    nest: '.card-order',
    title: '.card-order__title',
    img: '.card-order__img',
    price: '.card-order__price',
    count: '.card-order__count'
  });

  var CATALOG_LOAD_BLOCK = document.querySelector('.catalog__load');

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

    window.domManager.fillTextContent(owner, myString);
  }

  // добавляет класс DOM/fragment элементу + меняет текст(окончание) в зависимости от количества звезд

  function fillStars(owner, data) {
    var ratingText = 'Рейтинг: ' +
        data.rating.value + ' ' +
        window.util.getStringEnding(['звезда', 'звезды', 'звезд'], data.rating.value);

    window.domManager.fillTextContent(owner, ratingText);
    return 'stars__rating--' + STARS_LITERALS[data.rating.value - 1];
  }

  // проверяет содержит ли сахар и добавляет соответствующий текст

  function fillSugar(data) {
    return data.nutritionFacts.sugar ? 'Без сахара. ' : 'Содержит сахар. ' +
        data.nutritionFacts.energy + ' ккал';
  }

  function favoriteStyle(owner, data) {
    owner.classList.toggle('card__btn-favorite--selected', window.favorite.isFavorite(data));
  }

  function getCardFragment(obj, data) {
    obj.getNest();

    window.domManager.fillTextContent(obj.getDomElement(obj.title), data.name);
    fillPicture(obj.getDomElement(obj.img), data);
    fillPrice(obj.getDomElement(obj.price).firstChild, data.price);
    window.domManager.setAmountStyle(obj.fragment, data.amount);

    if (obj.stars) {
      obj.getDomElement(obj.stars).classList.remove('stars__rating--five');
      obj.getDomElement(obj.stars).classList.add(fillStars(obj.getDomElement(obj.stars), data));
    }
    if (obj.weight) {
      window.domManager.fillTextContent(obj.getDomElement(obj.weight), '/ ' + data.weight + ' Г');
    }
    if (obj.starsCount) {
      window.domManager.fillTextContent(obj.getDomElement(obj.starsCount), data.rating.number);
    }
    if (obj.characteristics) {
      window.domManager.fillTextContent(obj.getDomElement(obj.characteristics), fillSugar(data));
    }
    if (obj.composition) {
      window.domManager.fillTextContent(obj.getDomElement(obj.composition), data.nutritionFacts.contents);
    }
    if (obj.count) {
      obj.getDomElement(obj.count).value = data.count;
    }
    if (obj.favorite) {
      favoriteStyle(obj.getDomElement(obj.favorite), data);
    }

    return obj.fragment;
  }

  function toggleEmptyCatalogMessage() {
    CATALOG_LOAD_BLOCK.classList.toggle('visually-hidden', window.catalogCards.length);
  }

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

  window.renderCards = {
    renderCatalog: function () {
      toggleEmptyCatalogMessage();
      this.renderCards(catalogTemplate, window.catalogCards);
    },

    renderCart: function () {
      this.renderCards(cartTemplate, window.cart.items);
    },

    renderFilter: function () {
      this.renderCards(catalogTemplate, window.filteredCards);
    },

    renderCards: function (template, data) {
      var parent = template.parent;

      var fragment = document.createDocumentFragment();

      window.domManager.removeDomChild(parent, 2);

      data.forEach(function (elem) {
        var card = getCardFragment(template, elem);

        card.addEventListener('click', window.eventManager.onCardClick);

        fragment.appendChild(card);
      });

      parent.appendChild(fragment);
    }
  };
})();
