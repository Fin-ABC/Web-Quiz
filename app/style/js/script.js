/*
di fungsi pangil_form, aku sudah membuat button kirim dengan onclick="cekFormCreateKuis()". Yang artinya kalo button itu diklik maka fungsi itu akan jalan. Di fungsi itu ada kode untuk menngcek formnya. Nah setelah dicek, aku juga nambahin kode untuk memanggil fungsi getFormQuiz trus diprintout. Tolong bikinin kode, setelah diprintout
*/
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