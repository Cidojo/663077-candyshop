'use strict';

(function () {
  var mappedCatalog = window.catalogCards.map(function (card, index) {
    return {
      kind: card.kind,
      gluten: card.nutritionFacts.gluten,
      vegetarian: card.nutritionFacts.vegetarian,
      sugar: card.nutritionFacts.sugar,
      price: card.price,
      indexInCatalog: index
    };
  });
debugger








  var types = {
    inputs: document.querySelectorAll('input[name="food-type"]'),
    criteries: ['Мороженое', 'Газировка', 'Жевательная резинка', 'Мармелад', 'Зефир'],
  };

  var contents = {
    inputs: document.querySelectorAll('input[name="food-property"]'),
    criteries: [true, true, true]
  };

  function filterByCriteria(arrayToFilter, property, criteria) {
    return arrayToFilter.filter(function (elem) {
      return elem[property] === criteria;
    });
  }

  function getCheckedInputs(_nodeList, criteriaIndex) {
    return Array.from(_nodeList).map(function (filter, index) {
      return filter.checked ? index : -1;
    })
    .filter(function (status) {
      return status !== -1;
    })
    .some(function (criteria) {
      return criteria === criteriaIndex;
    });
  }

  function buildFilteredCards(criteriaArray, property, nodeList) {
    // var checkedInputsKeys = getCheckedInputs(types.inputs);
    criteriaArray.forEach(function (_status, _criteriaIndex) {
      if (getCheckedInputs(nodeList, _criteriaIndex)) {
        window.filteredCards = window.filteredCards.concat(filterByCriteria(window.catalogCards, property, _status));
      }
    });
  }


  function filterByType() {
    window.filteredCards = [];
    buildFilteredCards(types.criteries, 'kind', types.inputs);

    if (window.filteredCards.length) {
      window.renderCards.renderFilter();
    } else {
      window.renderCards.renderCatalog();
    }
  }

  types.inputs.forEach(function (elem) {
    elem.addEventListener('change', filterByType);
  });
  contents.inputs.forEach(function (elem) {
    elem.addEventListener('change', filterByType);
  });
  // function initFormNodes(inputsByBlock) {
  //   inputsByBlock.forEach(function (elem) {
  //     elem.block = document.querySelector(elem.fieldSelector);
  //     elem.inputs = elem.block.querySelectorAll(elem.inputsSelector);
  //     elem.criteria = Array.from(elem.block.querySelectorAll(elem.stringsSelector)).map(function (it) {
  //       return it.textContent;
  //     });
  //   });
  // }
  //
  // initFormNodes(window.filterCheckboxesByBlock);
  //
  // function filterType(catalog) {
  //   catalog.filter(function (elem) {
  //     return window.filterCheckboxesByBlock[0].string.some(function (_elem) {
  //       return _elem === elem;
  //     });
  //   });
  // }
  // debugger
  //
  //
  // function getCriteria(obj) {
  //   // debugger
  //   var myArray = [];
  //   obj.inputs.forEach(function (input, index) {
  //     if (input.checked) {
  //       myArray.push(obj.strings[index].textContent);
  //     }
  //   });
  //   return myArray;
  // }
  //
  // function filterByType(typeCriteria) {
  //   window.filteredCards.concat(window.catalogCards.filter(function (elem) {
  //     return typeCriteria.some(function (_elem) {
  //       return elem.kind === _elem;
  //     });
  //   }));
  // }
  //
  // window.filterCheckboxesByBlock[0].inputs.forEach(function (elem) {
  //   elem.addEventListener('change', function () {
  //     filterByType(getCriteria(window.filterCheckboxesByBlock[0]));
  //   });
  // });


  //
  // function getCheckList(array, keys) {
  //   array.filter(function(elem) {
  //     keys.some(index);
  //   });
  // }
  //
  // initFormNodes(window.filterCheckboxesByBlock);
  //
  // window.checkFilter = function () {
  //   window.filterCheckboxesByBlock.forEach(function (elem) {
  //     var myArray = getNodelistMapped(elem.inputs);
  //     var myStrings = Array.from(elem.strings).map(function (elem) {
  //       elem.textContent;
  //     });
  //
  //     window.catalogCards.forEach(function(elem) {
  //       debugger
  //         if (elem.kind === myStrings[index]) {
  //           window.filteredCards.push(elem);
  //         }
  //       });
  //   });
  // };

})();
