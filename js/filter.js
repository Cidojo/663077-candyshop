'use strict';

(function () {
  window.filteredCards = [];

  window.filterCheckboxesByBlock = [
    {
      fieldSelector: '.catalog__sidebar .catalog__filter:nth-child(1)',
      inputsSelector: 'input[name="food-type"]',
      stringsSelector: 'input[name="food-type"] + label'
    },
    {
      fieldSelector: '.catalog__sidebar .catalog__filter:nth-child(2)',
      inputsSelector: 'input[name="food-property"]'
    },
  ];


  function initFormNodes(inputsByBlock) {
    inputsByBlock.forEach(function (elem) {
      elem.block = document.querySelector(elem.fieldSelector);
      elem.inputs = elem.block.querySelectorAll(elem.inputsSelector);
      elem.strings = elem.block.querySelectorAll(elem.stringsSelector);
    });
  }

  function getNodelistMapped(nodeList) {
    return Array.from(nodeList).map(function (elem, index) {
      return elem.checked ? index : 0;
    })
    .filter(function (elem) {
      return elem !== 0;
    });
  }

  initFormNodes(window.filterCheckboxesByBlock);

  window.checkFilter = function () {
    window.filterCheckboxesByBlock.forEach(function (elem) {
      var myArray = getNodelistMapped(elem.inputs);
      var myStrings = Array.from(elem.strings).map(function (elem) {
        elem.textContent;
      });

      window.catalogCards.forEach(function(elem) {
        debugger
          if (elem.kind === myStrings[index]) {
            window.filteredCards.push(elem);
          }
        });
    });
  };

})();
