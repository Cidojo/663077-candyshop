'use strict';

(function () {
  var priceHandlerLeft = document.querySelector('.range__btn--left');
  var priceHandlerRight = document.querySelector('.range__btn--right');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  var priceFillLine = document.querySelector('.range__fill-line');
  var handlerWidth = priceHandlerLeft.offsetWidth;
  var priceBarLength = document.querySelector('.range__filter').offsetWidth;
  var startAtHalfCorrection = handlerWidth / 2;

  function setHandlerOffset(drag) {
    return Math.round(drag / priceBarLength * 100) + '%';
  }


  window.priceFilter = {
    init: function () {
      var priceBarScale = this.getPriceBarScale();

      this.reset();

      priceHandlerLeft.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoordsX = evt.clientX;

        function onMouseMove(moveEvt) {
          moveEvt.preventDefault();

          var shiftX = startCoordsX - moveEvt.clientX;

          startCoordsX = moveEvt.clientX;

          var jump = priceHandlerLeft.offsetLeft - shiftX;

          jump = (jump < 0 - startAtHalfCorrection) ? 0 - startAtHalfCorrection : jump;
          jump = (jump > priceHandlerRight.offsetLeft) ? priceHandlerRight.offsetLeft : jump;

          if (jump > priceHandlerRight.offsetLeft - handlerWidth * 2) {
            priceHandlerLeft.setAttribute('style', 'z-index: 2;');
          } else {
            priceHandlerLeft.setAttribute('style', 'z-index: 1;');
          }

          priceHandlerLeft.style.left = setHandlerOffset(jump);
          priceFillLine.style.left = setHandlerOffset(jump + handlerWidth / 2);
          rangePriceMin.textContent = Math.round((jump + startAtHalfCorrection) * priceBarScale);
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

          jump = (jump > priceBarLength - startAtHalfCorrection) ? priceBarLength - startAtHalfCorrection : jump;
          jump = (jump < priceHandlerLeft.offsetLeft) ? priceHandlerLeft.offsetLeft : jump;

          priceHandlerRight.style.left = setHandlerOffset(jump);
          priceFillLine.style.right = setHandlerOffset(priceBarLength - jump - handlerWidth / 2);
          rangePriceMax.textContent = Math.round((jump + startAtHalfCorrection) * priceBarScale);
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
      priceHandlerRight.style.left = priceBarLength - handlerWidth / 2 + 'px';
      priceHandlerLeft.style.left = 0 - handlerWidth / 2 + 'px';
      priceFillLine.style.left = 0;
      priceFillLine.style.right = 0;

      rangePriceMin.textContent = Math.round((priceHandlerLeft.offsetLeft + handlerWidth / 2) * this.getPriceBarScale());
      rangePriceMax.textContent = Math.round((priceHandlerRight.offsetLeft + handlerWidth / 2) * this.getPriceBarScale());
    },
    getPriceBarScale: function () {
      var maxPrice = window.backend.catalogCards ? Math.max.apply(null, window.backend.catalogCards.map(function (current) {
        return current.price;
      })) : 0;
      return maxPrice / priceBarLength;
    }
  };
})();
