'use strict';

(function () {
  var DELETE_FROM_CART_BUTTON = 'card-order__close';
  var CART_INCREASE_BUTTON = 'card-order__btn--increase';
  var CART_DECREASE_BUTTON = 'card-order__btn--decrease';

  function deleteCartItem(indexInCart, indexInCatalog) {
    window.catalogCards[indexInCatalog].amount += window.cart.items[indexInCart].count;
    window.cart.items.splice(indexInCart, 1);
  }

  function increaseCartItem(indexInCart, indexInCatalog) {
    if (window.catalogCards[indexInCatalog].amount > 0) {
      window.cart.items[indexInCart].count++;
      window.catalogCards[indexInCatalog].amount--;
      updateTotalPrice(indexInCart);
    }
  }

  function decreaseCartItem(indexInCart, indexInCatalog) {
    if (window.cart.items[indexInCart].count > 1) {
      window.cart.items[indexInCart].count--;
      window.catalogCards[indexInCatalog].amount++;
      updateTotalPrice(indexInCart);
    } else if (window.cart.items[indexInCart].count === 1) {
      deleteCartItem(indexInCart, indexInCatalog);
    }
  }

  function updateTotalPrice(index) {
    window.cart.items[index].price = window.cart.items[index].count * window.cart.items[index].pricePerItem;
  }

  function getCardIndex(list, _name) {
    return list.findIndex(function (it) {
      return it.name === _name;
    });
  }

  function getCardsIndexes(name) {
    var cartIndex = getCardIndex(window.cart.items, name);

    var catalogIndex = getCardIndex(window.catalogCards, name);

    return {
      cartIndex: cartIndex,
      catalogIndex: catalogIndex
    };
  }

  var emptyCartHeader = document.querySelector('.main-header__basket');
  var emptyCartBottom = document.querySelector('.goods__card-empty');

  function toggleCartVisibility(_toggle) {
    var message = !_toggle ? 'В корзине ничего нет' :
      'В корзине ' + window.cart.items.length + ' ' + window.util.getStringEnding(['товар', 'товара', 'товаров'], window.cart.items.length) + ' на сумму ' +
          window.cart.items.reduce(function (sum, current) {
            return sum + current.price;
          }, 0) + ' ' + window.util.getStringEnding(['рубль', 'рубля', 'рублей']) + '.';

    emptyCartBottom.classList.toggle('visually-hidden', _toggle);
    window.domManager.fillTextContent(emptyCartHeader, message);
  }

  function addToCart(indexesObj, cartItems) {
    if (indexesObj.cartIndex !== -1) {
      increaseCartItem(indexesObj.cartIndex, indexesObj.catalogIndex);
    } else if (window.catalogCards[indexesObj.catalogIndex].amount) {
      cartItems.push(Object.assign({},
          window.catalogCards[indexesObj.catalogIndex],
          {count: 1},
          {pricePerItem: window.catalogCards[indexesObj.catalogIndex].price}
      ));
      window.catalogCards[indexesObj.catalogIndex].amount -= 1;
    }
  }

  function findCardInDom(cardTitle) {
    var renderedCatalog = document.querySelectorAll('.catalog__card');
    var indexFound = Array.from(renderedCatalog).findIndex(function (it) {
      return it.querySelector('h3').textContent === cardTitle;
    });
    return renderedCatalog[indexFound];
  }

  window.cart = {
    modify: function (evt) {
      var catalog = evt.currentTarget.querySelector('.card__title');
      var cart = evt.currentTarget.querySelector('.card-order__title');
      var cardClicked = catalog || cart;
      var cardIndexes = getCardsIndexes(cardClicked.textContent);


      if (catalog) {
        addToCart(cardIndexes, this.items);
        window.domManager.fillAmount(evt.currentTarget, window.catalogCards[cardIndexes.catalogIndex].amount);
      } else if (cardIndexes.catalogIndex !== -1) {
        var targetClassList = evt.target.classList;
        switch (true) {
          case (targetClassList.contains(DELETE_FROM_CART_BUTTON)):
            deleteCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
          case (targetClassList.contains(CART_INCREASE_BUTTON)):
            increaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
          case (targetClassList.contains(CART_DECREASE_BUTTON)):
            decreaseCartItem(cardIndexes.cartIndex, cardIndexes.catalogIndex);
            break;
        }
        window.domManager.fillAmount(findCardInDom(cardClicked.textContent), window.catalogCards[cardIndexes.catalogIndex].amount);
      }
      window.renderCards.renderCart();
      this.checkCart();
    },
    checkCart: function () {
      var toggle = this.items.length ? true : false;
      window.inputManager.disableInputToggle();
      toggleCartVisibility(toggle);
    },
    items: []
  };

})();
