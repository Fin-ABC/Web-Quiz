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

function showAllKuis() {
  fetch("http://localhost:3000/kuis")
    .then((res) => res.json())
    .then((data) => {
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
          <button id="btn-like" class="btn-like-card-level">${lvl.like} &#10084;</button>
          <div class="total-card-level">
            <img src="style/img/book.svg" class="icon-card-level" />
            <p>${lvl.pertanyaan.length} Soal</p>
          </div>
        `;
        const lvl_offcial = document.getElementById("official-level");
        const lvl_custom = document.getElementById("custom-level");

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

function main() {
  getProfile();
  showAllKuis();
}

main();
