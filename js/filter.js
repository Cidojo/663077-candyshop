'use strict';

(function () {
  var TYPE_CRITERIES = ['Мороженое', 'Газировка', 'Жевательная резинка', 'Мармелад', 'Зефир'];
  var CONTENT_CRITERIES = ['sugar', 'vegetarian', 'gluten'];
  var SORTER_CRITERIES = ['number', 'price', 'priceReverse', 'value'];
  var catalogSidebar = document.querySelector('.catalog__sidebar');

  var types = {
    handlers: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(1) input'),
    quantities: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(1) input ~ span'),
    criteries: TYPE_CRITERIES,

    filter: function (array, matrix) {
      var combineArray = [];

      matrix.forEach(function (it) {
        if (it !== -1) {
          combineArray = combineArray.concat(types.filterSingle(array, it))
            .filter(function (element, position, self) {
              return self.indexOf(element) === position;
            });
        }
      });

      return combineArray;
    },

    filterSingle: function (_array, criteria) {
      return _array.filter(function (_it) {
        return _it.kind === criteria;
      });
    }
  };


  var contents = {
    handlers: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(2) input'),
    quantities: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(2) input ~ span'),
    criteries: CONTENT_CRITERIES,

    filter: function (array, matrix) {

      matrix.forEach(function (it) {
        if (it !== -1) {
          array = contents.filterSingle(array, it)
            .filter(function (element, position, self) {
              return self.indexOf(element) === position;
            });
        }
      });

      return array;
    },

    filterSingle: function (_array, criteria) {
      return _array.filter(function (_it) {
        return (_it.nutritionFacts[criteria] === false && criteria === CONTENT_CRITERIES[0]) || (_it.nutritionFacts[criteria] === true && criteria === CONTENT_CRITERIES[1]) || (_it.nutritionFacts[criteria] === false && criteria === CONTENT_CRITERIES[2]);
      });
    }
  };


  var prices = {
    handlers: [catalogSidebar.querySelector('.range__btn--left'), catalogSidebar.querySelector('.range__btn--right')],
    quantity: catalogSidebar.querySelector('.range__price-count .range__count'),
    criteries: [catalogSidebar.querySelector('.range__price--min'), catalogSidebar.querySelector('.range__price--max')],

    filter: function (array, matrix) {

      matrix.forEach(function (it) {
        array = prices.filterSingle(array, it)
          .filter(function (element, position, self) {
            return self.indexOf(element) === position;
          });
      });

      return array;
    },
    filterSingle: function (_array, criteria) {
      return _array.filter(function (_it) {
        return _it.price >= criteria.textContent && criteria.classList.contains('range__price--min') ||
          _it.price <= criteria.textContent && criteria.classList.contains('range__price--max');
      });
    },
    setQuantity: function () {
      var quantity = '(' + this.filter(window.filter.cards, this.criteries).length + ')';
      window.domManager.setElementText(this.quantity, quantity);
    }
  };


  var favorite = {
    handler: catalogSidebar.querySelector('#filter-favorite'),
    cardNode: catalogSidebar.querySelectorAll('.catalog__card'),
    cardNodeSelector: '.catalog__card',
  };


  var inStock = {
    handler: catalogSidebar.querySelector('#filter-availability'),
    quantity: catalogSidebar.querySelector('#filter-availability ~ span'),

    filter: function (array) {
      return array.filter(function (card) {
        return card.amount > 0;
      });
    },
    setQuantity: function () {
      window.domManager.setElementText(this.quantity, '(' + this.filter(window.backend.catalogCards).length + ')');
    }
  };


  var sorter = {
    handlers: catalogSidebar.querySelectorAll('.catalog__filter:nth-of-type(4) input'),
    criteries: SORTER_CRITERIES
  };


  var showAll = catalogSidebar.querySelector('button.catalog__submit');


  function getActiveCriteries(myObject) {
    return Array.from(myObject.handlers).map(function (handlerEach, index) {
      return handlerEach.checked ? myObject.criteries[index] : -1;
    });
  }


  function getCurrentQuantity(target) {
    target.criteries.forEach(function (element, position) {
      var quantity = '(' + target.filterSingle(window.filter.cards, element).length + ')';
      window.domManager.setElementText(target.quantities[position], quantity);
    });
  }


  function onFilterGroupChange(evt) {
    window.filter.cards = window.backend.catalogCards.slice(0);

    window.filter.cards = getActiveCriteries(types).some(function (a) {
      return a !== -1;
    }) ? types.filter(window.filter.cards, getActiveCriteries(types)) : window.filter.cards;

    window.filter.cards = contents.filter(window.filter.cards, getActiveCriteries(contents));
    window.filter.cards = prices.filter(window.filter.cards, prices.criteries);

    if (evt.currentTarget === favorite.handler && evt.currentTarget.checked || favorite.handler.checked && evt.currentTarget !== inStock.handler) {
      resetFilters(types.handlers);
      resetFilters(contents.handlers);
      resetFilters(inStock.handler);

      window.priceFilter.reset();
      window.util.debounce(false, true);

      window.filter.cards = window.favorite.list;
    }

    if (evt.currentTarget === inStock.handler && evt.currentTarget.checked || inStock.handler.checked && evt.currentTarget !== favorite.handler) {
      resetFilters(types.handlers);
      resetFilters(contents.handlers);
      resetFilters(favorite.handler);
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


  function sortCatalog(array, matrix) {

    var bingo = matrix.find(function (it) {
      return it !== -1;
    });

    switch (bingo) {
      case SORTER_CRITERIES[0]:
        window.filter.cards.sort(function (a, b) {
          return window.util.getCardIndex(window.backend.catalogCards, a.name) - window.util.getCardIndex(window.backend.catalogCards, b.name);
        });
        break;
      case SORTER_CRITERIES[1]:
        window.filter.cards.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case SORTER_CRITERIES[2]:
        window.filter.cards.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case SORTER_CRITERIES[3]:
        window.filter.cards.sort(function (a, b) {
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


  function resetFilters(inputs) {
    if (inputs.length) {
      inputs.forEach(function (it) {
        it.checked = false;
      });
    } else {
      inputs.checked = false;
    }
  }


  function resetAllFilters() {
    resetFilters(types.handlers);
    resetFilters(contents.handlers);
    resetFilters(favorite.handler);
    resetFilters(inStock.handler);
    window.priceFilter.reset();
  }

  function setAllQuantities() {
    getCurrentQuantity(types);
    getCurrentQuantity(contents);
    window.favorite.setQuantity();
    prices.setQuantity();
    inStock.setQuantity();
  }


  showAll.setAttribute('style', 'cursor: pointer;');


  showAll.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.filter.init();
    window.util.debounce(false, true);
  });


  sorter.handlers.forEach(function (elem) {
    elem.addEventListener('change', onSorterGroupChange);
  });


  types.handlers.forEach(function (elem) {
    elem.addEventListener('change', window.util.debounce(onFilterGroupChange));
  });


  contents.handlers.forEach(function (elem) {
    elem.addEventListener('change', window.util.debounce(onFilterGroupChange));
  });


  favorite.handler.addEventListener('click', onFilterGroupChange);
  inStock.handler.addEventListener('click', onFilterGroupChange);


  prices.handlers.forEach(function (it) {
    it.addEventListener('mousedown', function (downEvt) {
      downEvt.preventDefault();
      document.addEventListener('mouseup', window.util.debounce(onPriceFilterChange), {once: true});
    });
  });


  window.filter = {
    init: function () {
      window.filter.cards = window.backend.catalogCards.slice(0);
      window.render.filter();
      sortCatalog(window.filter.cards, getActiveCriteries(sorter));

      resetAllFilters();
      setAllQuantities();

      sorter.handlers[0].checked = true;
    },
    getInStockQuantity: function () {
      inStock.setQuantity();
    },
    cards: []
  };

})();
