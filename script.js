const moviesURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=1ceba6e7e89a5257b3c318819850da51&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1";

const posterURL = "https://image.tmdb.org/t/p/w500";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?api_key=1ceba6e7e89a5257b3c318819850da51&query=";

const trendingURL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=1ceba6e7e89a5257b3c318819850da51";

const hero = document.getElementById("hero");
const form = document.querySelector("form");
const query = document.querySelector("input");
const reviewsDiv = document.querySelector(".reviews");
const trending = document.getElementById("trending");
let reviewBtn;

// Showing movies in DOM
const showMoviesInDOM = (movies) => {
  reviewsDiv.style.height = "0px";
  hero.style.height = "auto";

  hero.innerHTML = "";
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");
    div.classList.add("container");

    const {
      poster_path,
      title,
      release_date,
      vote_average,
      overview,
      id,
      name,
      first_air_date,
    } = movie;
    const data = `
    <div class="poster">
      <img src="${posterURL}${poster_path}" />

      <div class="title">
        <h3>${title ? title : name}</h3>
      </div>
    
    </div>
    <div class="info ">
      <h2>${title ? title : name}</h2>
      <p class="date"><strong>Releasing:</strong> ${
        release_date ? release_date : first_air_date
      }</p>
      <p class="vote"><strong>ImDB Rating:</strong> ${vote_average}</p>
      <p><strong>Overview:</strong> ${overview}</p>
      <button class="review-btn" data-movieId="${id}">Show Reviews</button>
    </div>
    `;
    div.innerHTML = data;
    hero.appendChild(div);
  });
  reviewBtn = document.querySelectorAll(".review-btn");
  fetchReviews(reviewBtn, movies);
};

// Fetching movies
const getMovies = async (moviesURL) => {
  let res, data;
  try {
    res = await fetch(moviesURL);
    data = await res.json();
  } catch (err) {
    console.log("error " + err);
  }
  showMoviesInDOM(data.results);
};

getMovies(moviesURL);

// Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if ((query.value !== null) & (query.value !== "")) {
    getMovies(searchURL + `${query.value}`);
  }

  query.value = "";
});

// Show Trending Movies
trending.addEventListener("click", () => {
  getMovies(trendingURL);
});

// Fetching Reviews by Movie ID
function fetchReviews(reviewBtns, movies) {
  reviewBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-movieId");
      let reviewsURL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=1ceba6e7e89a5257b3c318819850da51&language=en-US&page=1`;

      const res = await fetch(reviewsURL);
      const data = await res.json();

      const movie = movies.filter((movie) => movie.id === +id);

      showReviewsInDOM(data.results, movie[0]);
    });
  });
}

// Showing reviews in DOM
function showReviewsInDOM(reviews, movie) {
  hero.classList.remove("show");
  hero.classList.add("hide");

  reviewsDiv.classList.remove("hide");
  reviewsDiv.classList.add("show");

  reviewsDiv.style.height = "auto";
  hero.style.height = "0px";

  reviewsDiv.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("movie-details");

  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    id,
    name,
    first_air_date,
  } = movie;
  const poster = `${posterURL}${poster_path}`;

  let data = `
    <aside>
      <img src="${poster}" alt="${title ? title : name}"/>
    </aside>
    <section class="details-section">
      <h2>${title ? title : name}</h2>
      <p><strong>Releasing:</strong> ${
        release_date ? release_date : first_air_date
      }</p>
      <p><strong>ImDB Rating:</strong> ${vote_average}</p>
      <p><strong>Overview:</strong> ${overview}</p>
    </section>
    <main class="all-reviews">
      ${
        reviews.length !== 0
          ? ""
          : " <h1 class='no-review'>Sorry No Review To Show!!!</h1> "
      }
  `;

  reviews.forEach((review) => {
    let avatar = review.author_details.avatar_path;
    const prefix = "https://secure.gravatar.com/avatar/";
    const createdAt = new Date(review.created_at);
    const date = createdAt.getDate();
    const month = createdAt.getMonth();
    const year = createdAt.getFullYear();
    const hour = createdAt.getHours();
    const minute = createdAt.getMinutes();

    if (avatar !== null && avatar.slice(1).lastIndexOf("https") === 0) {
      avatar = avatar.slice(1);
    } else if (avatar !== null) {
      avatar = prefix + avatar.slice(1);
    }

    data += `
    <div class="review">
      <div class="person-details">
        <h2>Username: ${review.author}</h2>
        <img src="${avatar !== null ? avatar : ""}" alt="${review.author}"/>
        <span>Commented: ${date}-${month}-${year} || ${hour}:${minute}</span>
      </div>

      <p>${review.content}</p>
    </div>
    `;
  });

  data += `</main>`;
  div.innerHTML = data;
  reviewsDiv.appendChild(div);
}
