'use strict';

(function () {
  var DELETE_FROM_CART_BUTTON = 'card-order__close';
  var CART_INCREASE_BUTTON = 'card-order__btn--increase';
  var CART_DECREASE_BUTTON = 'card-order__btn--decrease';

  function delCartItem(indexInCart, indexInCatalog) {
    window.catalogCards[indexInCatalog].amount += window.cartCards.cartCards[indexInCart].count;
    window.cartCards.cartCards.splice(indexInCart, 1);
  }

  function increaseCartItem(indexInCart, indexInCatalog) {
    if (window.catalogCards[indexInCatalog].amount > window.cartCards.cartCards[indexInCart].count) {
      window.cartCards.cartCards[indexInCart].count++;
      window.catalogCards[indexInCatalog].amount--;
      updateTotalPrice(indexInCart);
    }
  }

  function decreaseCartItem(indexInCart, indexInCatalog) {
    if (window.cartCards.cartCards[indexInCart].count > 1) {
      window.cartCards.cartCards[indexInCart].count--;
      window.catalogCards[indexInCatalog].amount++;
      updateTotalPrice(indexInCart);
    } else if (window.cartCards.cartCards[indexInCart].count === 1) {
      delCartItem(indexInCart, indexInCatalog);
    }
  }

  function updateTotalPrice(index) {
    window.cartCards.cartCards[index].price = window.cartCards.cartCards[index].count * window.cartCards.cartCards[index].pricePerItem;
  }

  function getCardIndex(list, _name) {
    return list.findIndex(function (it) {
      return it.name === _name;
    });
  }

  function getCardsIndexes(name) {
    var cartIndex = getCardIndex(window.cartCards.cartCards, name);

    var catalogIndex = getCardIndex(window.catalogCards, name);

    return {
      cartIndex: cartIndex,
      catalogIndex: catalogIndex
    };
  }

  window.cartCards = {
    modifyCartCards: function (evt) {
      var catalog = evt.currentTarget.querySelector('.card__title');
      var cart = evt.currentTarget.querySelector('.card-order__title');

      var cardClicked = catalog || cart;

      var cardIndexes = getCardsIndexes(cardClicked.textContent);
      if (catalog && cardIndexes.cartIndex !== -1) {
        increaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
      } else if (catalog && window.catalogCards[cardIndexes.catalogIndex].amount) {
        this.cartCards.push(Object.assign({},
            window.catalogCards[cardIndexes.catalogIndex],
            {count: 1},
            {pricePerItem: window.catalogCards[cardIndexes.catalogIndex].price}
        ));
        window.catalogCards[cardIndexes.catalogIndex].amount -= 1;
      } else if (cardIndexes.catalogIndex !== -1) {
        var targetClassList = evt.target.classList;
        switch (true) {
          case (targetClassList.contains(DELETE_FROM_CART_BUTTON)):
            delCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
          case (targetClassList.contains(CART_INCREASE_BUTTON)):
            increaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
          case (targetClassList.contains(CART_DECREASE_BUTTON)):
            decreaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
        }
      }

      window.checkCart();
    },
    cartCards: []
  };


})();
