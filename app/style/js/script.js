// Start  Button
const start = document.getElementById("startBtn");
const b_lvl = document.getElementById("back-level");
const level = document.getElementById("level");
const main = document.getElementById("main");

start.addEventListener("click", function () {
  level.classList.toggle("hidden");
  main.classList.toggle("hidden");
});

b_lvl.addEventListener("click", function () {
  level.classList.toggle("hidden");
  main.classList.toggle("hidden");
});

// Level Official
const quiz_official = [
  { id: "1", judul: "Test Level Pertama", author: "Fin", like: "12" },
  { id: "2", judul: "Test Level Kelima", author: "Fin", like: "12" },
];
const lvl_offcial = document.getElementById("official-level");

quiz_official.forEach((lvl) => {
  lvl_offcial.innerHTML += `
    <div class="card-level group">
      <h2 class="title-card-level">${lvl.judul}</h2>
      <p class="author-card-level">by ${lvl.author} </p>
      <button id="btn-like" class="btn-like-card-level">${lvl.like} &#10084;</button>
    </div>
  `;
});
