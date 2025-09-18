function profileToMain() {
  window.location.href = "../";
}

function callCardHapus(id, judul, subjudul, deskripsi) {
  const cardHapus = document.getElementById("card-hapus");
  const pageProfile = document.getElementById("page-profile");

  cardHapus.classList.toggle("hidden");
  pageProfile.classList.toggle("blur-sm");

  document.getElementById("profile-hapus-judul").innerText = judul;
  document.getElementById("profile-hapus-subjudul").innerText = subjudul;
  document.getElementById("profile-hapus-deskripsi").innerText = deskripsi;
}

function submitDetele(id) {
  console.log("Delete Kuis " + id);
}

function callCardEdit() {
  const cardEdit = document.getElementById("card-edit");
  const pageProfile = document.getElementById("page-profile");

  cardEdit.classList.toggle("hidden");
  pageProfile.classList.toggle("blur-sm");
}

function callFormEdit() {
  changePage("edit-kuis", "card-edit");
}

const btnBackBacic = document.getElementById("btn-back-edit-basic-info");
const btnBackPertanyaan = document.getElementById("btn-back-edit-pertanyaan");

btnBackBacic.addEventListener("click", () => {
  document.getElementById("edit-kuis").classList.toggle("hidden");
  document.getElementById("page-profile").classList.toggle("blur-sm");
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/app/";
}

// Fetch MyKuis
function getMyKuis() {
  const token = localStorage.getItem("token");
  const cardList = document.getElementById("profile-list-kuis");

  fetch("http://localhost:3000/my-kuis", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("profile-jumlah-kuis").innerText = data.length;
      data.forEach((kuis) => {
        const card = document.createElement("div");
        card.classList.add("profile-card-list");
        card.innerHTML = `
        <div class="text-left">
          <h3 class="profile-card-judul">${kuis.judul}</h3>
          <div class="flex">
            <img src="../style/img/book.svg" class="icon-card-level" />
            <p class="mb-1">${kuis.jumlah_pertanyaan} Soal</p>
          </div>
          <p class="mb-3">${kuis.jumlah_like} &#10084;</p>
          <p class="profile-card-date">${kuis.created_at}</p>
        </div>
        <div class="">
          <button onclick="callCardEdit();" class="profile-btn-edit">
            Edit
          </button>
          <button onclick="callCardHapus('${kuis.id_kuis}', '${kuis.judul}', '${kuis.subjudul}', '${kuis.deskripsi}',);" class="profile-btn-hapus">
            Hapus
          </button>
        </div>`;

        cardList.appendChild(card);
      });
    })
    .catch((err) => console.error("Error : ", err));
}

// Fetch Profile
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
        return res.json();
      } else {
        throw new Error("Belum login");
      }
    })
    .then((data) => {
      const { message, user } = data;
      document.getElementById("profile-username").innerText = user.username;
      document.getElementById("profile-id").innerText = user.id;
    })
    .catch((err) => {
      beforeLogin();
      console.error(err);
    });
}

function main() {
  getProfile();
  getMyKuis();
}

main();
