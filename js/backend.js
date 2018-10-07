'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_UPLOAD = 'https://js.dump.academy/candyshop';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var ERR_BAD_CONNECTION = 'Ошибка соединения';

  var successPopup = document.querySelector('.modal--success');
  // var successPopupClose = successPopup.querySelector('.modal__close');

  var errorPopup = document.querySelector('.modal--error');
  // var errorPopupClose = errorPopup.querySelector('.modal__close');
  var errorMessageNode = errorPopup.querySelector('.modal__message');

  var ESC_KEYCODE = 27;
  // var ENTER_KEYCODE = 13;

  function setPopupCloseEvent(evt) {
    errorPopup.classList.toggle('modal--hidden', evt.target.classList.contains('modal__close'));
    evt.currentTarget.removeEventListener('click', setPopupCloseEvent);
    document.removeEventListener('keydown', onEscButtonPress);
  }


  function onEscButtonPress(evt) {
    errorPopup.classList.toggle('modal--hidden', evt.keyCode === ESC_KEYCODE);
  }

  function errorHandler(status) {

    window.domManager.fillTextContent(errorMessageNode, status);
    errorPopup.classList.remove('modal--hidden');
    document.addEventListener('keydown', onEscButtonPress);
    errorPopup.addEventListener('click', setPopupCloseEvent);
  }


  function successUploadHandler() {
    successPopup.classList.remove('modal--hidden');
    successPopup.addEventListener('click', setPopupCloseEvent);

    window.inputManager.resetFormNodes();
  }


  function successLoadHandler(loadData) {
    window.catalogCards = loadData;
    window.filteredCards = window.catalogCards.slice(0);
    window.initFilter();
    window.cart.checkCart();
    window.renderCards.renderCatalog();
    window.initPriceFilter();
  }


  function setXhrERequest(request, onSuccess) {
    request.responseType = 'json';

    request.addEventListener('load', function () {
      if (request.status === STATUS_OK) {
        onSuccess(request.response);
      } else {
        errorHandler('Код ошибки: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      errorHandler(ERR_BAD_CONNECTION);
    });
    request.addEventListener('timeout', function () {
      errorHandler('Время ожидания истекло!');
    });

    request.timeout = TIMEOUT;
  }

  window.backend = {
    load: function () {
      var xhr = new XMLHttpRequest();
      setXhrERequest(xhr, successLoadHandler);

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    upload: function (data) {
      var xhr = new XMLHttpRequest();
      setXhrERequest(xhr, successUploadHandler);

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };

  window.backend.load();

})();
