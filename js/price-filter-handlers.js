'use strict';

(function () {
  var priceHandlerLeft = document.querySelector('.range__btn--left');
  var priceHandlerRight = document.querySelector('.range__btn--right');
  var priceFillLine = document.querySelector('.range__fill-line');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  var barLength = document.querySelector('.range__filter').offsetWidth;

  var max = window.catalogCards
    .map(function (current) {
      return current.price;
    })
    .sort(function (a, b) {
      return a < b;
    })[0];

  var scale = max / barLength;

  priceHandlerLeft.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;

      var jump = priceHandlerLeft.offsetLeft - shiftX;

      jump = (jump < 0) ? 0 : jump;
      jump = (jump > priceHandlerRight.offsetLeft) ? priceHandlerRight.offsetLeft : jump;

      priceHandlerLeft.style.left = jump + 'px';
      priceFillLine.style.left = priceHandlerLeft.offsetWidth / 2 + jump + 'px';
      rangePriceMin.textContent = Math.round(jump * scale);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);

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

      var jump = priceHandlerRight.offsetLeft - shiftX;

      jump = (jump > barLength) ? barLength : jump;
      jump = (jump < priceHandlerLeft.offsetLeft) ? priceHandlerLeft.offsetLeft : jump;

      priceHandlerRight.style.left = jump + 'px';
      priceFillLine.style.right = barLength - jump - priceHandlerRight.offsetWidth / 2 + 'px';
      rangePriceMax.textContent = Math.round(jump * scale);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  rangePriceMin.textContent = Math.round((priceHandlerLeft.offsetLeft - priceHandlerLeft.offsetWidth / 2) * scale);
  rangePriceMax.textContent = Math.round((priceHandlerRight.offsetLeft - priceHandlerRight.offsetWidth / 2) * scale);
})();