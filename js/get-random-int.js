'use strict';

// возвращает случайное число.
// round - кратность из ряда [5, 10, 50, 100 ...], необязательный параметр.

(function () {
  window.getRandomInt = function (min, max, round) {
    round = round || 1;
    return Math.round(((min + Math.round(Math.random() * (max - min))) / round)) * round;
  };
})();
