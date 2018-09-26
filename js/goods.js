'use strict';

// -------------------------------------------------
// 1. DATA - ИСХОДНЫЕ ДАННЫЕ
// -------------------------------------------------

// @@@DATA Раздел 3.2

// @@@DATA Раздел 4.1

// -------------------------------------------------
// 2. NODES - НОДЫ
// -------------------------------------------------

// -------------------------------------------------
// 3. FUNC - ФУНКЦИИ И МЕТОДЫ
// -------------------------------------------------

// @@@FUNC Раздел 3.1

// возвращает случайное число из интервала, {round} - кратность окончания полученного числа из ряда [5, 10, 50, 100 ...]

// создает объект - карточку товара

// возвращает массив объектов - карточек товаров

// @@@FUNC Раздел 3.2

// изменяет окончание в зависимости от количества

// заполняет свойство textContent у DOM/fragment элемента

// заполняет свойтво src у DOM/fragment элемента

// конструктор? для создания объекта с установленными методами

// формирует новый fragment в документе, соответствующий карточке товара

// вставляет fragment - лист заданного количества карточек в DOM дерево

// @@@FUNC Раздел 4.1

// удаляет всех потомков DOM элемента, кроме первого

// проверяет, есть ли переданный элемент в переданном списке --- используется для добавления товара в корзину

// изменяет массив, соответствующий состоянию корзины по щелчку по карточке

// алгоритм обработчика событий по клику на карточку каталога

// алгоритм обработчика событий по клику на карточку каталога

// выбор доставки

// проверка товаров в корзине

// -------------------------------------------------
// 4. EVT - ОБРАБОТЧИКИ СОБЫТИЙ
// -------------------------------------------------

// -------------------------------------------------
// 5. INIT - ИСПОЛНЕНИЕ
// -------------------------------------------------

// @@@INIT Раздел 3.1

// @@@INIT Раздел 3.2

// @@@INIT Раздел 4.2

// ЕЩЕ НЕ РЕФАКТОРИЛ, НАПИСАНО КАК ЕСТЬ
//  | | | | | | | | | | | | | | | | | |
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

//  price filters

var priceHandlerLeft = document.querySelector('.range__btn--left');
var priceHandlerRight = document.querySelector('.range__btn--right');
var priceFillLine = document.querySelector('.range__fill-line');
var rangePriceMin = document.querySelector('.range__price--min');
var rangePriceMax = document.querySelector('.range__price--max');

function getCurrentHandlerX(handler) {
  return handler.offsetLeft;
}

priceHandlerLeft.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;

    startCoordsX = moveEvt.clientX;

    var jump = (priceHandlerLeft.offsetLeft - shiftX);

    jump = (jump < 0) ? 0 : jump;
    jump = (jump > getCurrentHandlerX(priceHandlerRight)) ? getCurrentHandlerX(priceHandlerRight) : jump;

    priceHandlerLeft.style.left = jump + 'px';
    priceFillLine.style.left = priceHandlerLeft.offsetWidth + jump + 'px';
    rangePriceMin.textContent = jump;
  }

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

priceHandlerRight.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;

    startCoordsX = moveEvt.clientX;

    var jump = (priceHandlerRight.offsetLeft - shiftX);
    var max = document.querySelector('.range__filter').offsetWidth;

    jump = (jump > max) ? max : jump;
    jump = (jump < getCurrentHandlerX(priceHandlerLeft)) ? getCurrentHandlerX(priceHandlerLeft) : jump;

    priceHandlerRight.style.left = jump + 'px';
    priceFillLine.style.right = max - jump + 'px';
    rangePriceMax.textContent = jump;
  }

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
