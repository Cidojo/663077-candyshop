'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_UPLOAD = 'https://js.dump.academy/candyshop';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var ERR_BAD_CONNECTION = 'Ошибка соединения';

  var successPopup = document.querySelector('.modal--success');
  var errorPopup = document.querySelector('.modal--error');
  var errorMessageElement = errorPopup.querySelector('.modal__message');


  function onErrorCloseBtnClick(evt) {
    if (evt.target.classList.contains('modal__close') || evt.target.classList.contains('modal--error')) {
      errorPopup.classList.add('modal--hidden');
      errorPopup.removeEventListener('click', onErrorCloseBtnClick);
      document.removeEventListener('keydown', onErrorKeyPress);
    }
  }


  function onSuccessCloseBtnClick(evt) {
    if (evt.target.classList.contains('modal__close') || evt.target.classList.contains('modal--success')) {
      successPopup.classList.add('modal--hidden');
      successPopup.removeEventListener('click', onSuccessCloseBtnClick);
      document.removeEventListener('keydown', onSuccessKeyPress);
    }
  }


  function onErrorKeyPress(evt) {
    if (window.util.onKeyDownEvent(evt.keyCode, 'ESC')) {
      errorPopup.classList.add('modal--hidden');
      errorPopup.removeEventListener('click', onErrorCloseBtnClick);
      document.removeEventListener('keydown', onErrorKeyPress);
    }
  }


  function onSuccessKeyPress(evt) {
    if (window.util.onKeyDownEvent(evt.keyCode, 'ESC')) {
      successPopup.classList.add('modal--hidden');
      successPopup.removeEventListener('click', onSuccessCloseBtnClick);
      document.removeEventListener('keydown', onSuccessKeyPress);
    }
  }


  function onError(status) {
    window.domManager.setElementText(errorMessageElement, status);
    errorPopup.classList.remove('modal--hidden');

    document.addEventListener('keydown', onErrorKeyPress);
    errorPopup.addEventListener('click', onErrorCloseBtnClick);
  }


  function onUploadSuccess() {
    successPopup.classList.remove('modal--hidden');
    document.addEventListener('keydown', onSuccessKeyPress);
    successPopup.addEventListener('click', onSuccessCloseBtnClick);

    window.inputManager.resetFormNodes();
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
      onError('Время ожидания истекло!');
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
