const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const input = document.querySelector(".input-key");
  fetch(`https://www.omdbapi.com/?apikey=3ecc60a&s=${input.value}`)
    .then((res) => res.json())
    .then((result) => {
      const movie = result.Search;
      console.log(movie);
      let card = ``;
      movie.forEach((m) => (card += Showcard(m)));
      document.querySelector(".movie-list").innerHTML = card;

      const detailButton = document.querySelectorAll(".detail-button");
      detailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          fetch(`https://www.omdbapi.com/?apikey=3ecc60a&i=${id}`)
            .then((res) => res.json())
            .then((m) => {
              const movieDetail = DetailMovie(m);
              const modal = document.querySelector(".modal-body");
              modal.innerHTML = movieDetail;
            });
        });
      });
    });
});

function Showcard(m) {
  return `       <div class="col-md-4 my-5">
  <div
    class="card bg-dark bg-opacity-25 p-3 rounded-3xl backdrop-blur-md movie-imagesl"
  >
    <a
      href=""
      class="detail-button"
      data-bs-toggle="modal"
      data-id="${m.imdbID}"
      data-bs-target="#movieDetail"
      ><img
        src="${m.Poster}"
        class="card-img-top"
       
    /></a>
    <div class="card-body">
      <h5 class="card-title text-white">${m.Title}</h5>
      <h6 class="card-subtitle mb-2 text-white">${m.Year}</h6>
    </div>
  </div>
</div>`;
}
function DetailMovie(m) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title}</h4></li>
          <li class="list-group-item">
            <strong>Released : </strong>${m.Released}
          </li>
          <li class="list-group-item">
            <strong>Genre : </strong>${m.Genre}
          </li>
          <li class="list-group-item">
            <strong>Language : </strong>${m.Language}
          </li>
          <li class="list-group-item">
            <strong>Actors : </strong>${m.Actors}
          </li>
          <li class="list-group-item">
            <strong>imdbRating : </strong>${m.imdbRating}
          </li>
          <li class="list-group-item">
            <strong>Plot : </strong> <br />
                ${m.Plot}
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}
