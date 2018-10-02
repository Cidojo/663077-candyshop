'use strict';

(function () {
  var stringEndingCases = [2, 0, 1, 1, 1, 2];

  window.util = {
    getLuhnValidation: function getLuhnValidation(string) {
      var sum = 0;
      string.split('').forEach(function (elem, index) {
        elem = Number(elem);

        if (index + 1 % 2 !== 0) {
          elem *= 2;
          if (elem >= 10) {
            elem -= 9;
          }
        }

        sum += elem;
      });

      return sum % 10 === 0;
    },
    getStringEnding: function (titles, number) {
      number = Math.abs(number); // возвращает абсолютное значение переданного числа
      return titles[ // возвращает слово из переданного массива по вычисляемому индексу
          (number % 100 > 4 && number % 100 < 20) ? // проверяет если последние две цифры числа находятся в диапазоне (4, 20)
            2 : stringEndingCases[(number % 10 < 5) ? // если предыдущая проверка true вернет число индекс 2, если false возвращает индекс из массива cases под вычисляемым индексом. Вычисляет проверкой: проверяет принадлежит ли последняя цифра диапазону [0, 5)
              number % 10 : 5]]; // если предыдущая проверка true вернет число из массива cases под индексом равным значению последней цифры или 0, если false вернет индекс 5
    }
  };
})();
