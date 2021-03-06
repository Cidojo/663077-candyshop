'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_UPLOAD = 'https://js.dump.academy/candyshop';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var ERR_BAD_CONNECTION = 'Ошибка соединения';
  var ERR_TIMEOUT = 'Время ожидания истекло!';

  var successPopupBlock = document.querySelector('.modal--success');
  var errorPopupBlock = document.querySelector('.modal--error');
  var errorMessageElement = errorPopupBlock.querySelector('.modal__message');

  function onErrorCloseQuery(evt) {
    if (evt.target.classList.contains('modal__close') || evt.target.classList.contains('modal--error') || window.util.testKeyPressed(evt.keyCode, 'ESC')) {
      errorPopupBlock.classList.add('modal--hidden');
      errorPopupBlock.removeEventListener('click', onErrorCloseQuery);
      document.removeEventListener('keydown', onErrorCloseQuery);
    }
  }

  function onSuccessCloseQuery(evt) {
    if (evt.target.classList.contains('modal__close') || evt.target.classList.contains('modal--success') || window.util.testKeyPressed(evt.keyCode, 'ESC')) {
      successPopupBlock.classList.add('modal--hidden');
      successPopupBlock.removeEventListener('click', onSuccessCloseQuery);
      document.removeEventListener('keydown', onSuccessCloseQuery);
    }
  }


  function onError(status) {
    window.domManager.setElementText(errorMessageElement, status);
    errorPopupBlock.classList.remove('modal--hidden');

    document.addEventListener('keydown', onErrorCloseQuery);
    errorPopupBlock.addEventListener('click', onErrorCloseQuery);
  }


  function onUploadSuccess() {
    successPopupBlock.classList.remove('modal--hidden');
    document.addEventListener('keydown', onSuccessCloseQuery);
    successPopupBlock.addEventListener('click', onSuccessCloseQuery);

    window.inputManager.resetFormNodes();
    window.cart.clear();
    window.filter.init();
  }


  function onLoadSuccess(loadData) {
    window.backend.catalogCards = loadData;
    window.filter.init();
    window.priceFilter.init();
    window.cart.check();
    window.render.catalog();
  }


  function setXhrRequest(request, onSuccess) {
    request.responseType = 'json';

    request.addEventListener('load', function () {
      if (request.status === STATUS_OK) {
        onSuccess(request.response);
      } else {
        onError('Код ошибки: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      onError(ERR_BAD_CONNECTION);
    });
    request.addEventListener('timeout', function () {
      onError(ERR_TIMEOUT);
    });

    request.timeout = TIMEOUT;
  }


  window.backend = {
    load: function () {
      var xhr = new XMLHttpRequest();
      setXhrRequest(xhr, onLoadSuccess);

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    upload: function (data) {
      var xhr = new XMLHttpRequest();
      setXhrRequest(xhr, onUploadSuccess);

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    catalogCards: []
  };


  window.backend.load();
})();
