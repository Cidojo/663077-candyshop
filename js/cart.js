'use strict';

(function () {
  var CART_DELETE_BUTTON = 'card-order__close';
  var CART_INCREASE_BUTTON = 'card-order__btn--increase';
  var CART_DECREASE_BUTTON = 'card-order__btn--decrease';

  var emptyCartHeaderElement = document.querySelector('.main-header__basket');
  var emptyCartBottomElement = document.querySelector('.goods__card-empty');


  function deleteCartItem(cartIndex, catalogIndex) {
    window.backend.catalogCards[catalogIndex].amount += window.cart.items[cartIndex].count;
    window.cart.items.splice(cartIndex, 1);
  }


  function increaseCartItem(cartIndex, catalogIndex) {
    if (window.backend.catalogCards[catalogIndex].amount > 0) {
      window.cart.items[cartIndex].count++;
      window.backend.catalogCards[catalogIndex].amount--;
      updateTotalPrice(cartIndex);
    }
  }


  function decreaseCartItem(cartIndex, catalogIndex) {
    if (window.cart.items[cartIndex].count > 1) {
      window.cart.items[cartIndex].count--;
      window.backend.catalogCards[catalogIndex].amount++;
      updateTotalPrice(cartIndex);
    } else if (window.cart.items[cartIndex].count === 1) {
      deleteCartItem(cartIndex, catalogIndex);
    }
  }


  function updateTotalPrice(index) {
    window.cart.items[index].price = window.cart.items[index].count * window.cart.items[index].pricePerItem;
  }


  function toggleCartVisibility(_toggle) {
    var message = !_toggle ? 'В корзине ничего нет' :
      'В корзине ' + window.cart.items.length + ' ' + window.util.getStringEnding(['товар', 'товара', 'товаров'], window.cart.items.length) + ' на сумму ' +
          window.cart.items.reduce(function (sum, current) {
            return sum + current.price;
          }, 0) + ' ' + window.util.getStringEnding(['рубль', 'рубля', 'рублей']) + '.';

    emptyCartBottomElement.classList.toggle('visually-hidden', _toggle);
    window.domManager.setElementText(emptyCartHeaderElement, message);
  }


  function addToCart(indexes, cartItems) {
    if (indexes.cart !== -1) {
      increaseCartItem(indexes.cart, indexes.catalog);
    } else if (window.backend.catalogCards[indexes.catalog].amount) {
      cartItems.push(Object.assign({},
          window.backend.catalogCards[indexes.catalog],
          {count: 1},
          {pricePerItem: window.backend.catalogCards[indexes.catalog].price}
      ));
      window.backend.catalogCards[indexes.catalog].amount -= 1;
    }
  }


  window.cart = {
    modify: function (evt, thisCard) {
      if (thisCard.isInCatalog) {

        addToCart(thisCard.indexes, this.items);

        window.domManager.setAmountStyle(evt.currentTarget, window.backend.catalogCards[thisCard.indexes.catalog].amount);

      } else if (thisCard.indexes.catalog !== -1) {

        var targetClassList = evt.target.classList;

        switch (true) {
          case (targetClassList.contains(CART_DELETE_BUTTON)):
            deleteCartItem(thisCard.indexes.cart, thisCard.indexes.catalog);
            break;
          case (targetClassList.contains(CART_INCREASE_BUTTON)):
            increaseCartItem(thisCard.indexes.cart, thisCard.indexes.catalog);
            break;
          case (targetClassList.contains(CART_DECREASE_BUTTON)):
            decreaseCartItem(thisCard.indexes.cart, thisCard.indexes.catalog);
            break;
        }

        window.domManager.setAmountStyle(thisCard.currentCatalogCardNode, window.backend.catalogCards[thisCard.indexes.catalog].amount);
      }

      window.filter.getInStockQuantity();

      window.render.cart();
      this.check();
    },
    check: function () {
      var toggle = !!this.items.length;
      window.inputManager.disableInputToggle();
      toggleCartVisibility(toggle);
    },
    items: []
  };
})();
