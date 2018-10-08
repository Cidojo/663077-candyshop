'use strict';

(function () {
  var TYPE_CRITERIES = ['Мороженое', 'Газировка', 'Жевательная резинка', 'Мармелад', 'Зефир'];
  var CONTENT_CRITERIES = ['sugar', 'vegetarian', 'gluten'];
  var SORTER_CRITERIES = ['number', 'price', 'priceReverse', 'value'];


  var types = {
    handlers: document.querySelectorAll('.catalog__filter:nth-of-type(1) input'),
    quantities: document.querySelectorAll('.catalog__filter:nth-of-type(1) input ~ span'),
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
    handlers: document.querySelectorAll('.catalog__filter:nth-of-type(2) input'),
    quantities: document.querySelectorAll('.catalog__filter:nth-of-type(2) input ~ span'),
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
    handlers: [document.querySelector('.range__btn--left'), document.querySelector('.range__btn--right')],
    quantity: document.querySelector('.range__price-count .range__count'),
    criteries: [document.querySelector('.range__price--min'), document.querySelector('.range__price--max')],

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
      window.domManager.fillTextContent(this.quantity, quantity);
    }
  };


  var favorite = {
    handler: document.querySelector('#filter-favorite'),
    cardNode: document.querySelectorAll('.catalog__card'),
    cardNodeSelector: '.catalog__card',
  };


  var inStock = {
    handler: document.querySelector('#filter-availability'),
    quantity: document.querySelector('#filter-availability ~ span'),

    filter: function (array) {
      return array.filter(function (card) {
        return card.amount > 0;
      });
    },
    setQuantity: function () {
      window.domManager.fillTextContent(this.quantity, this.filter(window.backend.catalogCards).length);
    }
  };


  var sorter = {
    handlers: document.querySelectorAll('.catalog__filter:nth-of-type(4) input'),
    criteries: SORTER_CRITERIES
  };


  var showAll = document.querySelector('button.catalog__submit');


  function getActiveCriteries(myObject) {
    return Array.from(myObject.handlers).map(function (handlerEach, index) {
      return handlerEach.checked ? myObject.criteries[index] : -1;
    });
  }


  function getCurrentQuantity(target) {
    target.criteries.forEach(function (element, position) {
      var quantity = '(' + target.filterSingle(window.filter.cards, element).length + ')';
      window.domManager.fillTextContent(target.quantities[position], quantity);
    });
  }


  function onFilterGroupChange(evt) {
    window.filter.cards = window.backend.catalogCards.slice(0);

    window.filter.cards = getActiveCriteries(types).some(function (a) {
      return a !== -1;
    }) ? types.filter(window.filter.cards, getActiveCriteries(types)) : window.filter.cards;

    window.filter.cards = contents.filter(window.filter.cards, getActiveCriteries(contents));
    window.filter.cards = prices.filter(window.filter.cards, prices.criteries);

    if (evt.currentTarget === favorite.handler && evt.currentTarget.checked) {
      window.filter.cards = window.favorite.list;
      inStock.handler.checked = false;
    }

    if (evt.currentTarget === inStock.handler && evt.currentTarget.checked) {
      window.filter.cards = inStock.filter(window.filter.cards);
      favorite.handler.checked = false;
    }

    getCurrentQuantity(types);
    getCurrentQuantity(contents);
    prices.setQuantity();
    inStock.setQuantity();

    window.renderCards.renderFilter();

    if (!window.filter.cards.length) {
      window.domManager.getEmptyFilterMessage();
    }
  }


  function sortCatalog(array, matrix) {
    var bingo = matrix.filter(function (it) {
      return it !== -1;
    })
    .join('');

    switch (true) {
      case (bingo === SORTER_CRITERIES[0]):
        window.filter.cards.sort(function (a, b) {
          return window.util.getCardIndex(window.backend.catalogCards, a.name) - window.util.getCardIndex(window.backend.catalogCards, b.name);
        });
        break;
      case (bingo === SORTER_CRITERIES[1]):
        window.filter.cards.sort(function (a, b) {
          return a.price - b.price;
        })
        .reverse();
        break;
      case (bingo === SORTER_CRITERIES[2]):
        window.filter.cards.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case (bingo === SORTER_CRITERIES[3]):
        window.filter.cards.sort(function (a, b) {
          return a.rating.value === b.rating.value ? a.rating.number > b.rating.number : a.rating.value - b.rating.value;
        })
        .reverse();
        break;
    }
  }


  function onSorterGroupChange() {
    sortCatalog(window.filter.cards, getActiveCriteries(sorter));

    window.renderCards.renderFilter();

    if (!window.filter.cards.length) {
      window.domManager.getEmptyFilterMessage();
    }
  }


  function onPriceFilterChange(upEvt) {
    upEvt.preventDefault();
    onFilterGroupChange(upEvt);
    document.removeEventListener('mouseup', onPriceFilterChange);
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


  showAll.setAttribute('style', 'cursor: pointer;');


  showAll.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.filter.init();
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
      document.addEventListener('mouseup', onPriceFilterChange);
    });
  });


  window.filter = {
    init: function () {
      window.filter.cards = window.backend.catalogCards.slice(0);
      window.renderCards.renderFilter();
      sortCatalog(window.filter.cards, getActiveCriteries(sorter));

      resetFilters(types.handlers);
      resetFilters(contents.handlers);
      resetFilters(favorite.handler);
      resetFilters(inStock.handler);
      window.priceFilter.reset();

      getCurrentQuantity(types);
      getCurrentQuantity(contents);
      window.favorite.setQuantity();
      prices.setQuantity();
      inStock.setQuantity();

      sorter.handlers[0].checked = true;

    },
    getInStockQuantity: function () {
      inStock.setQuantity();
    },
    cards: []
  };

})();
