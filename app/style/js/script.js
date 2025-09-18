/*
di fungsi pangil_form, aku sudah membuat button kirim dengan onclick="cekFormCreateKuis()". Yang artinya kalo button itu diklik maka fungsi itu akan jalan. Di fungsi itu ada kode untuk menngcek formnya. Nah setelah dicek, aku juga nambahin kode untuk memanggil fungsi getFormQuiz trus diprintout. Tolong bikinin kode, setelah diprintout
*/

// BAgian EDit Kuis
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

// fungsi yg berfungsi untuk prosses perpindahan form basic info ke form membuat pertanyaan kuis
// Mencakup validasi form basic info, dan perpindahan dari form Basic info ke Form Pertanyaan
function basic_info_to_pertanyaan(
  a_judul,
  a_subjudul,
  a_deskripsi,
  a_jumlah_soal,
  page_1,
  page_2,
  btn_1,
  btn_2,
  action,
) {
  const judul = document.getElementById(a_judul).value.trim();
  const subjudul = document.getElementById(a_subjudul).value.trim();
  const deskripsi = document.getElementById(a_deskripsi).value.trim();
  const jumlah_soal = document.getElementById(a_jumlah_soal).value;

  // Cek Form
  if (judul === "" || subjudul === "" || deskripsi === "") {
    showAlertError("Semua field harus diisi!");
    return;
  }
  // Pindah Form
  if (action == "create") {
    callFormPertanyaanCreate(jumlah_soal);
  } else if (action == "edit") {
    callFormPertanyaanEdit(jumlah_soal);
  }
  changePage(page_1, page_2);
  changePage(btn_1, btn_2);
}

// fungsi untuk toggle hidden page a dan page b
function changePage(page_a, page_b) {
  const page_1 = document.getElementById(page_a);
  const page_2 = document.getElementById(page_b);

  page_1.classList.toggle("hidden");
  page_2.classList.toggle("hidden");
}