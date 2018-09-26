'use strict';

(function () {
  window.cartCards = [];

  function delCartItem(indexInCart, indexInCatalog) {
    window.catalogCards[indexInCatalog].amount += window.cartCards[indexInCart].count;
    window.cartCards.splice(indexInCart, 1);
  }

  function increaseCartItem(indexInCart, indexInCatalog) {
    if (window.catalogCards[indexInCatalog].amount > window.cartCards[indexInCart].count) {
      window.cartCards[indexInCart].count += 1;
      window.catalogCards[indexInCatalog].amount -= 1;
    }
  }

  function decreaseCartItem(indexInCart, indexInCatalog) {
    if (window.cartCards[indexInCart].count > 1) {
      window.cartCards[indexInCart].count -= 1;
      window.catalogCards[indexInCatalog].amount += 1;
    } else if (window.cartCards[indexInCart].count === 1) {
      delCartItem(indexInCart, indexInCatalog);
    }
  }

  window.formCartList = function (currentCard) {
    var cardClicked = currentCard.querySelector('.card__title').textContent;

    var cartIndex = window.cartCards.map(function (it) {
      return it.name;
    }).indexOf(cardClicked);

    var catalogIndex = window.catalogCards.map(function (it) {
      return it.name;
    }).indexOf(cardClicked);

    if (cartIndex !== -1) {
      increaseCartItem(cartIndex, catalogIndex);
    } else {
      window.cartCards.push(Object.assign({}, window.catalogCards[catalogIndex], {count: 1}));
      window.catalogCards[catalogIndex].amount -= 1;
    }

    return window.cartCards;
  };

  window.modifyCartList = function (currentCard, mode) {
    var cardClicked = currentCard.querySelector('.card-order__title').textContent;
    var cartIndex = window.cartCards.map(function (it) {
      return it.name;
    }).indexOf(cardClicked);

    var catalogIndex = window.catalogCards.map(function (it) {
      return it.name;
    }).indexOf(cardClicked);

    switch (true) {
      case (mode === 'Del'):
        delCartItem(cartIndex, catalogIndex);
        break;
      case (mode === 'Inc'):
        increaseCartItem(cartIndex, catalogIndex);
        break;
      case (mode === 'Dec'):
        decreaseCartItem(cartIndex, catalogIndex);
        break;
    }

    return window.cartCards;
  };
})();
