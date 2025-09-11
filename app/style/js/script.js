/*
di fungsi pangil_form, aku sudah membuat button kirim dengan onclick="cek_form_create_kuis()". Yang artinya kalo button itu diklik maka fungsi itu akan jalan. Di fungsi itu ada kode untuk menngcek formnya. Nah setelah dicek, aku juga nambahin kode untuk memanggil fungsi getFormQuiz trus diprintout. Tolong bikinin kode, setelah diprintout
*/

// Bagian Create Page Start
// Fungsi yg berfungi untuk memunculkan form untuk membuat soal kuis dan pilihan gandanya sebanyak jumlah soal yg ditentuksn user
function panggil_form(index) {
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
      onclick="cek_form_create_kuis()"
      class="w-full mt-3 cursor-pointer rounded-md bg-emerald-700 py-2 text-center font-bold text-white transition hover:bg-emerald-800"
      role="button"
      tabindex="0"
    >
      Kirim
    </div>
  `;
}

// fungsi yg berfungsi untuk prosses perpindahan form basic info ke form membuat pertanyaan kuis
// Mencakup validasi form basic info, dan perpindahan dari form Basic info ke Form Pertanyaan
function basic_info_to_pertanyaan() {
  const judul = document.getElementById("basic_info_judul").value.trim();
  const subjudul = document.getElementById("basic_info_subjudul").value.trim();
  const deskripsi = document
    .getElementById("basic_info_deskripsi")
    .value.trim();
  const jumlah_soal = document.getElementById("basic_info_jumlah_soal").value;

  // Cek Form
  if (judul === "" || subjudul === "" || deskripsi === "") {
    showAlertError("Semua field harus diisi!");
    return;
  }
  // Pindah Form
  panggil_form(jumlah_soal);
  changePage("form-pertanyaan", "basic-info");
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

// FUngsi yg nanti akan digunakan untuk mengirim data dari form ke system lalu ke database
function cek_form_create_kuis() {
  const jumlahSoal = document.getElementById("basic_info_jumlah_soal").value;
  if (!validasiFormPertanyaan(jumlahSoal)) {
    return;
  }
  hasil = getQuizFormData(jumlahSoal);
  console.log(hasil);

  changePage("basic-info", "form-pertanyaan");
  changePage("main", "create-kuis");
}

// Fungsi yg berfungsi mengambil data dari setiap form
function getQuizFormData(jml_soal) {
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
// Bagian Create Page End

// Alert & Notification
function showAlertSuccess(message) {
  showAlert(
    "bg-green-200 text-green-800",
    `<svg viewBox="0 0 24 24" class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path></svg>`,
    message,
  );
}

function showAlertError(message) {
  showAlert(
    "bg-red-200 text-red-800",
    `<svg viewBox="0 0 24 24" class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>`,
    message,
  );
}

function showAlertWarning(message) {
  showAlert(
    "bg-orange-200 text-yellow-800",
    `<svg viewBox="0 0 24 24" class="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"></path></svg>`,
    message,
  );
}

function showAlertInfo(message) {
  showAlert(
    "bg-blue-200 text-blue-800",
    `<svg viewBox="0 0 24 24" class="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg>`,
    message,
  );
}

