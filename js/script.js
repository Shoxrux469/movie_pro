import { movies } from "./db.js";

let ul = document.querySelector(".promo__interactive-list");
let promo_bg = document.querySelector(".promo__bg");
let promo_genre = document.querySelector(".promo__genre");
let promo_title = document.querySelector(".promo__title");
let promo_plot = document.querySelector(".promo__descr");
let inp_search = document.querySelector("#search");

inp_search.onkeyup = () => {
  let val = inp_search.value.toLowerCase().trim();

  let filtered = movies.filter((item) => {
    let title = item.Title.toLowerCase().trim();

    if (title.includes(val)) {
      return item;
    }
  });

  reload(filtered);
};

reload(movies);

function reload(arr) {
  ul.innerHTML = "";

  changeMovie(arr[0]);

  for (let item of arr) {
    let li = document.createElement("li");
    let del = document.createElement("div");

    li.classList.add("promo__interactive-item");
    del.classList.add("delete");

    li.innerHTML = item.Title;

    li.append(del);
    ul.append(li);

    li.onclick = () => {
      changeMovie(item);
    };
    del.onclick = () => {
      li.remove()
    }
  }
}
let genres = movies.map((item) => item.Genre);
genres = ["All", ...new Set(genres)];

let genre_menu_list = document.querySelector(".promo__menu-list");

function genre_promo_menu(arr) {
  genre_menu_list.innerHTML = "";
  for (let item of arr) {
    let li = document.createElement("li");

    genre_menu_list.append(li);

    li.classList.add("promo__menu-item");

    li.innerHTML = item;
    li.onclick = () => {
      filterMoviesByGenre(item);
    };
  }
}

function filterMoviesByGenre(arr) {
  let filtered1 = movies.filter((item) => {
    item.Genre == arr;

    if ((arr = "All")) {
      return true;
    }
  });
  console.log(filtered1);

  reload(filtered1);
}

genre_promo_menu(genres);

function changeMovie(item) {
  promo_bg.style.backgroundImage = `url(${item.Poster})`;
  promo_genre.innerHTML = item.Genre;
  promo_title.innerHTML = item.Title;
  promo_plot.innerHTML = item.Plot;
}


let ratings = document.querySelectorAll(".rating");

if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive, ratingValue;

  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);

    setRatingActiveWidth();

    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating_active");
    ratingValue = rating.querySelector(".rating_value");
  }
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    let RatingActiveWidth = index / 0.10;
    ratingActive.style.width = `${RatingActiveWidth}%`;
  }

  function setRating(rating) {
    let ratingItems = document.querySelectorAll(".rating_item");
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        initRatingVars(rating);

        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        setRatingActiveWidth();
      });
      ratingItem.onclick = (e) => {
        initRatingVars(rating);

        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating);
        } else {
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth()
        }
      };
    }
  }
}
