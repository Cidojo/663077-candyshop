'use strict';

// -------------------------------------------------
// PART 1. Generate an array of card objects
// -------------------------------------------------

// DATA

var CARDS_AMOUNT = 26;

var CARD_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
  'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка',
  'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа',
  'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
  'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное',
  'Острый язычок'];

var PICTURE_NAMES = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'];

var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор',
  'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит ', 'карбамид', 'вилларибо', 'виллабаджо'];

var RATING = {
  value: [1, 5],
  number: [10, 900]
};

var AMOUNT = {
  min: 0,
  max: 20
};

var PRICE = {
  min: 100,
  max: 1500,
  round: 50
};

var WEIGHT = {
  min: 30,
  max: 300
};

var ENERGY = {
  min: 70,
  max: 500
};

// METHODS.1

// get random number from interval

function getRandomInt(min, max, round) {
  round = round || 1;
  return Math.round(((min + Math.round(Math.random() * (max - min))) / round)) * round;
}

// generate rating object

function getRating(rating) {
  return {
    value: getRandomInt(rating.value[0], rating.value[1]),
    number: getRandomInt(rating.number[0], rating.number[1])
  };
}

// generate nutritioFacts object

function getNutrition(contentsInitial) {
  var contentsCustom = contentsInitial.slice(0);
  var tries = getRandomInt(1, contentsCustom.length - 1);

  for (var i = 0; i < tries; i++) {
    var randomIndex = getRandomInt(0, contentsCustom.length - 1);

    contentsCustom.splice(randomIndex, 1);
  }

  return {
    sugar: !!Math.round(Math.random()),
    energy: getRandomInt(ENERGY.min, ENERGY.max),
    contents: contentsCustom.join(', ') + '.'
  };
}

// PRECEDING RESULT: create new catalog card

function createCard(name, imgLink) {
  return {
    name: name,
    picture: imgLink,
    amount: getRandomInt(AMOUNT.min, AMOUNT.max),
    price: getRandomInt(PRICE.min, PRICE.max, PRICE.round),
    weight: getRandomInt(WEIGHT.min, WEIGHT.max),
    rating: getRating(RATING),
    nutritionFacts: getNutrition(CONTENTS)
  };
}

// RESULTto generate certain number of catalog cards

function collectCards(quantity) {
  var cardsCollection = [];
  var cloneNames = CARD_NAME.slice(0);
  var clonePictureNames = PICTURE_NAMES.slice(0);

  for (var i = 0; i < quantity; i++) {
    var nameIndex = getRandomInt(0, cloneNames.length - 1);
    var pictureNamesIndex = getRandomInt(0, clonePictureNames.length - 1);

    cardsCollection.push(createCard(cloneNames[nameIndex], clonePictureNames[pictureNamesIndex]));
    cloneNames.splice(nameIndex, 1);
    clonePictureNames.splice(pictureNamesIndex, 1);
  }

  return cardsCollection;
}

// PART 1 CALLBACK

var cards = collectCards(CARDS_AMOUNT);

// -------------------------------------------------
// PART 2. OPERATIONS WITH DOM: generate DOM elements and modify DOM tree
// -------------------------------------------------

// DATA

var catalog = document.querySelector('.catalog__cards');

// NODES

document.querySelector('.catalog__load').classList.add('visually-hidden');
catalog.classList.remove('catalog__cards--load');

// METHODS.2

// fill textContent property of an owner

function fillTextContent(owner, text) {
  owner.textContent = text;
}

// fill source link

function fillSource(owner, src) {
  owner.src = src;
}

// add special class in depend on amount

function fillAmount(owner, amount) {
  var myClass = '';

  if (amount > 5) {
    myClass = 'card--in-stock';
  } else if (amount >= 1 && amount <= 5) {
    myClass = 'card--little';
  } else if (amount === 0) {
    myClass = 'card--soon';
  }

  owner.classList.add(myClass);
}

function fillPrice(owner, data) {
  fillTextContent(owner, '' + data + owner.textContent.substr(owner.textContent.indexOf(' ')));
}

// add class and change text in depend on stars raiting

function renderStars(owner, data) {
  var rating = '';
  var ratingText = ' звезды';

  switch (data.rating.value) {
    case 1:
      rating = 'one';
      ratingText = ' звезда';
      break;
    case 2:
      rating = 'two';
      break;
    case 3:
      rating = 'three';
      break;
    case 4:
      rating = 'four';
      break;
    case 5:
      rating = 'five';
      ratingText = ' звезд';
      break;
  }

  fillTextContent(owner, 'Рейтинг: ' + data.rating.value + ratingText);
  return 'stars__rating--' + rating;
}

