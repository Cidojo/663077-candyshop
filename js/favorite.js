'use strict';

(function () {
  var FAVORITE_SELECTED_CLASS = 'card__btn-favorite--selected';


  window.favorite = {
    handlerElement: document.querySelector('#filter-favorite'),
    quantityElement: document.querySelector('#filter-favorite ~ span'),

    updateList: function (card, btn) {
      var cardClicked = window.backend.catalogCards.find(function (it) {
        return it.name === card.name;
      });

      btn.classList.toggle(FAVORITE_SELECTED_CLASS);
      btn.blur();

      if (btn.classList.contains(FAVORITE_SELECTED_CLASS)) {
        window.favorite.list.push(cardClicked);
      } else {
        window.favorite.list.splice(window.favorite.list.findIndex(function (it) {
          return it.name === cardClicked.name;
        }), 1);
      }
      this.setQuantity();
    },
    checkIt: function (card) {
      return this.list.some(function (it) {
        return it.name === card.name;
      });
    },
    setQuantity: function () {
      window.domManager.setElementText(this.quantityElement, '(' + this.list.length + ')');
    },
    list: []
  };
})();
