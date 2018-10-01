'use strict';

(function () {
  var URL = 'https://js.dump.academy/candyshop/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var ERR_BAD_CONNECTION = 'Произошла ошибка соединения';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
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
})();
