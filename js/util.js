'use strict';

(function () {
  var stringEndingCases = [2, 0, 1, 1, 1, 2];

  var KEYS = {
    'ESC': 27
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;


  window.util = {
    getLuhnValidation: function getLuhnValidation(string) {
      var sum = 0;
      string.split('').forEach(function (element, index) {
        element = Number(element);

        if (index % 2 === 0) {
          element *= 2;
          if (element > 9) {
            element -= 9;
          }
        }

        sum += element;
      });

      return sum % 10 === 0;
    },
    getStringEnding: function (titles, number) {
      number = Math.abs(number);
      return titles[
          (number % 100 > 4 && number % 100 < 20) ?
            2 : stringEndingCases[(number % 10 < 5) ?
              number % 10 : 5]];
    },
    getCardIndex: function (list, _name) {
      return list.findIndex(function (it) {
        return it.name === _name;
      });
    },
    testKeyPressed: function (key, flag) {
      switch (flag) {
        case 'ESC':
          return key === KEYS[flag];
      }
      return false;
    },
    debounce: function (action, abort) {
      if (lastTimeout && abort) {
        window.clearTimeout(lastTimeout);
        return action;
      }
      return function () {
        var actionArguments = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          action.apply(null, actionArguments);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
