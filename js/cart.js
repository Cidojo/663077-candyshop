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

  function addToCart(indexes, cartItems) {
    if (indexes.cart !== -1) {
      increaseCartItem(indexes.cart, indexes.catalog);
    } else if (window.catalogCards[indexes.catalog].amount) {
      cartItems.push(Object.assign({},
          window.catalogCards[indexes.catalog],
          {count: 1},
          {pricePerItem: window.catalogCards[indexes.catalog].price}
      ));
      window.catalogCards[indexes.catalog].amount -= 1;
    }
  }

  window.cart = {
    modify: function (evt, thisCard) {
      if (thisCard.isInCatalog) {

        addToCart(thisCard.indexes, this.items);

        window.domManager.setAmountStyle(evt.currentTarget, window.catalogCards[thisCard.indexes.catalog].amount);

      } else if (thisCard.indexes.catalog !== -1) {

        var targetClassList = evt.target.classList;

        switch (true) {
          case (targetClassList.contains(DELETE_FROM_CART_BUTTON)):
            deleteCartItem(thisCard.indexes.cart, thisCard.indexes.catalog);
            break;
          case (targetClassList.contains(CART_INCREASE_BUTTON)):
            increaseCartItem(thisCard.indexes.cart, thisCard.indexes.catalog);
            break;
          case (targetClassList.contains(CART_DECREASE_BUTTON)):
            decreaseCartItem(thisCard.indexes.cart, thisCard.indexes.catalog);
            break;
        }

        window.domManager.setAmountStyle(thisCard.currentCatalogCardNode, window.catalogCards[thisCard.indexes.catalog].amount);

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
