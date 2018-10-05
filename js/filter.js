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
    },

    getCurrentQuantity: function () {
      this.criteries.forEach(function (element, position) {
        var quantity = '(' + types.filterSingle(window.filteredCards, element).length + ')';

        window.domManager.fillTextContent(types.quantities[position], quantity);
      });
    }
  };

  var contents = {
    inputs: document.querySelectorAll('input[name="food-property"]'),
    quantities: document.querySelectorAll('input[name="food-property"] ~ span'),
    criteries: ['sugar', 'vegetarian', 'gluten'],

    filter: function (array, matrix) {
      // var combineArray = [];

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
    },
    getCurrentQuantity: function () {
      this.criteries.forEach(function (element, position) {
        var quantity = '(' + contents.filterSingle(window.filteredCards, element).length + ')';

        window.domManager.fillTextContent(contents.quantities[position], quantity);
      });
    }
  };

  // function filterContents(array, matrix) {
  //   if (matrix.length) {
  //     window.filteredCards = array.filter(function (card) {
  //       return matrix.every(function (it) {
  //         return (card.nutritionFacts[it] === false && it === 'sugar') || (card.nutritionFacts[it] === true && it === 'vegetarian') || (card.nutritionFacts[it] === false && it === 'gluten');
  //       });
  //     });
  //   }
  // }


  var prices = {
    min: document.querySelector('.range__price--min'),
    max: document.querySelector('.range__price--max'),
    handlerLeft: document.querySelector('.range__btn--left'),
    handlerRight: document.querySelector('.range__btn--right')
  };

  var favorite = {
    input: document.querySelector('#filter-favorite'),
    cardNode: document.querySelectorAll('.catalog__card'),
    cardNodeSelector: '.catalog__card',

    getCardNode: function () {
      return document.querySelectorAll(this.cardNodeSelector);
    },
    getCriteria: function () {
      return Array.from(favorite.getCardNode()).map(function (it, index) {
        return it.querySelector('.card__btn-favorite--selected') ? index : -1;
      })
      .filter(function (_it) {
        return _it !== -1;
      });
    }
  };

  var sorter = {
    inputs: document.querySelectorAll('input[name="sort"]'),
    criteries: ['number', 'price', 'priceReverse', 'value']
  };

  // var availabilityInput = document.querySelector('#filter-availability');
  var showAll = document.querySelector('button.catalog__submit');
  //
  var getActiveCriteries = function (myObject) {
    return Array.from(myObject.inputs).map(function (inputEach, index) {
      return inputEach.checked ? myObject.criteries[index] : -1;
    });
  };

  // function filterType(array, matrix) {
  //   if (matrix.length) {
  //     window.filteredCards = array.filter(function (card) {
  //       return matrix.some(function (it) {
  //         return it === card.kind;
  //       });
  //     });
  //   }
  // }
  //
  // function filterContents(array, matrix) {
  //   if (matrix.length) {
  //     window.filteredCards = array.filter(function (card) {
  //       return matrix.every(function (it) {
  //         return (card.nutritionFacts[it] === false && it === 'sugar') || (card.nutritionFacts[it] === true && it === 'vegetarian') || (card.nutritionFacts[it] === false && it === 'gluten');
  //       });
  //     });
  //   }
  // }
  //
  // function filterPrice(array, matrix) {
  //   window.filteredCards = array.filter(function (card) {
  //     return matrix.every(function (it) {
  //       return (card.price >= it.textContent && it === prices.min) || (card.price <= it.textContent && it === prices.max);
  //     });
  //   });
  // }
  //
  // function filterAvailability(array) {
  //   window.filteredCards = array.filter(function (card) {
  //     return card.amount > 0;
  //   });
  // }
  //
  // function filterFavorite(array, matrix) {
  //   if (matrix.length) {
  //     window.filteredCards = array.filter(function (card, indexInCatalog) {
  //       return matrix.some(function (chosenIndex) {
  //         return chosenIndex === indexInCatalog;
  //       });
  //     });
  //   } else {
  //     window.filteredCards = [];
  //   }
  // }

  function onFilterGroupChange() {
    window.filteredCards = window.catalogCards.slice(0);

    window.filteredCards = getActiveCriteries(types).some(function (a) {
      return a !== -1;
    }) ? types.filter(window.filteredCards, getActiveCriteries(types)) : window.filteredCards;
    // debugger
    window.filteredCards = contents.filter(window.filteredCards, getActiveCriteries(contents));

    types.getCurrentQuantity();
    contents.getCurrentQuantity();

    // filterContents(window.filteredCards, getActiveCriteries(contents));
    // filterPrice(window.filteredCards, [prices.min, prices.max]);
    // onSorterGroupChange();
    window.renderCards.renderFilter();

    if (!window.filteredCards.length) {
      window.domManager.getEmptyFilterMessage();
    }
  }

  // function onMarkChange(evt) {
  //   window.filteredCards = window.catalogCards.slice(0);
  //   if (evt.currentTarget === favorite.input) {
  //     filterFavorite(window.filteredCards, favorite.getCriteria());
  //     availabilityInput.checked = false;
  //   } else if (evt.currentTarget === availabilityInput) {
  //     filterAvailability(window.filteredCards);
  //     favorite.input.checked = false;
  //   }
  //
  //   onSorterGroupChange();
  //
  //   if (!evt.currentTarget.checked) {
  //     window.renderCards.renderCatalog();
  //   }
  // }

  function sortCatalog(array, matrix) {
    switch (true) {
      case (matrix[0] === 'number'):
        window.filteredCards.sort(function (a, b) {
          return a.rating.number - b.rating.number;
        }).reverse();
        break;
      case (matrix[0] === 'price'):
        window.filteredCards.sort(function (a, b) {
          return a.price - b.price;
        })
        .reverse();
        break;
      case (matrix[0] === 'priceReverse'):
        window.filteredCards.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case (matrix[0] === 'value'):
        window.filteredCards.sort(function (a, b) {
          return a.rating.value > b.rating.value;
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

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    onFilterGroupChange();
    document.removeEventListener('mouseup', onMouseUp);
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

  // favorite.input.addEventListener('click', onMarkChange);
  // availabilityInput.addEventListener('click', onMarkChange);

  showAll.setAttribute('style', 'cursor: pointer;');
  showAll.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.renderCards.renderCatalog();
  });

  prices.handlerLeft.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    document.addEventListener('mouseup', onMouseUp);
  });
  prices.handlerRight.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    document.addEventListener('mouseup', onMouseUp);
  });

  window.initFilter = function () {
    types.getCurrentQuantity();
    contents.getCurrentQuantity();

    // types.criteries.forEach(function (element) {
    //   types.filterSingle(initArray, element);
    // });
    //
    // contents.criteries.forEach(function (element, position) {
    //   contents.filterSingle(initArray, contents.criteries[position], position);
    // });
  };


})();
