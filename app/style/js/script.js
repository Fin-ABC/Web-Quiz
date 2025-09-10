// Bagian Create Page Start
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

function basic_info_to_pertanyaan() {
  document.getElementById("basic_info_judul").value = "Sample Judul";
  document.getElementById("basic_info_subjudul").value = "Sample Subjudul";
  document.getElementById("basic_info_deskripsi").value = "Sample Deskrisi";

  const judul = document.getElementById("basic_info_judul").value.trim();
  const subjudul = document.getElementById("basic_info_subjudul").value.trim();
  const deskripsi = document
    .getElementById("basic_info_deskripsi")
    .value.trim();

  if (judul === "" || subjudul === "" || deskripsi === "") {
    alert("Form Wajib Diisi");
    return;
  }
  panggil_form(document.getElementById("basic_info_jumlah_soal").value);
  changePage("form-pertanyaan", "basic-info");
}

function validasiFormPertanyaan(jml_soal) {
  for (let i = 1; i <= jml_soal; i++) {
    // Cek pertanyaan
    const pertanyaan = document.getElementById(`create_kuis_pertanyaan${i}`);
    if (!pertanyaan || pertanyaan.value.trim() === "") {
      alert("Kotak teks tidak boleh kosong");
      return false;
    }

    // Cek pilihan ganda
    let adaJawabanBenar = false;
    for (let j = 1; j <= 4; j++) {
      const pilihanInput = document.querySelector(`input[name="create_kuis_pilihan${i}_${j}"]`);
      const checkboxInput = document.querySelector(`input[name="create_kuis_benar${i}_${j}"]`);

      if (!pilihanInput || pilihanInput.value.trim() === "") {
        alert("Kotak teks tidak boleh kosong");
        return false;
      }
      if (checkboxInput && checkboxInput.checked) {
        adaJawabanBenar = true;
      }
    }

    if (!adaJawabanBenar) {
      alert("Harus pilih setidaknya 1 jawaban benar");
      return false;
    }
  }
  return true;
}

// Contoh penggunaan di cek_form_create_kuis
function cek_form_create_kuis() {
  const jumlahSoal = document.getElementById("basic_info_jumlah_soal").value;
  if (!validasiFormPertanyaan(jumlahSoal)) {
    return;
  }
  hasil = getQuizFormData(jumlahSoal);
  console.log(hasil);
}

function getQuizFormData(jml_soal) {
  const quizData = [];
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

    quizData.push({
      pertanyaan,
      pilihan_ganda,
      jawaban_benar,
    });
  }
  return quizData;
}
// Bagian Create Page End

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