// change text in depend on sugar

function renderIfSugar(data) {
  return ((data.nutritionFacts.sugar === true) ? 'Без сахара. ' : 'Содержит сахар. ')
  + data.nutritionFacts.energy + ' ккал';
}

// create single card

// function toBuildTemplate() {
//   return {
//     getTemplate() {
//       return document.querySelector(this.template).cloneNode(true).content;
//     },
//     getNest() {
//       this.fragment = this.getTemplate().querySelector(this.nest);
//     },
//     getTitle() {
//       return this.fragment.querySelector(this.title);
//     },
//     getPictureRef() {
//       return this.fragment.querySelector(this.pictureRef);
//     },
//     getPrice() {
//       return this.fragment.querySelector(this.price);
//     },
//     getWeight() {
//       return this.fragment.querySelector(this.weight);
//     },
//     getStars() {
//       return this.fragment.querySelector(this.stars);
//     },
//     getStarsCount() {
//       return this.fragment.querySelector(this.starsCount);
//     },
//     getCharacteristics() {
//       return this.fragment.querySelector(this.characteristics);
//     },
//     getComposition() {
//       return this.fragment.querySelector(this.composition);
//     }
//   };
// }

class ToBuildTemplate {
  constructor (Obj) {
    Obj
  };
  getTemplate() {
    return document.querySelector(this.template).cloneNode(true).content;
  };
  getNest() {
    this.fragment = this.getTemplate().querySelector(this.nest);
  };
  getTitle() {
    return this.fragment.querySelector(this.title);
  };
  getPictureRef() {
    return this.fragment.querySelector(this.pictureRef);
  };
  getPrice() {
    return this.fragment.querySelector(this.price);
  };
  getWeight() {
    return this.fragment.querySelector(this.weight);
  };
  getStars() {
    return this.fragment.querySelector(this.stars);
  };
  getStarsCount() {
    return this.fragment.querySelector(this.starsCount);
  };
  getCharacteristics() {
    return this.fragment.querySelector(this.characteristics);
  };
  getComposition() {
    return this.fragment.querySelector(this.composition);
  }
}

function toBuildCatalog() {
  var myObject = toBuildTemplate();

  myObject.template = '#card';
  myObject.nest = '.catalog__card';
  myObject.title = '.card__title';
  myObject.pictureRef = '.card__img';
  myObject.price = '.card__price';
  myObject.weight = '.card__weight';
  myObject.stars = '.stars__rating';
  myObject.starsCount = '.star__count';
  myObject.characteristics = '.card__characteristic';
  myObject.composition = '.card__composition-list';

  return myObject;
}

var toBuildCatalog = new ToBuildTemplate(
      // var myObject = toBuildTemplate();

    this.template = '#card'
  )

// generate new HTML fragment in DOM

function generateFragment(obj, data) {
  obj.getNest();

  fillAmount(obj.fragment, data.amount);
  fillTextContent(obj.getTitle(), data.name);
  fillSource(obj.getPictureRef(), data.picture);
  fillPrice(obj.getPrice().firstChild, data.price);

  if (obj.stars) {
    obj.getStars().classList.remove('stars__rating--five');
    obj.getStars().classList.add(renderStars(obj.getStars(), data));
  }
  if (obj.weight) {
    fillTextContent(obj.getWeight(), '/ ' + data.weight + ' Г');
  }
  if (obj.starsCount) {
    fillTextContent(obj.getStarsCount(), data.rating.number);
  }
  if (obj.characteristics) {
    fillTextContent(obj.getCharacteristics(), renderIfSugar(data));
  }
  if (obj.composition) {
    fillTextContent(obj.getComposition(), data.nutritionFacts.contents);
  }

  return obj.fragment;
}

// RESULT.2to create new CARDS in DOM tree

function fillCards(template, data, parent) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(generateFragment(template, data[i]));
  }

  parent.appendChild(fragment);
}

// PART 2 CALLBACK

fillCards(toBuildCatalog(), cards, catalog);

// -------------------------------------------------
// Part 3. Generate cart products
// -------------------------------------------------

// DATA
var cart = document.querySelector('.goods__cards');
var cartCards = collectCards(3);

// NODES

document.querySelector('.goods__card-empty').classList.add('visually-hidden');
cart.classList.remove('goods__cards--empty');

// METHODS.3

function toBuildCart() {
  var myObject = toBuildTemplate();

  myObject.template = '#card-order';
  myObject.nest = '.card-order';
  myObject.title = '.card-order__title';
  myObject.pictureRef = '.card-order__img';
  myObject.price = '.card-order__price';

  return myObject;
}

// PART 3 CALLBACK

fillCards(toBuildCart(), cartCards, cart);
