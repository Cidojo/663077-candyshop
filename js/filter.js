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

  function getActiveCriteries(myObject) {
    return Array.from(myObject.inputs).map(function (inputEach, index) {
      return inputEach.checked ? myObject.criteries[index] : -1;
    })
    .filter(function (it) {
      return it !== -1;
    });
  }

  function onFilterChange() {
    window.toShow = window.catalogCards.slice(0);
    filterType(window.toShow, getActiveCriteries(types));
    filterContents(window.toShow, getActiveCriteries(contents));
    filterPrice(window.toShow, [prices.min, prices.max]);

    if (window.toShow.length) {
      window.renderCards.renderFilter();
    } else {
      window.renderCards.renderCatalog();
    }
  }

  types.inputs.forEach(function (elem) {
    elem.addEventListener('change', onFilterChange);
  });

  contents.inputs.forEach(function (elem) {
    elem.addEventListener('change', onFilterChange);
  });

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    onFilterChange();
    document.removeEventListener('mouseup', onMouseUp);
  }

  prices.handlerLeft.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    document.addEventListener('mouseup', onMouseUp);
  });
  prices.handlerRight.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    document.addEventListener('mouseup', onMouseUp);
  });
})();
