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
    judul: "Test Offcial Pertama",
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
    jawaban: ["B", "C", "B", "C", "C"],
  },
  {
    id: "2",
    kategori: "official",
    judul: "Test Official Kelima",
    subjudul: "Have fun playing this level",
    jml_soal: "22",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae vel consequatur, quae delectus minima placeat id velit ducimus, sequi sapiente unde facilis sit recusandae officiis saepe! Est ab eaque voluptates doloribus possimus eveniet fuga repellat similique hic mollitia nesciunt molestias sit accusamus nemo ratione, adipisci expedita suscipit excepturi totam, natus quae reiciendis, velit cupiditate. Distinctio eius maxime harum tempore?",
  },
  {
    id: "3",
    kategori: "custom",
    judul: "My Kisah",
    subjudul: "Have fun playing this level",
    jml_soal: "100",
    author: "Fin",
    like: "12",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae vel consequatur, quae delectus minima placeat id velit ducimus, sequi sapiente unde facilis sit recusandae officiis saepe! Est ab eaque voluptates doloribus possimus eveniet fuga repellat similique hic mollitia nesciunt molestias sit accusamus nemo ratione, adipisci expedita suscipit excepturi totam, natus quae reiciendis, velit cupiditate. Distinctio eius maxime harum tempore?",
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
  },
];
