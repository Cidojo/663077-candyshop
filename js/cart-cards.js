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
      getTotalPrice(indexInCart);
    }
  }

  function decreaseCartItem(indexInCart, indexInCatalog) {
    if (window.cartCards.cartCards[indexInCart].count > 1) {
      window.cartCards.cartCards[indexInCart].count--;
      window.catalogCards[indexInCatalog].amount++;
      getTotalPrice(indexInCart);
    } else if (window.cartCards.cartCards[indexInCart].count === 1) {
      delCartItem(indexInCart, indexInCatalog);
    }
  }

  function getTotalPrice(index) {
    window.cartCards.cartCards[index].price = window.cartCards.cartCards[index].count * window.cartCards.cartCards[index].pricePerItem;
  }

  function getCardIndex(list, _name) {
    return list.map(function (it) {
      return it.name;
    })
    .indexOf(_name);
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
      if (catalog) {
        if (cardIndexes.cartIndex !== -1) {
          increaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
        } else if (window.catalogCards[cardIndexes.catalogIndex].amount) {
          this.cartCards.push(Object.assign({},
              window.catalogCards[cardIndexes.catalogIndex],
              {count: 1},
              {pricePerItem: window.catalogCards[cardIndexes.catalogIndex].price}
          ));
          window.catalogCards[cardIndexes.catalogIndex].amount -= 1;
        }

      } else {
        switch (true) {
          case (evt.target.classList.contains(DELETE_FROM_CART_BUTTON)):
            delCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
          case (evt.target.classList.contains(CART_INCREASE_BUTTON)):
            increaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
          case (evt.target.classList.contains(CART_DECREASE_BUTTON)):
            decreaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
        }
      }

      window.checkCart();
    },
    cartCards: []
  };


})();
