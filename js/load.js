'use strict';

(function () {
  var URL = 'https://js.dump.academy/candyshop/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var ERR_BAD_CONNECTION = 'Ошибка соединения';

  var errorPopup = document.querySelector('.modal--error');
  var errorPopupClose = errorPopup.querySelector('.modal__close');
  var message = errorPopup.querySelector('.modal__message');

  function successHandler(loadData) {
    window.catalogCards = loadData;
    window.filteredList = window.catalogCards.slice(0);
    window.cart.checkCart();
    window.renderCards.renderCatalog();
    window.initPriceFilter();
  }


  function onClickCloseError(evt) {
    errorPopup.classList.add('modal--hidden');
    evt.target.removeEventListener('click', onClickCloseError);
  }

  function errorHandler(status) {

    window.domManager.fillTextContent(message, status);
    errorPopup.classList.remove('modal--hidden');
    errorPopupClose.addEventListener('click', onClickCloseError);
  }

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERR_BAD_CONNECTION);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load(successHandler, errorHandler);
})();
