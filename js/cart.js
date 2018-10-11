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


  function toggleCartVisibility(flag) {
    var message = !flag ? 'В корзине ничего нет' :
      'В корзине ' + window.cart.items.length + ' ' + window.util.getStringEnding(['товар', 'товара', 'товаров'], window.cart.items.length) + ' на сумму ' +
          window.cart.items.reduce(function (sum, current) {
            return sum + current.price;
          }, 0) + ' ' + window.util.getStringEnding(['рубль', 'рубля', 'рублей']) + '.';

    emptyCartBottomElement.classList.toggle('visually-hidden', flag);
    window.domManager.setElementText(emptyCartHeaderElement, message);
  }


  function addToCart(indexCollection, cartItems) {
    if (indexCollection.cart !== -1) {
      increaseCartItem(indexCollection.cart, indexCollection.catalog);
    } else if (window.backend.catalogCards[indexCollection.catalog].amount) {
      cartItems.push(Object.assign({},
          window.backend.catalogCards[indexCollection.catalog],
          {count: 1},
          {pricePerItem: window.backend.catalogCards[indexCollection.catalog].price}
      ));
      window.backend.catalogCards[indexCollection.catalog].amount -= 1;
    }
  }


  window.cart = {
    modify: function (evt, _cardClicked) {
      if (_cardClicked.isInCatalog) {

        addToCart(_cardClicked.index, this.items);

        window.domManager.setAmountStyle(evt.currentTarget, window.backend.catalogCards[_cardClicked.index.catalog].amount);

      } else if (_cardClicked.index.catalog !== -1) {

        var targetClassList = evt.target.classList;

        switch (true) {
          case (targetClassList.contains(CART_DELETE_BUTTON)):
            deleteCartItem(_cardClicked.index.cart, _cardClicked.index.catalog);
            break;
          case (targetClassList.contains(CART_INCREASE_BUTTON)):
            increaseCartItem(_cardClicked.index.cart, _cardClicked.index.catalog);
            break;
          case (targetClassList.contains(CART_DECREASE_BUTTON)):
            decreaseCartItem(_cardClicked.index.cart, _cardClicked.index.catalog);
            break;
        }

        window.domManager.setAmountStyle(_cardClicked.currentCatalogCardNode, window.backend.catalogCards[_cardClicked.index.catalog].amount);
      }

      window.filter.getInStockQuantity();

      window.render.cart();
      this.check();
    },
    check: function () {
      window.inputManager.disableToggle();
      toggleCartVisibility(!!this.items.length);
    },
    clear: function () {
      if (this.items.length) {
        var catalogIndex = window.backend.catalogCards.findIndex(function (it) {
          return window.cart.items[0].name === it.name;
        });

        deleteCartItem(0, catalogIndex);

        this.clear();
      } else {
        return;
      }

      window.render.cart();
      this.check();
    },
    items: []
  };
})();
