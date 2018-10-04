'use strict';

(function () {


  var types = {
    inputs: document.querySelectorAll('input[name="food-type"]'),
    criteries: ['Мороженое', 'Газировка', 'Жевательная резинка', 'Мармелад', 'Зефир'],
  };

  var contents = {
    inputs: document.querySelectorAll('input[name="food-property"]'),
    criteries: ['sugar', 'vegetarian', 'gluten']
  };

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

  var availabilityInput = document.querySelector('#filter-availability');
  var showAll = document.querySelector('button.catalog__submit');

  function getActiveCriteries(myObject) {
    return Array.from(myObject.inputs).map(function (inputEach, index) {
      return inputEach.checked ? myObject.criteries[index] : -1;
    })
    .filter(function (it) {
      return it !== -1;
    });
  }

  function filterType(array, matrix) {
    if (matrix.length) {
      window.toShow = array.filter(function (card) {
        return matrix.some(function (it) {
          return it === card.kind;
        });
      });
    }
  }

  function filterContents(array, matrix) {
    if (matrix.length) {
      window.toShow = array.filter(function (card) {
        return matrix.every(function (it) {
          return (card.nutritionFacts[it] === false && it === 'sugar') || (card.nutritionFacts[it] === true && it === 'vegetarian') || (card.nutritionFacts[it] === false && it === 'gluten');
        });
      });
    }
  }

  function filterPrice(array, matrix) {
    window.toShow = array.filter(function (card) {
      return matrix.every(function (it) {
        return (card.price >= it.textContent && it === prices.min) || (card.price <= it.textContent && it === prices.max);
      });
    });
  }

  function filterAvailability(array) {
    window.toShow = array.filter(function (card) {
      return card.amount > 0;
    });
  }

  function filterFavorite(array, matrix) {
    if (matrix.length) {
      window.toShow = array.filter(function (card, indexInCatalog) {
        return matrix.some(function (chosenIndex) {
          return chosenIndex === indexInCatalog;
        });
      });
    } else {
      window.toShow = [];
    }
  }

  function onFilterGroupChange() {
    window.toShow = window.catalogCards.slice(0);

    filterType(window.toShow, getActiveCriteries(types));
    filterContents(window.toShow, getActiveCriteries(contents));
    filterPrice(window.toShow, [prices.min, prices.max]);

    window.renderCards.renderFilter();

    if (!window.toShow.length) {
      window.domManager.getEmptyFilterMessage();
    }
  }

  function onMarkChange(evt) {
    window.toShow = window.catalogCards.slice(0);
    if (evt.currentTarget === favorite.input) {
      filterFavorite(window.toShow, favorite.getCriteria());
      availabilityInput.checked = false;
    } else if (evt.currentTarget === availabilityInput) {
      filterAvailability(window.toShow);
      favorite.input.checked = false;
    }

    window.renderCards.renderFilter();

    if (!window.toShow.length && evt.currentTarget.checked) {
      window.domManager.getEmptyFilterMessage();
    } else if (!evt.currentTarget.checked) {
      window.renderCards.renderCatalog();
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    onFilterGroupChange();
    document.removeEventListener('mouseup', onMouseUp);
  }

  types.inputs.forEach(function (elem) {
    elem.addEventListener('change', onFilterGroupChange);
  });

  contents.inputs.forEach(function (elem) {
    elem.addEventListener('change', onFilterGroupChange);
  });

  favorite.input.addEventListener('click', onMarkChange);
  availabilityInput.addEventListener('click', onMarkChange);

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
})();
