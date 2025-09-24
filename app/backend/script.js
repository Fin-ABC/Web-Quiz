// ################ Bagian Create

// Fungsi yg berfungi untuk memunculkan form untuk membuat soal kuis dan pilihan gandanya sebanyak jumlah soal yg ditentuksn user
function callFormPertanyaanCreate(index) {
  const card_pertanyaan = document.getElementById("card-pertanyaan");

  card_pertanyaan.innerHTML = "";
  for (let i = 1; i <= index; i++) {
    card_pertanyaan.innerHTML += `
      <div class="mb-4 p-4 border rounded-lg border-white">
        <label for="create_kuis_pertanyaan${i}" class="mb-1 block font-semibold">Pertanyaan ${i}</label>
        <input
          type="text"
          id="create_kuis_pertanyaan${i}"
          name="create_kuis_pertanyaan${i}"
          maxlength="100"
          placeholder="Masukkan pertanyaan"
          class="txt-box-pertanyaan"
          required
        />
        <div class="mt-3">
          <label class="mb-1 block font-semibold">Pilihan Ganda</label>
          <div class="grid grid-cols-2 gap-4">
            ${[1, 2, 3, 4]
              .map(
                (j) => `
              <div class="flex items-center">
                <input
                  type="text"
                  name="create_kuis_pilihan${i}_${j}"
                  maxlength="40"
                  placeholder="Pilihan ${j}"
                  class="txt-box-pilgan"
                  required
                />
                <input
                  type="checkbox"
                  name="create_kuis_benar${i}_${j}"
                  class="ml-2 h-5 w-5 accent-emerald-700"
                  title="Jawaban Benar"
                />
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  // Button kirim
  card_pertanyaan.innerHTML += `
    <div
      onclick="cekFormCreateKuis()"
      class="w-full mt-3 cursor-pointer rounded-md bg-emerald-700 py-2 text-center font-bold text-white transition hover:bg-emerald-800"
      role="button"
      tabindex="0"
    >
      Kirim
    </div>
  `;
}

// FUngsi yg berfungsi untuk mengecek apakah form kosong atau tidak.
// Jika kosong maka system akan memunculkan alert
function validasiFormPertanyaan(jml_soal) {
  for (let i = 1; i <= jml_soal; i++) {
    // Cek pertanyaan
    const pertanyaan = document.getElementById(`create_kuis_pertanyaan${i}`);
    if (!pertanyaan || pertanyaan.value.trim() === "") {
      showAlertError(`Teks pertanyaan No.${i} tidak boleh kosong`);
      return false;
    }

    // Cek pilihan ganda
    let adaJawabanBenar = false;
    for (let j = 1; j <= 4; j++) {
      const pilihanInput = document.querySelector(
        `input[name="create_kuis_pilihan${i}_${j}"]`,
      );
      const checkboxInput = document.querySelector(
        `input[name="create_kuis_benar${i}_${j}"]`,
      );

      if (!pilihanInput || pilihanInput.value.trim() === "") {
        showAlertError(`Pertanyaan No.${i} harus memiliki 4 pilihan ganda`);
        return false;
      }
      if (checkboxInput && checkboxInput.checked) {
        adaJawabanBenar = true;
      }
    }

    // Cek apakah soal memiliki jawaban benar
    if (!adaJawabanBenar) {
      showAlertError(`Pilih 1 jawaban benar untuk pertanyaan No.${i}`);
      return false;
    }
  }
  return true;
}

function resetFormCreateKuis() {
  document.getElementById("form-create-basic-info").reset();
  document.getElementById("card-pertanyaan").innerHTML = "";

  changePage("basic-info", "form-pertanyaan");
  changePage("main", "create-kuis");
}

// FUngsi yg nanti akan digunakan untuk mengirim data dari form ke system lalu ke database
function cekFormCreateKuis() {
  const jumlahSoal = document.getElementById("basic_info_jumlah_soal").value;
  if (!validasiFormPertanyaan(jumlahSoal)) {
    return;
  }
  hasil = getQuizFormDataCreate(jumlahSoal);
  console.log(hasil);
  insertKuis();
}

// Fungsi yg berfungsi mengambil data dari setiap form
function getQuizFormDataCreate(jml_soal) {
  const quizData = [];
  const dataPertanyaan = [];

  const judul = document.getElementById("basic_info_judul").value;
  const subjudul = document.getElementById("basic_info_subjudul").value;
  const deskripsi = document.getElementById("basic_info_deskripsi").value;

  for (let i = 1; i <= jml_soal; i++) {
    // Ambil pertanyaan
    const pertanyaan = document
      .getElementById(`create_kuis_pertanyaan${i}`)
      .value.trim();

    // Ambil pilihan ganda dan jawaban benar
    const pilihan_ganda = [];
    let jawaban_benar = [];
    for (let j = 1; j <= 4; j++) {
      const pilihanInput = document.querySelector(
        `input[name="create_kuis_pilihan${i}_${j}"]`,
      );
      const checkboxInput = document.querySelector(
        `input[name="create_kuis_benar${i}_${j}"]`,
      );
      const pilihanValue = pilihanInput.value.trim();
      pilihan_ganda.push(pilihanValue);

      if (checkboxInput.checked) {
        jawaban_benar.push(pilihanValue);
      }
    }

    dataPertanyaan.push({
      pertanyaan,
      pilihan_ganda,
      jawaban_benar,
    });
  }
  quizData.push({
    judul,
    subjudul,
    deskripsi,
    dataPertanyaan,
  });
  return quizData;
}

function insertKuis() {
  const token = localStorage.getItem("token");
  const jumlahSoal = document.getElementById("basic_info_jumlah_soal").value;
  const quizData = getQuizFormDataCreate(jumlahSoal)[0];

  const payload = {
    judul: quizData.judul,
    subjudul: quizData.subjudul,
    deskripsi: quizData.deskripsi,
    kategori: "custom",
    pertanyaan: quizData.dataPertanyaan.map((q) => ({
      teks_pertanyaan: q.pertanyaan,
      jawaban: q.pilihan_ganda.map((pilihan) => ({
        teks_jawaban: pilihan,
        is_benar: q.jawaban_benar.includes(pilihan),
      })),
    })),
  };

  console.log(`Payload :`, payload);

  fetch("http://localhost:3000/add-kuis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        showAlertSuccess(data.message);
        resetFormCreateKuis();
        showAllKuis();
      } else {
        showAlertError(data.error || "Gagal membuat kuis");
      }
    })
    .catch((err) => showAlertError(err.message));
}

