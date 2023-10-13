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
	console.log(item);
	li.onclick = () => {
		filterMoviesByGenre(item);
	}
  }
}

function filterMoviesByGenre(arr) {
	// if(arr === )
}

genre_promo_menu(genres);

function changeMovie(item) {
  promo_bg.style.backgroundImage = `url(${item.Poster})`;
  promo_genre.innerHTML = item.Genre;
  promo_title.innerHTML = item.Title;
  promo_plot.innerHTML = item.Plot;
}