// Fungsi helper untuk menampilkan alert
function showAlert(bgClass, iconSvg, message) {
  // Hapus alert lama jika ada
  const oldAlert = document.getElementById("custom-alert");
  if (oldAlert) oldAlert.remove();

  // Buat elemen alert
  const alertDiv = document.createElement("div");
  alertDiv.id = "custom-alert";
  alertDiv.className = `fixed left-1/2 top-8 z-50 px-2 w-full max-w-lg -translate-x-1/2 animate-fadeIn ${bgClass}`;
  alertDiv.innerHTML = `
    <div class="px-6 py-4 rounded-md text-lg flex items-center shadow-lg">
      ${iconSvg}
      <span class="flex-1">${message}</span>
      <button onclick="document.getElementById('custom-alert').remove()" class="ml-4 text-xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none">&times;</button>
    </div>
  `;

  document.body.appendChild(alertDiv);

  // hide setelah 3dtk
  setTimeout(() => {
    if (alertDiv) alertDiv.classList.add("animate-fadeOut");
    setTimeout(() => {
      if (alertDiv) alertDiv.remove();
    }, 500);
  }, 3000);
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px);}
  to { opacity: 1; transform: translateY(0);}
}
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0);}
  to { opacity: 0; transform: translateY(-20px);}
}
.animate-fadeIn { animation: fadeIn 0.4s ease;}
.animate-fadeOut { animation: fadeOut 0.5s ease;}
`;
document.head.appendChild(style);
// Alert & Notification End

// fungsi untuk toggle hidden page a dan page b
function changePage(page_a, page_b) {
  const page_1 = document.getElementById(page_a);
  const page_2 = document.getElementById(page_b);

  page_1.classList.toggle("hidden");
  page_2.classList.toggle("hidden");
}

const data_quiz = [
  {
    id: "1",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "101",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "110",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "109",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "108",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "107",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "106",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "105",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "104",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "103",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "102",
    kategori: "official",
    judul: "Test Offcial Lengkap",
    subjudul: "Ini adalah subjudul untuk level pertama",
    jml_soal: "5",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ducimus fugiat blanditiis accusantium perspiciatis totam saepe enim sunt repudiandae, amet asperiores nisi quasi sapiente cupiditate dolorem placeat. Nostrum, eaque veniam! Expedita, corporis. Minima doloribus et id perferendis optio quos delectus minus tenetur aspernatur ut blanditiis ducimus, nesciunt modi quia laborum.",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "2",
    kategori: "official",
    judul: "Test Official Kelima",
    subjudul: "Have fun playing this level",
    jml_soal: "22",
    author: "KuwaciNiku67125",
    like: "12",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae vel consequatur, quae delectus minima placeat id velit ducimus, sequi sapiente unde facilis sit recusandae officiis saepe! Est ab eaque voluptates doloribus possimus eveniet fuga repellat similique hic mollitia nesciunt molestias sit accusamus nemo ratione, adipisci expedita suscipit excepturi totam, natus quae reiciendis, velit cupiditate. Distinctio eius maxime harum tempore?",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "3",
    kategori: "custom",
    judul: "My Kisah",
    subjudul: "Have fun playing this level",
    jml_soal: "100",
    author: "Funixxxxxxxxx72",
    like: "12",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae vel consequatur, quae delectus minima placeat id velit ducimus, sequi sapiente unde facilis sit recusandae officiis saepe! Est ab eaque voluptates doloribus possimus eveniet fuga repellat similique hic mollitia nesciunt molestias sit accusamus nemo ratione, adipisci expedita suscipit excepturi totam, natus quae reiciendis, velit cupiditate. Distinctio eius maxime harum tempore?",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "4",
    kategori: "custom",
    judul: "Seberapa .... Kamu??",
    subjudul: "Have fun playing this level",
    jml_soal: "20",
    author: "Niii",
    like: "1084",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae vel consequatur, quae delectus minima placeat id velit ducimus, sequi sapiente unde facilis sit recusandae officiis saepe! Est ab eaque voluptates doloribus possimus eveniet fuga repellat similique hic mollitia nesciunt molestias sit accusamus nemo ratione, adipisci expedita suscipit excepturi totam, natus quae reiciendis, velit cupiditate. Distinctio eius maxime harum tempore?",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
  {
    id: "5",
    kategori: "custom",
    judul: "Kamu tim yg mana, lorem ipsum dolor sit amet",
    subjudul: "Have fun playing this level",
    jml_soal: "15",
    author: "Fin",
    like: "162",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae vel consequatur, quae delectus minima placeat id velit ducimus, sequi sapiente unde facilis sit recusandae officiis saepe! Est ab eaque voluptates doloribus possimus eveniet fuga repellat similique hic mollitia nesciunt molestias sit accusamus nemo ratione, adipisci expedita suscipit excepturi totam, natus quae reiciendis, velit cupiditate. Distinctio eius maxime harum tempore?",
    pertanyaan: [
      "Apakah bumi itu datar?",
      "Gunung tertinggi di dunia adalah..",
      "Ibukota Jepang adalah..",
      "Hasil dari 15 x 6 adalah..",
      "Siapa penemu lampu pijar?",
    ],
    pilihan_ganda: [
      ["Ya", "Tidak", "Mungkin", "AKu tidak tau"],
      ["Kilimanjaro", "Elbrus", "Everest", "Fuji"],
      ["Beijing", "Tokyo", "Seoul", "Kyoto"],
      ["80", "85", "90", "95"],
      [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Alva Edison",
        "Alexander Graham Bell",
      ],
    ],
    jawaban: ["Tidak", "Everest", "Tokyo", "90", "Thomas Alva Edison"],
  },
];

const leader = [
  {
    id_lb: "1",
    name: "Fin_1",
    score: 100,
  },
  {
    id_lb: "1",
    name: "Funixxxxx72_1",
    score: 95,
  },
  {
    id_lb: "1",
    name: "KarungGoni_1",
    score: 95,
  },
  {
    id_lb: "1",
    name: "IAmAtomic_1",
    score: 99,
  },
  {
    id_lb: "1",
    name: "Buwung1945_1",
    score: 75,
  },
  {
    id_lb: "1",
    name: "Gojlak_1",
    score: 60,
  },
  {
    id_lb: "1",
    name: "LognameFinLikeShark172617G_1",
    score: 95,
  },
  {
    id_lb: "2",
    name: "BakwanJagung42_2",
    score: 90,
  },
  {
    id_lb: "5",
    name: "HengkerProTzy_5",
    score: 85,
  },
  {
    id_lb: "5",
    name: "Hello_World_5",
    score: 80,
  },
  {
    id_lb: "4",
    name: "Haruu_4",
    score: 75,
  },
  {
    id_lb: "3",
    name: "Ama_3",
    score: 80,
  },
  {
    id_lb: "4",
    name: "Kanaya_4",
    score: 87,
  },
  {
    id_lb: "2",
    name: "MyIstrii_2",
    score: 92,
  },
  {
    id_lb: "3",
    name: "FinJr_3",
    score: 94,
  },
];
