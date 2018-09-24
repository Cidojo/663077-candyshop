'use strict';

(function () {
  window.getRandomInt = function (min, max, round) {
    round = round || 1;
    return Math.round(((min + Math.round(Math.random() * (max - min))) / round)) * round;
  };
})();
