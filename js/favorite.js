'use strict';

(function () {
  var FAVORITE_SELECTED_CLASS = 'card__btn-favorite--selected';
  var quantityField = document.querySelector('#filter-favorite ~ span');

  window.favorite = {
    updateFavoriteList: function (card, btn) {
      var thisCard = window.catalogCards.find(function (it) {
        return it.name === card.name;
      });

      btn.classList.toggle(FAVORITE_SELECTED_CLASS);
      btn.blur();

      if (btn.classList.contains(FAVORITE_SELECTED_CLASS)) {
        window.favorite.list.push(thisCard);
      } else {
        window.favorite.list.splice(window.favorite.list.findIndex(function (it) {
          return it.name === thisCard.name;
        }), 1);
      }
      this.setQuantity();
    },
    isFavorite: function (card) {
      return this.list.some(function (it) {
        return it.name === card.name;
      });
    },
    setQuantity: function () {
      window.domManager.fillTextContent(quantityField, this.list.length);
    },
    list: []
  };
})();
