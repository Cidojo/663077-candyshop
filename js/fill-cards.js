'use strict';

(function () {

  var catalogTemplate = new BuildTemplate({
    parent: document.querySelector('.catalog__cards'),
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
  });

  var cartTemplate = new BuildTemplate({
    parent: document.querySelector('.goods__cards'),
    template: '#card-order',
    nest: '.card-order',
    title: '.card-order__title',
    pictureRef: '.card-order__img',
    price: '.card-order__price',
    count: '.card-order__count'
  });

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

  function fillCards(template, data, listener) {
    var parent = template.parent;
    var fragment = document.createDocumentFragment();

    window.removeDomChild(parent, 2);

    data.forEach(function (elem) {
      var card = window.getCardFragment(template, elem);

      if (listener) {
        card.addEventListener('click', listener);
      }
      fragment.appendChild(card);
    });

    parent.appendChild(fragment);
  }

  window.fillCards = {
    renderCatalogCards: function () {
      if (!window.catalogCards.length) {
        document.querySelector('.catalog__load').classList.remove('visually-hidden');
        window.removeDomChild(catalogTemplate.parent, 2);
        window.removeDomChild(cartTemplate.parent, 2);
        window.cartCards = [];
        window.checkCart();
      } else {
        document.querySelector('.catalog__load').classList.add('visually-hidden');
        fillCards(catalogTemplate, window.catalogCards, window.onCatalogCardClick);
      }
    },
    renderCartCards: function () {
      fillCards(cartTemplate, window.cartCards, window.onCartCardClick);
    }
  };

  window.fillCards.renderCatalogCards();
})();
