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
    composition: '.card__composition-list'
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

  function clearEmptyCatalogMessage() {
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
    renderCatalogCards: function () {
      clearEmptyCatalogMessage();
      this.renderCards(catalogTemplate, window.catalogCards);
    },

    renderCartCards: function () {
      this.renderCards(cartTemplate, window.cartCards.cartCards);
    },

    renderFilteredCatalog: function () {
      this.renderCards(catalogTemplate, window.filteredCatalog);
    },

    renderCards: function (template, data) {
      var listener = window.eventManager.onCatalogCardClick;

      if (template === cartTemplate) {
        listener = window.eventManager.onCartCardClick;
      }

      var parent = template.parent;
      var fragment = document.createDocumentFragment();

      window.domManager.removeDomChild(parent, 2);

      data.forEach(function (elem) {
        var card = window.getCardFragment(template, elem);

        if (listener) {
          card.addEventListener('click', listener);
        }
        fragment.appendChild(card);
      });

      parent.appendChild(fragment);
    }
  };
})();
