const lvl_offcial = document.getElementById("official-level");
const lvl_custom = document.getElementById("custom-level");

// Ngambil data dari list ke page
data_quiz.forEach((lvl) => {
  const card = document.createElement("div");
  card.classList.add("card-level", "group");
  card.innerHTML = `
          <h2 class="title-card-level">${lvl.judul}</h2>
          <div class="author-card-level">
          <img
            src="style/img/author.svg"
            alt="by"
            class="icon-card-level"
          />
          <p>${lvl.author} </p>
          </div>
          <button id="btn-like" class="btn-like-card-level">${lvl.like} &#10084;</button>
          <div class="total-card-level">
            <img src="style/img/book.svg" class="icon-card-level" />
            <p>${lvl.pertanyaan.length} Soal</p>
          </div>
        `;

  card.addEventListener("click", () => {
    window.location.href = `quiz/?id=${lvl.id}`;
  });

  if (lvl.kategori == "official") {
    lvl_offcial.appendChild(card);
  } else if (lvl.kategori == "custom") {
    lvl_custom.appendChild(card);
  }
});

function mainToProfile() {
  window.location.href = "profile/";
}

function afterLogin() {
  document.getElementById("btn-main-login").classList.add("hidden");
  document.getElementById("btn-main-profile").classList.remove("hidden");
  document.getElementById("btn-random-quiz").style.display = "flex";
  document.getElementById("page-custom-level").classList.remove("hidden");
  document.getElementById("btn-make-quiz").classList.remove("hidden");
}

function beforeLogin() {
  document.getElementById("btn-main-login").classList.remove("hidden");
  document.getElementById("btn-main-profile").classList.add("hidden");
  document.getElementById("btn-random-quiz").style.display = "none";
  document.getElementById("page-custom-level").classList.add("hidden");
  document.getElementById("btn-make-quiz").classList.add("hidden");
}

function getProfile() {
  const token = localStorage.getItem("token");

  fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        afterLogin();
        return res.json();
      } else {
        beforeLogin();
        throw new Error("Invalid token");
      }
    })
    .then((data) => console.log(data))
    .catch((err) => {
      beforeLogin();
      console.error(err);
    });
}
getProfile();
