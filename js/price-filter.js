'use strict';

(function () {
  var priceHandlerLeft = document.querySelector('.range__btn--left');
  var priceHandlerRight = document.querySelector('.range__btn--right');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  var priceFillLine = document.querySelector('.range__fill-line');
  var handlerWidth = priceHandlerLeft.offsetWidth;
  var handlerHalfWidth = 0.5 * handlerWidth;
  var priceBarLength = document.querySelector('.range__filter').offsetWidth;

  function setHandlerOffset(drag) {
    return Math.round(drag / priceBarLength * 100) + '%';
  }

  function getPriceBarScale() {
    var maxPrice = window.backend.catalogCards ? Math.max.apply(null, window.backend.catalogCards.map(function (current) {
      return current.price;
    })) : 0;
    return maxPrice / priceBarLength;
  }

  window.priceFilter = {
    init: function () {
      var priceBarScale = getPriceBarScale();

      this.reset();

      priceHandlerLeft.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoordsX = evt.clientX;

        function onMouseMove(moveEvt) {
          moveEvt.preventDefault();

          var shiftX = startCoordsX - moveEvt.clientX;

          startCoordsX = moveEvt.clientX;

          var jump = priceHandlerLeft.offsetLeft - shiftX;

          jump = (jump < handlerHalfWidth * (-1)) ? handlerHalfWidth * (-1) : jump;
          jump = (jump > priceHandlerRight.offsetLeft) ? priceHandlerRight.offsetLeft : jump;

          if (jump > priceHandlerRight.offsetLeft - handlerWidth) {
            priceHandlerLeft.setAttribute('style', 'z-index: 2;');
          } else {
            priceHandlerLeft.setAttribute('style', 'z-index: 1;');
          }

          priceHandlerLeft.style.left = setHandlerOffset(jump);
          priceFillLine.style.left = setHandlerOffset(jump + handlerHalfWidth);
          rangePriceMin.textContent = Math.round((jump + handlerHalfWidth) * priceBarScale);
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

          jump = (jump > priceBarLength - handlerHalfWidth) ? priceBarLength - handlerHalfWidth : jump;
          jump = (jump < priceHandlerLeft.offsetLeft) ? priceHandlerLeft.offsetLeft : jump;

          priceHandlerRight.style.left = setHandlerOffset(jump);
          priceFillLine.style.right = setHandlerOffset(priceBarLength - jump - handlerHalfWidth);
          rangePriceMax.textContent = Math.round((jump + handlerHalfWidth) * priceBarScale);
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
    },
    reset: function () {
      priceHandlerRight.style.left = priceBarLength - handlerHalfWidth + 'px';
      priceHandlerLeft.style.left = 0 - handlerHalfWidth + 'px';
      priceFillLine.style.left = 0;
      priceFillLine.style.right = 0;

      rangePriceMin.textContent = Math.round((priceHandlerLeft.offsetLeft + handlerHalfWidth) * getPriceBarScale());
      rangePriceMax.textContent = Math.round((priceHandlerRight.offsetLeft + handlerHalfWidth) * getPriceBarScale());
    }
  };
})();
