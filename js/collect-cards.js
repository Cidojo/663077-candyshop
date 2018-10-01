'use strict';

(function () {
  var CARDS_QTY = 10;

  var CARD_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
    'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка',
    'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа',
    'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
    'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное',
    'Острый язычок'];

  var PICTURE_NAMES = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg',
    'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg',
    'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg',
    'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg',
    'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg',
    'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg',
    'soda-russian.jpg'];

    // возвращает массив из карточек товара

  function collectCards(quantity) {
    var cardsCollection = [];
    var cloneOfNames = CARD_NAMES.slice(0);
    var cloneOfPictureNames = PICTURE_NAMES.slice(0);

    for (var i = 0; i < quantity; i++) {
      var nameIndex = window.getRandomInt(0, cloneOfNames.length - 1);
      var pictureNamesIndex = window.getRandomInt(0, cloneOfPictureNames.length - 1);

      cardsCollection.push(window.createCard(cloneOfNames[nameIndex], cloneOfPictureNames[pictureNamesIndex]));
      cloneOfNames.splice(nameIndex, 1);
      cloneOfPictureNames.splice(pictureNamesIndex, 1);
    }

    return cardsCollection;
  }

  window.catalogCards = collectCards(CARDS_QTY);
})();
