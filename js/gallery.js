export default [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

import gallery from "./gallery.js";

/*Разбей задание на несколько подзадач:

1 .Создание и рендер разметки по массиву данных и предоставленному шаблону.

2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

3. Открытие модального окна по клику на элементе галереи.

4. Подмена значения атрибута src элемента img.lightbox__image.

5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

6. Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. */

// const divCaruselRef = document.getElementById("carusel");
const ulCaruselRef = document.querySelector(".js-gallery");
const divLightBoxRef = document.querySelector(".js-lightbox");
const overlayRef = document.querySelector(".lightbox__overlay");
const lightboxImgRef = document.querySelector(".lightbox__image");
const closeBtnRef = document.querySelector("[data-action='close-lightbox']");
const leftArrowBtnRef = document.querySelector(".left");
const rightArrowBtnRef = document.querySelector(".right");

let currentIdx = 0;
// итерация по массиву и создание всех элементов для их отрисовки (рендера)
const liRefGalery = gallery.map(({ preview, original, description }, index) => {
  currentIdx = index;
  // создание элементов <li>, <a>, <img>
  const liRef = document.createElement("li");
  const anchorRef = document.createElement("a");
  const imgRef = document.createElement("img");
  // ---------------------------------------------

  // добавление классов на созданные элементы
  anchorRef.classList.add("gallery__link");
  liRef.classList.add("gallery__item");
  imgRef.classList.add("gallery__image");

  // установка аттрибутов src, alt и привязка ссылок с описанием картинок
  imgRef.setAttribute("src", preview);
  anchorRef.setAttribute("href", original);
  imgRef.setAttribute("alt", description);

  imgRef.dataset.source = original;
  // imgRef.dataset.index = original;
  imgRef.dataset.index = index;

  anchorRef.append(imgRef);
  liRef.append(anchorRef);

  return liRef;
});

// распыление всей коллекции в ul-gallery
ulCaruselRef.append(...liRefGalery);

// --------------------------------------------------

// функции добавления класса
const addClassList = () => {
  divLightBoxRef.classList.add("is-open");
};
// функции удаления класса
const removeClassList = () => {
  divLightBoxRef.classList.remove("is-open");
};
// --------------------------
//
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

/* открытие модального окна по клику на картинку */

const onOpenModalClick = (e) => {
  e.preventDefault(e);
  currentIdx = Number(e.target.getAttribute("data-index"));
  if (e.target.nodeName !== "IMG") return;
  toggleFullScreen();

  // добавление класса is-open
  addClassList();

  // аттрибуты src и alt
  lightboxImgRef.src = e.target.dataset.source;
  lightboxImgRef.alt = e.target.alt;

  leftArrowBtnRef.addEventListener("click", onLeftArrowMouseClik);
  rightArrowBtnRef.addEventListener("click", onRightArrowMouseClik);

  overlayRef.addEventListener("click", onBackDropClick);
  window.addEventListener("keydown", onEscPressBtnRef);

  window.addEventListener("keydown", onLeftArrow);
  window.addEventListener("keydown", onRightArrow);

  closeBtnRef.addEventListener("click", onCloseBtnClick);

  //   console.dir("открытие модалки с картинкой", e.target);
};

ulCaruselRef.addEventListener("click", onOpenModalClick);
// ulCaruselRef.removeEventListener("click", onOpenModalClick);

// ---------------------------------------------------

/* закрытие модального окна по клику на крестик и overlay */

const onCloseBtnClick = (e) => {
  // удаление класса is-open

  // очищает src и alt

  overlayRef.removeEventListener("click", onBackDropClick);

  window.removeEventListener("keydown", onEscPressBtnRef);

  window.removeEventListener("keydown", onLeftArrow);
  window.removeEventListener("keydown", onRightArrow);

  closeBtnRef.removeEventListener("click", onCloseBtnClick);

  leftArrowBtnRef.removeEventListener("click", onLeftArrowMouseClik);
  rightArrowBtnRef.removeEventListener("click", onRightArrowMouseClik);

  lightboxImgRef.src = "";
  lightboxImgRef.alt = "";
  removeClassList(e);

  //   console.dir("кнопка закрытия модалки", e.target); //для проверки на наличие слушателя событий
};

const onBackDropClick = (e) => {
  if (e.target.nodeName !== "IMG") {
    // функция обратного вызова для снятия класса is-open и закрытия модалки
    onCloseBtnClick(e);
  }
  //   console.dir("клик на backdrop", e); //для проверки на наличие слушателя событий
  return;
};

// ----------------------------------------------------

/* закрытие модального окна по клику на клавишу ESC */
const onEscPressBtnRef = (e) => {
  if (e.code === "Escape") {
    // функция обратного вызова для снятия класса is-open, закрытия модалки
    //и удаление всех слушателей событий
    onCloseBtnClick(e);
  }
  //   console.dir("нажимаю escape", e); //для проверки на наличие слушателя событий
  return;
};

const onRightArrow = (e) => {
  if (e.code === "ArrowRight") {
    currentIdx += 1;
    if (currentIdx === gallery.length) {
      currentIdx = 0;
    }
    lightboxImgRef.src = gallery[currentIdx].original;

    // console.dir("нажимаю стрелку вправо", e);
  }
  return;
};

const onLeftArrow = (e) => {
  if (e.code === "ArrowLeft") {
    currentIdx -= 1;
    if (currentIdx < 0) {
      currentIdx = gallery.length - 1;
    }
    lightboxImgRef.src = gallery[currentIdx].original;
    // console.dir("нажимаю стрелку влево", e); //для проверки на наличие слушателя событий
  }
  return;
};

const onRightArrowMouseClik = () => {
  currentIdx += 1;
  if (currentIdx === gallery.length) {
    currentIdx = 0;
  }
  lightboxImgRef.src = gallery[currentIdx].original;
  //   console.dir(e.currentTarget);
  //   console.dir(e.target);
};
const onLeftArrowMouseClik = () => {
  currentIdx -= 1;
  if (currentIdx < 0) {
    currentIdx = gallery.length - 1;
  }
  lightboxImgRef.src = gallery[currentIdx].original;

  //   console.dir(e.currentTarget);
  //   console.dir(e.target);
};
