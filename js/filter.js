'use strict';

(function () {

  var types = {
    inputs: document.querySelectorAll('input[name="food-type"]'),
    quantities: document.querySelectorAll('input[name="food-type"] ~ span'),
    criteries: ['Мороженое', 'Газировка', 'Жевательная резинка', 'Мармелад', 'Зефир'],

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
    inputs: document.querySelectorAll('input[name="food-property"]'),
    quantities: document.querySelectorAll('input[name="food-property"] ~ span'),
    criteries: ['sugar', 'vegetarian', 'gluten'],

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
        return (_it.nutritionFacts[criteria] === false && criteria === 'sugar') || (_it.nutritionFacts[criteria] === true && criteria === 'vegetarian') || (_it.nutritionFacts[criteria] === false && criteria === 'gluten');
      });
    }
  };


  var prices = {
    inputs: [document.querySelector('.range__btn--left'), document.querySelector('.range__btn--right')],
    quantities: document.querySelector('.range__price-count .range__count'),
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
    }
  };


  var favorite = {
    input: document.querySelector('#filter-favorite'),
    cardNode: document.querySelectorAll('.catalog__card'),
    cardNodeSelector: '.catalog__card',
  };


  var inStock = {
    input: document.querySelector('#filter-availability'),
    quantities: document.querySelector('#filter-availability ~ span'),

    filter: function (array) {
      return array.filter(function (card) {
        return card.amount > 0;
      });
    },
    setQuantity: function () {
      window.domManager.fillTextContent(this.quantities, this.filter(window.catalogCards).length);
    }
  };


  var sorter = {
    inputs: document.querySelectorAll('input[name="sort"]'),
    criteries: ['number', 'price', 'priceReverse', 'value']
  };


  var showAll = document.querySelector('button.catalog__submit');


  function getActiveCriteries(myObject) {
    return Array.from(myObject.inputs).map(function (inputEach, index) {
      return inputEach.checked ? myObject.criteries[index] : -1;
    });
  }


  function getCurrentQuantity(target) {
    target.criteries.forEach(function (element, position) {
      var quantity = '(' + target.filterSingle(window.filteredCards, element).length + ')';
      if (target.quantities[position]) {
        window.domManager.fillTextContent(target.quantities[position], quantity);
      } else {
        window.domManager.fillTextContent(target.quantities, quantity);
      }
    });
  }


  function onFilterGroupChange(evt) {
    window.filteredCards = window.catalogCards.slice(0);

    window.filteredCards = getActiveCriteries(types).some(function (a) {
      return a !== -1;
    }) ? types.filter(window.filteredCards, getActiveCriteries(types)) : window.filteredCards;

    window.filteredCards = contents.filter(window.filteredCards, getActiveCriteries(contents));
    window.filteredCards = prices.filter(window.filteredCards, prices.criteries);

    if (evt.currentTarget === favorite.input && evt.currentTarget.checked) {
      window.filteredCards = window.favorite.list;
      inStock.input.checked = false;
    }

    if (evt.currentTarget === inStock.input && evt.currentTarget.checked) {
      window.filteredCards = inStock.filter(window.filteredCards);
      favorite.input.checked = false;
    }

    getCurrentQuantity(types);
    getCurrentQuantity(contents);
    getCurrentQuantity(prices);
    inStock.setQuantity();

    window.renderCards.renderFilter();

    if (!window.filteredCards.length) {
      window.domManager.getEmptyFilterMessage();
    }
  }


  function sortCatalog(array, matrix) {
    var bingo = matrix.filter(function (it) {
      return it !== -1;
    })
    .join('');

    switch (true) {
      case (bingo === 'number'):
        window.filteredCards.sort(function (a, b) {
          return window.util.getCardIndex(window.catalogCards, a.name) - window.util.getCardIndex(window.catalogCards, b.name);
        }).reverse();
        break;
      case (bingo === 'price'):
        window.filteredCards.sort(function (a, b) {
          return a.price - b.price;
        })
        .reverse();
        break;
      case (bingo === 'priceReverse'):
        window.filteredCards.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case (bingo === 'value'):
        window.filteredCards.sort(function (a, b) {
          return a.rating.value === b.rating.value ? a.rating.number > b.rating.number : a.rating.value - b.rating.value;
        })
        .reverse();
        break;
    }
  }


  function onSorterGroupChange() {
    sortCatalog(window.filteredCards, getActiveCriteries(sorter));

    window.renderCards.renderFilter();

    if (!window.filteredCards.length) {
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

  sorter.inputs.forEach(function (elem) {
    elem.addEventListener('change', onSorterGroupChange);
  });


  types.inputs.forEach(function (elem) {
    elem.addEventListener('change', onFilterGroupChange);
  });


  contents.inputs.forEach(function (elem) {
    elem.addEventListener('change', onFilterGroupChange);
  });


  favorite.input.addEventListener('click', onFilterGroupChange);
  inStock.input.addEventListener('click', onFilterGroupChange);


  showAll.setAttribute('style', 'cursor: pointer;');
  showAll.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.initFilter();
    window.renderCards.renderCatalog();
  });


  prices.inputs.forEach(function (it) {
    it.addEventListener('mousedown', function (downEvt) {
      downEvt.preventDefault();
      document.addEventListener('mouseup', onPriceFilterChange);
    });
  });


  window.initFilter = function () {
    resetFilters(types.inputs);
    resetFilters(contents.inputs);
    resetFilters(favorite.input);
    resetFilters(inStock.input);

    getCurrentQuantity(types);
    getCurrentQuantity(contents);
    prices.quantities.textContent = window.filteredCards.length;
    window.favorite.setQuantity();
    inStock.setQuantity();
  };

})();
