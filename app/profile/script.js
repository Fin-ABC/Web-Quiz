function profileToMain() {
  window.location.href = "../";
}

function callCardHapus(id, judul, subjudul, deskripsi) {
  const cardHapus = document.getElementById("card-hapus");
  const pageProfile = document.getElementById("page-profile");

  cardHapus.classList.toggle("hidden");
  pageProfile.classList.toggle("blur-sm");

  document.getElementById("profile-hapus-id").innerText = id;
  document.getElementById("profile-hapus-judul").innerText = judul;
  document.getElementById("profile-hapus-subjudul").innerText = subjudul;
  document.getElementById("profile-hapus-deskripsi").innerText = deskripsi;
}

function submitDetele() {
  const id = document.getElementById("profile-hapus-id").textContent;
  console.log(id);

  fetch(`http://localhost:3000/delete-kuis/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      callCardHapus();
      refreshKuis();
      getMyKuis();
      showAlertSuccess(data.message);
    })
    .catch((error) => {
      console.error("Gagal: ", error);
      showAlertError("Terjadi kesalahan saat menghapus kuis");
    });
}

function callCardEdit(id, judul, subjudul, deskripsi) {
  const cardEdit = document.getElementById("card-edit");
  const pageProfile = document.getElementById("page-profile");

  cardEdit.classList.toggle("hidden");
  pageProfile.classList.toggle("blur-sm");

  document.getElementById("profile-edit-id").innerText = id;
  document.getElementById("profile-edit-judul").innerText = judul;
  document.getElementById("profile-edit-subjudul").innerText = subjudul;
  document.getElementById("profile-edit-deskripsi").innerText = deskripsi;
}

function callFormEdit() {
  const id = document.getElementById("profile-edit-hapus").textContent;

  let dataKuis;
  fetch(`http://localhost:3000/kuis/${id}`)
    .then((res) => res.json())
    .then((data) => {
      dataKuis = {
        judul: data.judul,
        subjudul: data.subjudul,
        deskripsi: data.deskripsi,
        jml_soal: data.pertanyaan.length,
        pertanyaan: data.pertanyaan.map((p) => p.teks_pertanyaan),
        pilihan_ganda: data.pertanyaan.map((p) =>
          p.jawaban.map((j) => j.teks_jawaban),
        ),
        jawaban: data.pertanyaan.map(
          (p) => p.jawaban.find((j) => j.is_benar === 1)?.teks_jawaban || "",
        ),
      };

      const inputJudul = document.getElementById("edit_basic_info_judul")
      const inputSubjudul = document.getElementById("edit_basic_info_subjudul")
      const inputDeskripsi = document.getElementById("edit_basic_info_deskripsi")
      const inputJumlahSoal = document.getElementById("edit_basic_info_jumlah_soal")
    });

  changePage("edit-kuis", "card-edit");
}

// Fungsi untuk memanggil Form Pertanyaan Edit Kuis
function callFormPertanyaanEdit(index) {
  const cardEdit = document.getElementById("card-edit-pertanyaan");

  cardEdit.innerHTML = "";
  for (let i = 1; i <= index; i++) {
    cardEdit.innerHTML += `
      <div class="mb-4 p-4 border rounded-lg border-white">
        <label for="edit_kuis_pertanyaan${i}" class="mb-1 block font-semibold">Pertanyaan ${i}</label>
        <input
          type="text"
          id="edit_kuis_pertanyaan${i}"
          name="edit_kuis_pertanyaan${i}"
          maxlength="60"
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
                  name="edit_kuis_pilihan${i}_${j}"
                  maxlength="40"
                  placeholder="Pilihan ${j}"
                  class="txt-box-pilgan"
                  required
                />
                <input
                  type="checkbox"
                  name="edit_kuis_benar${i}_${j}"
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
  cardEdit.innerHTML += `
    <div
      onclick="cekFormEditKuis()"
      class="w-full mt-3 cursor-pointer rounded-md bg-emerald-700 py-2 text-center font-bold text-white transition hover:bg-emerald-800"
      role="button"
      tabindex="0"
    >
      Kirim
    </div>
  `;
}

// Fungsi Untuk mnegece for edit bagiann pertanyaan
function cekFormEditKuis() {
  const jumlahSoal = document.getElementById(
    "edit_basic_info_jumlah_soal",
  ).value;
  if (!validasiFormEditPertanyaan(jumlahSoal)) {
    return;
  }
  hasil = getQuizFormDataEdit(jumlahSoal);
  console.log(hasil);

  changePage("edit-basic-info", "form-edit-pertanyaan");
  document.getElementById("edit-kuis").classList.toggle("hidden");
  // Tambah
  // Fungsi buat refresh list kuis
}

// Fungsi untuk validasi form edit bagian petnyaan
function validasiFormEditPertanyaan(jml_soal) {
  for (let i = 1; i <= jml_soal; i++) {
    // Cek pertanyaan
    const pertanyaan = document.getElementById(`edit_kuis_pertanyaan${i}`);
    if (!pertanyaan || pertanyaan.value.trim() === "") {
      showAlertError(`Teks pertanyaan No.${i} tidak boleh kosong`);
      return false;
    }

    // Cek pilihan ganda
    let adaJawabanBenar = false;
    for (let j = 1; j <= 4; j++) {
      const pilihanInput = document.querySelector(
        `input[name="edit_kuis_pilihan${i}_${j}"]`,
      );
      const checkboxInput = document.querySelector(
        `input[name="edit_kuis_benar${i}_${j}"]`,
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

// Fungsi untuk mengambil data semua form Edit Kuis
function getQuizFormDataEdit(jml_soal) {
  const quizData = [];
  const dataPertanyaan = [];

  const judul = document.getElementById("edit_basic_info_judul").value;
  const subjudul = document.getElementById("edit_basic_info_subjudul").value;
  const deskripsi = document.getElementById("edit_basic_info_deskripsi").value;

  for (let i = 1; i <= jml_soal; i++) {
    // Ambil pertanyaan
    const pertanyaan = document
      .getElementById(`edit_kuis_pertanyaan${i}`)
      .value.trim();

    // Ambil pilihan ganda dan jawaban benar
    const pilihan_ganda = [];
    let jawaban_benar = [];
    for (let j = 1; j <= 4; j++) {
      const pilihanInput = document.querySelector(
        `input[name="edit_kuis_pilihan${i}_${j}"]`,
      );
      const checkboxInput = document.querySelector(
        `input[name="edit_kuis_benar${i}_${j}"]`,
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
// Bagian Edit kuis end

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
          <button onclick="callCardEdit('${kuis.id_kuis}', '${kuis.judul}', '${kuis.subjudul}', '${kuis.deskripsi}');" class="profile-btn-edit">
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

// Refresh list kuis
function refreshKuis() {
  const cardList = document.getElementById("profile-list-kuis");

  cardList.innerHTML = "";
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
  refreshKuis();
  getProfile();
  getMyKuis();
}

main();
