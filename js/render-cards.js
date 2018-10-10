'use strict';

(function () {
  var LOAD_CATALOG_ELEMENT = document.querySelector('.catalog__load');
  var STARS_LITERALS = ['one', 'two', 'three', 'four', 'five'];
  var PICTURE_PATH = 'img/cards/';

  var catalogTemplate = new TemplateMethods({
    parentElement: document.querySelector('.catalog__cards'),
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

  var cartTemplate = new TemplateMethods({
    parentElement: document.querySelector('.goods__cards'),
    template: '#card-order',
    nest: '.card-order',
    title: '.card-order__title',
    img: '.card-order__img',
    price: '.card-order__price',
    count: '.card-order__count'
  });


  function TemplateMethods(template) {
    Object.assign(this, template);

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


  function setCardPicture(element, cardItem) {
    element.src = PICTURE_PATH + cardItem.picture;
    element.alt = cardItem.name;
  }


  function setCardPrice(element, price) {
    var textInstances = element.textContent.split(' ').slice(1);
    textInstances.push(price);

    window.domManager.setElementText(element, textInstances.join(' '));
  }


  function setCardRating(element, rating) {
    var text = 'Рейтинг: ' +
        rating + ' ' +
        window.util.getStringEnding(['звезда', 'звезды', 'звезд'], rating);

    window.domManager.setElementText(element, text);
    return 'stars__rating--' + STARS_LITERALS[rating - 1];
  }


  function setCardSugar(isSugar) {
    return isSugar ? 'Без сахара. ' : 'Содержит сахар. ' +
        isSugar + ' ккал';
  }


  function setCardFavoriteStyle(element, cardItem) {
    element.classList.toggle('card__btn-favorite--selected', window.favorite.isFavorite(cardItem));
  }


  function getCardFragment(cardTemplate, cardItem) {
    cardTemplate.getNest();

    window.domManager.setElementText(cardTemplate.getDomElement(cardTemplate.title), cardItem.name);
    setCardPicture(cardTemplate.getDomElement(cardTemplate.img), cardItem);
    setCardPrice(cardTemplate.getDomElement(cardTemplate.price).firstChild, cardItem.price);
    window.domManager.setAmountStyle(cardTemplate.fragment, cardItem.amount);

    if (cardTemplate.stars) {
      cardTemplate.getDomElement(cardTemplate.stars).classList.remove('stars__rating--five');
      cardTemplate.getDomElement(cardTemplate.stars).classList.add(setCardRating(cardTemplate.getDomElement(cardTemplate.stars), cardItem.rating.value));
    }
    if (cardTemplate.weight) {
      window.domManager.setElementText(cardTemplate.getDomElement(cardTemplate.weight), '/ ' + cardItem.weight + ' Г');
    }
    if (cardTemplate.starsCount) {
      window.domManager.setElementText(cardTemplate.getDomElement(cardTemplate.starsCount), cardItem.rating.number);
    }
    if (cardTemplate.characteristics) {
      window.domManager.setElementText(cardTemplate.getDomElement(cardTemplate.characteristics), setCardSugar(cardItem.nutritionFacts.sugar));
    }
    if (cardTemplate.composition) {
      window.domManager.setElementText(cardTemplate.getDomElement(cardTemplate.composition), cardItem.nutritionFacts.contents);
    }
    if (cardTemplate.count) {
      cardTemplate.getDomElement(cardTemplate.count).value = cardItem.count;
    }
    if (cardTemplate.favorite) {
      setCardFavoriteStyle(cardTemplate.getDomElement(cardTemplate.favorite), cardItem);
    }

    return cardTemplate.fragment;
  }


  function toggleEmptyCatalogMessage() {
    LOAD_CATALOG_ELEMENT.classList.toggle('visually-hidden', window.backend.catalogCards.length);
  }


  window.render = {
    catalog: function () {
      toggleEmptyCatalogMessage();
      this.render(catalogTemplate, window.backend.catalogCards);
    },

    cart: function () {
      this.render(cartTemplate, window.cart.items);
    },

    filter: function () {
      this.render(catalogTemplate, window.filter.cards);
    },

    render: function (template, cardItems) {
      var parentElement = template.parentElement;

      var fragment = document.createDocumentFragment();

      window.domManager.removeDomChildren(parentElement, 2);

      cardItems.forEach(function (cardItem) {
        var card = getCardFragment(template, cardItem);

        card.addEventListener('click', window.eventManager.onCardClick);

        fragment.appendChild(card);
      });

      parentElement.appendChild(fragment);
    }
  };
})();
