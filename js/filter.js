'use strict';

(function () {
  window.catalogSorted = [];

  window.catalogIcecream = [];
  window.catalogSoda = [];
  window.catalogGum = [];
  window.catalogMarmalade = [];

  window.sortByKind = function (list, kind) {
    var listSorted = [];
// debugger
    list.map(function (elem) {
      return elem.kind;
    })
    .filter(function (mappedKind, foundIndex) {
      return mappedKind === kind;
    })
    .forEach(function (elem, i) {
      listSorted.push(list[elem]);
    });

    return listSorted;
  };

  // window.catalogIcecream = window.sortByKind(window.catalogCards, 'Мороженное');
  // window.catalogSoda = window.sortByKind(window.catalogCards, 'Газировка');
  // window.catalogGum = window.sortByKind(window.catalogCards, 'Жевательная резинка');
  // window.catalogMarmalade = window.sortByKind(window.catalogCards, 'Мармелад');
  // window.catalogMarshmallows = window.sortByKind(window.catalogCards, 'Зефир');
})();