// ################ Bagian Create ENd

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
        throw new Error("Belum login");
      }
    })
    .then((data) => {
      const { message, user } = data;
      console.log(message);
      document.getElementById("btn-main-profile").innerText = user.username;
      console.log(user);
    })
    .catch((err) => {
      beforeLogin();
      console.error(err);
    });
}

function isLiked(idKuis) {
  const token = localStorage.getItem("token");
  fetch(`http://localhost:3000/isLiked`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id_kuis: idKuis }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.liked;
    });
}

function showAllKuis() {
  fetch("http://localhost:3000/kuis")
    .then((res) => res.json())
    .then((data) => {
      const token = localStorage.getItem("token");

      const data_quiz = data.map((kuis) => ({
        id: kuis.id_kuis,
        kategori: kuis.kategori,
        judul: kuis.judul,
        subjudul: kuis.subjudul,
        author: kuis.author,
        like: kuis.like || "0", // jika ada
        deskripsi: kuis.deskripsi,
        pertanyaan: kuis.pertanyaan.map((p) => p.teks_pertanyaan),
        // tambahkan pilihan_ganda dan jawaban jika backend sudah kirim
      }));
      // Sekarang data_quiz sudah sama formatnya dengan yang kamu pakai di frontend
      console.log(data_quiz);
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
          <button id="btn-like-${lvl.id}" class="btn-like-card-level">
            <p id="main-like-${lvl.id}">${lvl.like}</p>
            <!-- SVG Heard Add -->
            <svg
            id="main-like-add-${lvl.id}"
              class="mt-1 fill-red-500 stroke-black stroke-1"
              height="20px"
              width= "20px"
              viewBox="0 0 297 297"
              xml:space="preserve"
            >
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path
                      d="M185.088,256.439c-3.588-3.589-5.563-8.354-5.561-13.415l0.002-12.33l-12.264,0.002c-5.063,0-9.826-1.977-13.412-5.563 c-3.586-3.589-5.561-8.352-5.559-13.412l0.004-34.578c0.004-10.459,8.514-18.969,18.971-18.973l12.271-0.004l0.002-12.334 c0-10.461,8.51-18.973,18.973-18.976l34.451-0.004h0.002c10.461,0,18.971,8.511,18.971,18.976l-0.004,12.326l12.26-0.002 c5.063,0,9.826,1.977,13.412,5.563c0.648,0.65,1.227,1.35,1.768,2.072c11.68-20.365,17.625-41,17.625-61.471 c0-44.797-36.445-81.241-81.24-81.241c-20.066,0-39.498,12.444-57.756,36.988c-3.602,4.841-6.789,9.67-9.504,14.105 c-2.717-4.436-5.902-9.265-9.504-14.105C120.738,35.52,101.307,23.075,81.24,23.075C36.443,23.075,0,59.52,0,104.316 c0,23.211,7.6,46.641,22.588,69.641c11.531,17.692,27.478,35.195,47.396,52.021c33.406,28.219,66.408,44.855,67.797,45.547 c3.961,1.981,8.016,2.399,10.719,2.399c2.703,0,6.758-0.418,10.721-2.399c0.766-0.383,11.174-5.629,25.965-14.999 C185.154,256.495,185.119,256.47,185.088,256.439z"
                    />
                  </g>
                  <g>
                    <path
                      d="M232.969,140.676h-0.002l-34.449,0.005c-2.746,0.001-4.994,2.248-4.994,4.994l-0.006,21.319 c0,2.746-2.246,4.994-4.994,4.995l-21.25,0.006c-2.746,0.001-4.992,2.249-4.994,4.995l-0.002,34.575 c-0.002,2.745,2.244,4.992,4.988,4.992c0.002,0,0.002,0,0.002,0l21.252-0.004h0.002c2.746,0,4.99,2.245,4.99,4.992l-0.004,21.323 c-0.002,2.747,2.246,4.992,4.992,4.992l34.443-0.008c2.746,0,4.994-2.248,4.994-4.994l0.006-21.321 c0-2.747,2.248-4.994,4.994-4.995l21.25-0.007c2.748-0.001,4.994-2.249,4.994-4.995l0.004-34.572c0-2.745-2.244-4.992-4.99-4.992 h-0.002l-21.25,0.005c-2.746,0-4.992-2.246-4.992-4.992l0.006-21.321C237.957,142.923,235.713,140.676,232.969,140.676z"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <!-- SVG Check Heart -->
            <svg
            id="main-like-check-${lvl.id}"
              class="mt-1 fill-white stroke-black stroke-1 hidden"
              width= "20px"
              height="20px"
              viewBox="0 0 159.797 159.797"
              xml:space="preserve"
            >
                  <path
                    d="M149.247,64.354c1.791-7.344,2.518-15.131,1.779-23.383C146.575-8.715,85.46,5.903,75.655,34.174 C65.852,5.903,4.737-8.715,0.29,40.971c-5.728,63.919,75.365,101.363,75.365,101.363s3.821-1.767,9.735-5.172l14.372,14.369 l60.036-79.184L149.247,64.354z M99.129,142.334l-37.631-37.621l12.838-12.839l22.901,22.904l39.607-52.23l14.47,10.977 L99.129,142.334z"
                  />
            </svg>
          </button>
          <div class="total-card-level">
            <img src="style/img/book.svg" class="icon-card-level" />
            <p>${lvl.pertanyaan.length} Soal</p>
          </div>
        `;
        const lvl_offcial = document.getElementById("official-level");
        const lvl_custom = document.getElementById("custom-level");
        const btnLike = card.querySelector(`#btn-like-${lvl.id}`);
        const mainLikeAdd = document.querySelector(`#main-like-add-${lvl.id}`);
        const mainLikeCheck = document.querySelector(
          `#main-like-check-${lvl.id}`,
        );

        if (token) {
          btnLike.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleLike(lvl.id);
          });
        } else {
          btnLike.addEventListener("click", (event) => {
            event.stopPropagation();
            showAlertError(
              "Silahkan login terlebih dahulu untuk memberi like pada kuis",
            );
          });
        }

        if (token && isLiked(lvl.id)) {
          btnLike.classList.add("btn-like-card-level-active");
          btnLike.classList.remove("btn-like-card-level");
          mainLikeAdd.classList.add("hidden");
          mainLikeCheck.classList.remove("hidden");
        } else {
          btnLike.classList.remove("btn-like-card-level-active");
          btnLike.classList.add("btn-like-card-level");
          mainLikeAdd.classList.remove("hidden");
          mainLikeCheck.classList.add("hidden");
        }

        card.addEventListener("click", () => {
          window.location.href = `quiz/?id=${lvl.id}`;
        });

        if (lvl.kategori == "official") {
          lvl_offcial.appendChild(card);
        } else if (lvl.kategori == "custom") {
          lvl_custom.appendChild(card);
        }
      });
    });
}

function toggleLike(idKuis) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:3000/toggle-like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id_kuis: idKuis }),
  })
    .then((res) => res.json())
    .then((data) => {
      like = data.jmlLike;
      console.log(data.message);
      console.log(like);
      const btnLike = document.getElementById(`btn-like-${idKuis}`);
      const mainLikeAdd = document.querySelector(`#main-like-add-${idKuis}`);
      const mainLikeCheck = document.querySelector(
        `#main-like-check-${idKuis}`,
      );
      const mainLikeCount = document.getElementById(`main-like-${idKuis}`);
      if (data.liked) {
        mainLikeCount.innerText = like;
        btnLike.classList.add("btn-like-card-level-active");
        btnLike.classList.remove("btn-like-card-level");
        mainLikeAdd.classList.add("hidden");
        mainLikeCheck.classList.remove("hidden");
      } else {
        mainLikeCount.innerText = like;
        btnLike.classList.remove("btn-like-card-level-active");
        btnLike.classList.add("btn-like-card-level");
        mainLikeAdd.classList.remove("hidden");
        mainLikeCheck.classList.add("hidden");
      }
    });
}

function main() {
  getProfile();
  showAllKuis();
}

main();
