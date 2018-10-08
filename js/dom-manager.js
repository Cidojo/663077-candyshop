'use strict';

(function () {
  var MAX_AMOUNT = 5;
  var emptyFilterTemplate = document.querySelector('#empty-filters');
  var catalogBlock = document.querySelector('.catalog__cards');


  function onShowAllButtonClick(evt) {
    window.filter.init();
    evt.target.removeEventListener('click', onShowAllButtonClick);
  }


  window.domManager = {
    fillTextContent: function (owner, text) {
      owner.textContent = text;
    },
    removeDomChild: function (elem, start) {
      while (elem.children[start - 1]) {
        elem.removeChild(elem.children[start - 1]);
      }
    },
    getEmptyFilterMessage: function () {
      var fragment = document.createDocumentFragment();

      fragment.appendChild(emptyFilterTemplate.cloneNode(true).content);

      var showAllButton = fragment.querySelector('.catalog__show-all');
      showAllButton.setAttribute('style', 'cursor: pointer;');
      showAllButton.addEventListener('click', onShowAllButtonClick);

      catalogBlock.appendChild(fragment);
    },
    setAmountStyle: function (owner, amount) {
      if (owner) {
        owner.classList.toggle('card--in-stock', amount > MAX_AMOUNT);
        owner.classList.toggle('card--little', amount && amount < MAX_AMOUNT);
        owner.classList.toggle('card--soon', !amount);
      }
    }

  };
})();
