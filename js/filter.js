'use strict';

(function () {
  var TYPE_CRITERIES = ['Мороженое', 'Газировка', 'Жевательная резинка', 'Мармелад', 'Зефир'];
  var CONTENT_CRITERIES = ['sugar', 'vegetarian', 'gluten'];
  var SORTER_CRITERIES = ['number', 'price', 'priceReverse', 'value'];
  var catalogSidebar = document.querySelector('.catalog__sidebar');

  var types = {
    handlerElements: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(1) input'),
    quantityElements: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(1) input ~ span'),
    criteries: TYPE_CRITERIES,

    filter: function (filteredCards, matrix) {
      var newFilteredCards = [];

      matrix.forEach(function (it) {
        if (it !== -1) {
          newFilteredCards = newFilteredCards.concat(types.filterSingle(filteredCards, it))
            .filter(function (element, position, self) {
              return self.indexOf(element) === position;
            });
        }
      });

      return newFilteredCards;
    },

    filterSingle: function (_filteredCards, criteria) {
      return _filteredCards.filter(function (_it) {
        return _it.kind === criteria;
      });
    }
  };


  var contents = {
    handlerElements: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(2) input'),
    quantityElements: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(2) input ~ span'),
    criteries: CONTENT_CRITERIES,

    filter: function (filteredCards, matrix) {

      matrix.forEach(function (it) {
        if (it !== -1) {
          filteredCards = contents.filterSingle(filteredCards, it)
            .filter(function (element, position, self) {
              return self.indexOf(element) === position;
            });
        }
      });

      return filteredCards;
    },

    filterSingle: function (_filteredCards, criteria) {
      return _filteredCards.filter(function (_it) {
        return (_it.nutritionFacts[criteria] === false && criteria === CONTENT_CRITERIES[0]) || (_it.nutritionFacts[criteria] === true && criteria === CONTENT_CRITERIES[1]) || (_it.nutritionFacts[criteria] === false && criteria === CONTENT_CRITERIES[2]);
      });
    }
  };


  var prices = {
    handlerElements: [catalogSidebar.querySelector('.range__btn--left'), catalogSidebar.querySelector('.range__btn--right')],
    quantityElement: catalogSidebar.querySelector('.range__price-count .range__count'),
    criteries: [catalogSidebar.querySelector('.range__price--min'), catalogSidebar.querySelector('.range__price--max')],

    filter: function (filteredCards, matrix) {

      matrix.forEach(function (it) {
        filteredCards = prices.filterSingle(filteredCards, it)
          .filter(function (element, position, self) {
            return self.indexOf(element) === position;
          });
      });

      return filteredCards;
    },
    filterSingle: function (_filteredCards, criteria) {
      return _filteredCards.filter(function (_it) {
        return _it.price >= criteria.textContent && criteria.classList.contains('range__price--min') ||
          _it.price <= criteria.textContent && criteria.classList.contains('range__price--max');
      });
    },
    setQuantity: function () {
      var quantity = '(' + this.filter(window.filter.cards, this.criteries).length + ')';
      window.domManager.setElementText(this.quantityElement, quantity);
    }
  };


  var inStock = {
    handlerElement: catalogSidebar.querySelector('#filter-availability'),
    quantityElement: catalogSidebar.querySelector('#filter-availability ~ span'),

    filter: function (filteredCards) {
      return filteredCards.filter(function (card) {
        return card.amount > 0;
      });
    },
    setQuantity: function () {
      window.domManager.setElementText(this.quantityElement, '(' + this.filter(window.backend.catalogCards).length + ')');
    }
  };


  var sorter = {
    handlerElements: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(4) input'),
    criteries: SORTER_CRITERIES
  };


  var showAll = catalogSidebar.querySelector('button.catalog__submit');


  function getActiveCriteries(filterObj) {
    return Array.from(filterObj.handlerElements).map(function (handler, index) {
      return handler.checked ? filterObj.criteries[index] : -1;
    });
  }


  function getCurrentQuantity(target) {
    target.criteries.forEach(function (element, position) {
      var quantity = '(' + target.filterSingle(window.filter.cards, element).length + ')';
      window.domManager.setElementText(target.quantityElements[position], quantity);
    });
  }


  function onFilterGroupChange(evt) {
    window.filter.cards = window.backend.catalogCards.slice(0);

    window.filter.cards = getActiveCriteries(types).some(function (a) {
      return a !== -1;
    }) ? types.filter(window.filter.cards, getActiveCriteries(types)) : window.filter.cards;

    window.filter.cards = contents.filter(window.filter.cards, getActiveCriteries(contents));
    window.filter.cards = prices.filter(window.filter.cards, prices.criteries);

    if (evt.currentTarget === window.favorite.handlerElement && evt.currentTarget.checked || window.favorite.handlerElement.checked && evt.currentTarget !== inStock.handlerElement) {
      resetFilters(types.handlerElements);
      resetFilters(contents.handlerElements);
      resetFilters(inStock.handlerElement);

      window.priceFilter.reset();
      window.util.debounce(false, true);

      window.filter.cards = window.favorite.list;
    }

    if (evt.currentTarget === inStock.handlerElement && evt.currentTarget.checked || inStock.handlerElement.checked && evt.currentTarget !== window.favorite.handlerElement) {
      resetFilters(types.handlerElements);
      resetFilters(contents.handlerElements);
      resetFilters(window.favorite.handlerElement);
      window.priceFilter.reset();

      window.util.debounce(false, true);

      window.filter.cards = inStock.filter(window.backend.catalogCards);
    }

    setAllQuantities();

    window.render.filter();

    if (!window.filter.cards.length) {
      window.domManager.getEmptyFilterMessage();
    }
  }


  function sortCatalog(cards, matrix) {

    var bingo = matrix.find(function (it) {
      return it !== -1;
    });

    switch (bingo) {
      case SORTER_CRITERIES[0]:
        cards.sort(function (a, b) {
          return window.util.getCardIndex(window.backend.catalogCards, a.name) - window.util.getCardIndex(window.backend.catalogCards, b.name);
        });
        break;
      case SORTER_CRITERIES[1]:
        cards.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case SORTER_CRITERIES[2]:
        cards.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case SORTER_CRITERIES[3]:
        cards.sort(function (a, b) {
          return a.rating.value === b.rating.value ? b.rating.number - a.rating.number : b.rating.value - a.rating.value;
        });
        break;
    }
  }


  function onSorterGroupChange() {
    sortCatalog(window.filter.cards, getActiveCriteries(sorter));

    window.render.filter();

    if (!window.filter.cards.length) {
      window.domManager.getEmptyFilterMessage();
    }
  }


  function onPriceFilterChange(evt) {
    document.removeEventListener('mouseup', onPriceFilterChange);
    evt.preventDefault();
    onFilterGroupChange(evt);
  }


  function resetFilters(handlers) {
    if (handlers.length) {
      handlers.forEach(function (it) {
        it.checked = false;
      });
    } else {
      handlers.checked = false;
    }
  }


  function resetAllFilters() {
    resetFilters(types.handlerElements);
    resetFilters(contents.handlerElements);
    resetFilters(window.favorite.handlerElement);
    resetFilters(inStock.handlerElement);
    window.priceFilter.reset();
  }

  function setAllQuantities() {
    getCurrentQuantity(types);
    getCurrentQuantity(contents);
    window.favorite.setQuantity();
    prices.setQuantity();
    inStock.setQuantity();
  }


  showAll.style.cursor = 'pointer';


  showAll.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.filter.init();
    window.util.debounce(false, true);
  });


  sorter.handlerElements.forEach(function (it) {
    it.addEventListener('change', onSorterGroupChange);
  });


  types.handlerElements.forEach(function (it) {
    it.addEventListener('change', window.util.debounce(onFilterGroupChange));
  });


  contents.handlerElements.forEach(function (it) {
    it.addEventListener('change', window.util.debounce(onFilterGroupChange));
  });


  window.favorite.handlerElement.addEventListener('click', onFilterGroupChange);
  inStock.handlerElement.addEventListener('click', onFilterGroupChange);


  prices.handlerElements.forEach(function (it) {
    it.addEventListener('mousedown', function (downEvt) {
      downEvt.preventDefault();
      document.addEventListener('mouseup', window.util.debounce(onPriceFilterChange), {once: true});
    });
  });


  window.filter = {
    init: function () {
      window.filter.cards = window.backend.catalogCards.slice(0);
      sortCatalog(window.filter.cards, getActiveCriteries(sorter));

      resetAllFilters();
      setAllQuantities();
      sorter.handlerElements[0].checked = true;

      window.render.filter();
    },
    getInStockQuantity: function () {
      inStock.setQuantity();
    },
    cards: []
  };

})();
