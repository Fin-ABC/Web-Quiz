// Detail Level
const params = new URLSearchParams(window.location.search);
const idLvl = params.get("id");

// Mencari data sesuai id
const dt_level = data_quiz.find((lvl) => lvl.id === idLvl);
// Load data for Detail Page
if (dt_level) {
  const id = document.getElementById("id");
  const jdl = document.getElementById("judul");
  const sub_jdl = document.getElementById("subjudul");
  const author = document.getElementById("author");
  const jml_soal = document.getElementById("jml-soal");
  const like = document.getElementById("like");
  const deskripsi = document.getElementById("desc");

  id.textContent = `ID: ${dt_level.id}`;
  jdl.textContent = `${dt_level.judul}`;
  sub_jdl.textContent = `${dt_level.subjudul}`;
  author.textContent = `${dt_level.author}`;
  jml_soal.textContent = `${dt_level.jml_soal}`;
  like.textContent = `${dt_level.like}`;
  deskripsi.textContent = `${dt_level.deskripsi}`;

  const soal = document.getElementById("soal");
  const pg = document.getElementById("pg");
  const jwb = document.getElementById("jwb");

  soal.textContent = `${dt_level.pertanyaan[0]}`;
  pg.textContent = `${dt_level.pilihan_ganda[0]}`;
  jwb.textContent = `${dt_level.jawaban[0]}`;
}

//   Gameplay Kuis
// Variable for gameplay
let indexSoal = 0;
let jumlahBenar = 0;
let jumlahSalah = 0;
const g_page_soal = document.getElementById("gameplay-soal-page");
const g_judul = document.getElementById("gameplay-judul");
const g_soalke = document.getElementById("gameplay-soalke");
const g_soal = document.getElementById("gameplay-soal");
const g_pilihan = document.getElementById("gameplay-pilihan");
const g_hasil = document.getElementById("gameplay-hasil");
const total_soal = dt_level.pertanyaan.length;

function loadSoal() {
  if (indexSoal >= dt_level.pertanyaan.length) {
    return tampilHasil();
  }

  g_soal.textContent = dt_level.pertanyaan[indexSoal];
  g_pilihan.innerHTML = "";

  const pilihan = dt_level.pilihan_ganda[indexSoal];
  pilihan.forEach((opsi) => {
    g_judul.textContent = `${dt_level.judul}`;
    g_soalke.textContent = `${indexSoal + 1}/${total_soal}`;

    const div = document.createElement("div");
    div.textContent = opsi;
    div.classList.add("gameplay-card");
    div.addEventListener("click", () => cekJawaban(opsi));
    g_pilihan.appendChild(div);
  });
}

function cekJawaban(pilihan) {
  const jawaban_benar = dt_level.jawaban[indexSoal];

  if (pilihan === jawaban_benar) {
    jumlahBenar++;
  } else {
    jumlahSalah++;
  }

  indexSoal++;
  loadSoal();
}

function tampilHasil() {
  const point = jumlahBenar * 10;

  textContent("total", `Total Soal: ${total_soal}`);
  textContent("benar", `Total Benar: ${jumlahBenar}`);
  textContent("salah", `Total Salah: ${jumlahSalah}`);
  textContent("nilai", `Nilai: ${point}`);
  afterQuiz();
}

function afterQuiz() {
  g_hasil.classList.remove("hidden");
  g_page_soal.classList.add("hidden");
}

function resetSoal() {
  indexSoal = 0;
  jumlahBenar = 0;
  jumlahSalah = 0;
  if (!g_hasil.classList.contains("hidden")) {
    g_hasil.classList.add("hidden");
  }
  if (g_page_soal.classList.contains("hidden")) {
    g_page_soal.classList.remove("hidden");
  }

  textContent("total", "Total Soal: 0");
  textContent("benar", "Total Benar: 0");
  textContent("salah", "Total Salah: 0");
  textContent("nilai", "Nilai: 0");
}

// Public Funcion
function textContent(id, content) {
  document.getElementById(id).textContent = content;
}
