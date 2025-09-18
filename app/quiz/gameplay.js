// Detail Level
const params = new URLSearchParams(window.location.search);
const idLvl = params.get("id");

// Mencari data sesuai id
let dt_level;

fetch(`http://localhost:3000/kuis/${idLvl}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    dt_level = {
      id: data.id_kuis,
      judul: data.judul,
      subjudul: data.subjudul,
      author: data.author,
      jml_soal: data.pertanyaan.length,
      like: data.like || "0",
      deskripsi: data.deskripsi,
      pertanyaan: data.pertanyaan.map((p) => p.teks_pertanyaan),
      pilihan_ganda: data.pertanyaan.map((p) =>
        p.jawaban.map((j) => j.teks_jawaban),
      ),
      jawaban: data.pertanyaan.map(
        (p) => p.jawaban.find((j) => j.is_benar === 1)?.teks_jawaban || "",
      ),
    };
    total_soal = dt_level.pertanyaan.length;

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
    pg.textContent =
      Array.isArray(dt_level.pilihan_ganda[0]) &&
      dt_level.pilihan_ganda[0].length > 0
        ? dt_level.pilihan_ganda[0].join(", ")
        : "Pilihan tidak tersedia";
    jwb.textContent = `${dt_level.jawaban[0]}`;
  })
  .catch((err) => console.error(err));

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
const g_ldb = document.getElementById("gameplay-leaderboard");
let total_soal = 0;

// Load data untuk card soal dan card pilihan ganda
function loadSoal() {
  // Untuk ngecek jika user sudah menjawab lebih dari jumlah pertanyaan maka return tampilHasil
  if (indexSoal >= dt_level.pertanyaan.length) {
    return tampilHasil();
  }

  g_soal.textContent = dt_level.pertanyaan[indexSoal];
  g_pilihan.innerHTML = "";

  const pilihan = dt_level.pilihan_ganda[indexSoal];
  if (Array.isArray(pilihan) && pilihan.length > 0) {
    pilihan.forEach((opsi) => {
      g_judul.textContent = `${dt_level.judul}`;
      g_soalke.textContent = `${indexSoal + 1}/${total_soal}`;

      const div = document.createElement("div");
      div.textContent = opsi;
      div.classList.add("gameplay-card");
      div.addEventListener("click", () => cekJawaban(opsi));
      g_pilihan.appendChild(div);
    });
  } else {
    g_pilihan.textContent = "Pilihan tidak tersedia";
  }
}

// Untuk memeriksa jawaban user
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

// Fungsi untuk menghitung dan menampilkan hasil dari kuis yg dimainkan user
function tampilHasil() {
  const persen = 100 / dt_level.pertanyaan.length;
  const point = jumlahBenar * persen;
  const token = localStorage.getItem("token");

  textContent("total", `${total_soal}`);
  textContent("benar", `${jumlahBenar}`);
  textContent("salah", `${jumlahSalah}`);
  textContent("nilai", `${point}%`);

  g_hasil.classList.remove("hidden");
  g_page_soal.classList.add("hidden");

  fetch("http://localhost:3000/add-leaderboard", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_kuis: dt_level.id,
      skor: point,
    }),
  });
}

// ngambil data leaderboard
function loadLeaderboard() {
  fetch(`http://localhost:3000/leaderboard/${idLvl}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Leaderboard:", data);

      const lb_list = document.getElementById("leaderboard-list");
      lb_list.innerHTML = "";

      data.forEach((player, i) => {
        const div = document.createElement("div");
        div.className = "leaderboard-items";
        div.innerHTML = `
      <span class="leaderboard-items-rank">${i + 1}</span>
      <span class="leaderboard-items-name">${player.username}</span>
      <span class="leaderboard-items-skor">${player.skor}</span>
    `;
        lb_list.appendChild(div);
      });
    })
    .catch((err) => {
      console.error("Gagal ambil leaderboard:", err);
    });
}

// Fungsi untuk mengreset page hasil dan pertanyaan
function resetSoal() {
  indexSoal = 0;
  jumlahBenar = 0;
  jumlahSalah = 0;
  if (!g_hasil.classList.contains("hidden")) {
    g_hasil.classList.add("hidden");
  }
  if (!g_ldb.classList.contains("hidden")) {
    g_ldb.classList.add("hidden");
  }
  if (g_page_soal.classList.contains("hidden")) {
    g_page_soal.classList.remove("hidden");
  }

  textContent("total", "0");
  textContent("benar", "0");
  textContent("salah", "0");
  textContent("nilai", "0");
}

// Public Funcion
function textContent(id, content) {
  document.getElementById(id).textContent = content;
}
