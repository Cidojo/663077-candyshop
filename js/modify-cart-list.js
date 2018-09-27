'use strict';

(function () {
  var DELETE_FROM_CART_BUTTON = 'card-order__close';
  var CART_INCREASE_BUTTON = 'card-order__btn--increase';
  var CART_DECREASE_BUTTON = 'card-order__btn--decrease';

  function delCartItem(indexInCart, indexInCatalog) {
    window.catalogCards[indexInCatalog].amount += window.cartCards[indexInCart].count;
    window.cartCards.splice(indexInCart, 1);
  }

  function increaseCartItem(indexInCart, indexInCatalog) {
    if (window.catalogCards[indexInCatalog].amount > window.cartCards[indexInCart].count) {
      window.cartCards[indexInCart].count += 1;
      window.catalogCards[indexInCatalog].amount -= 1;
      window.cartCards[indexInCart].price = window.cartCards[indexInCart].count * window.cartCards[indexInCart].pricePerItem;
    }
  }

  function decreaseCartItem(indexInCart, indexInCatalog) {
    if (window.cartCards[indexInCart].count > 1) {
      window.cartCards[indexInCart].count -= 1;
      window.catalogCards[indexInCatalog].amount += 1;
      window.cartCards[indexInCart].price = window.cartCards[indexInCart].count * window.cartCards[indexInCart].pricePerItem;
    } else if (window.cartCards[indexInCart].count === 1) {
      delCartItem(indexInCart, indexInCatalog);
    }
  }

  function getCardsIndexes(cardClicked) {
    var cartIndex = window.cartCards
        .map(function (it) {
          return it.name;
        })
        .indexOf(cardClicked);

    var catalogIndex = window.catalogCards
        .map(function (it) {
          return it.name;
        })
        .indexOf(cardClicked);

    return {
      cartIndex: cartIndex,
      catalogIndex: catalogIndex
    };
  }

  window.modifyCartList = function (evt) {
    var catalog = evt.currentTarget.querySelector('.card__title');
    var cart = evt.currentTarget.querySelector('.card-order__title');

    var cardClicked = catalog || cart;

    var cardIndexes = getCardsIndexes(cardClicked.textContent);
    if (catalog) {
      if (cardIndexes.cartIndex !== -1) {
        increaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
      } else {
        window.cartCards.push(Object.assign({},
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
    return window.cartCards;
  };

  window.cartCards = [];

})();
