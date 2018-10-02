'use strict';

(function () {
  window.initPriceFilter = function () {
    var maxPrice = window.catalogCards ? Math.max.apply(null, window.catalogCards.map(function (current) {
      return current.price;
    })) : 0;
    var priceBarLength = document.querySelector('.range__filter').offsetWidth;
    var priceBarScale = maxPrice / priceBarLength;
    var priceHandlerLeft = document.querySelector('.range__btn--left');
    var priceHandlerRight = document.querySelector('.range__btn--right');
    var rangePriceMin = document.querySelector('.range__price--min');
    var rangePriceMax = document.querySelector('.range__price--max');
    var priceFillLine = document.querySelector('.range__fill-line');
    var handlerWidth = priceHandlerLeft.offsetWidth;

    function setHandlerOffset(drag) {
      return Math.round(drag / priceBarLength * 100) + '%';
    }

    priceHandlerLeft.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoordsX = evt.clientX;

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shiftX = startCoordsX - moveEvt.clientX;

        startCoordsX = moveEvt.clientX;
        // debugger

        var jump = priceHandlerLeft.offsetLeft - shiftX;

        jump = (jump < 0) ? 0 : jump;
        jump = (jump > priceHandlerRight.offsetLeft) ? priceHandlerRight.offsetLeft : jump;

        if (jump > priceHandlerRight.offsetLeft - handlerWidth) {
          priceHandlerLeft.setAttribute('style', 'z-index: 2;');
        } else {
          priceHandlerLeft.setAttribute('style', 'z-index: 1;');
        }

        priceHandlerLeft.style.left = setHandlerOffset(jump);
        priceFillLine.style.left = setHandlerOffset(jump);
        rangePriceMin.textContent = Math.round(jump * priceBarScale);
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

        jump = (jump > priceBarLength) ? priceBarLength : jump;
        jump = (jump < priceHandlerLeft.offsetLeft) ? priceHandlerLeft.offsetLeft : jump;

        priceHandlerRight.style.left = setHandlerOffset(jump);
        priceFillLine.style.right = setHandlerOffset(priceBarLength - jump - handlerWidth / 2);
        rangePriceMax.textContent = Math.round(jump * priceBarScale);
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

    rangePriceMin.textContent = Math.round(priceHandlerLeft.offsetLeft * priceBarScale);
    rangePriceMax.textContent = Math.round(priceHandlerRight.offsetLeft * priceBarScale);
  };
})();
