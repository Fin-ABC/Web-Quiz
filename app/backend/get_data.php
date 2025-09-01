<?php
header("Content-Type: application/json");
include "config.php";

$cmd = "SELECT * FROM quiz";
$hasil = $conn->query($sql);

$quizzes = [];

while ($row = $hasil->fetch_assoc()) {
    $quiz_id = $row["id"];

    $sql_q = "SELECT * FROM pertanyaan WHERE quiz_id = $quiz_id";
    $res_q = $conn->query($sql_q);

    $pertanyaan_list = [];

    while ($q = $res_q->fetch_assoc()) {
        $pertanyaan_id = $q["id"];

        $sql_p = "SELECT opsi FROM pilihan WHERE pertanyaan_id = $pertanyaan_id";
        $res_p = $conn->query($sql_p);

        $pilihan_list = [];
        while ($p = $res_p->fetch_assoc()) {
            $pilihan_list[] = $p["opsi"];
        }

        $pertanyaan_list[] = [
            "soal" => $q["soal"],
            "jawaban" => $q["jawaban_benar"],
            "pilihan_ganda" => $pilihan_list
        ];
    }

    $quizzes[] = [
        "id" => $row["id"],
        "kategori" => $row["kategori"],
        "judul" => $row["judul"],
        "subjudul" => $row["subjudul"],
        "jml_soal" => $row["jml_soal"],
        "author" => $row["author"],
        "deskripsi" => $row["deskripsi"],
        "pertanyaan" => $pertanyaan_list
    ];
}

echo json_encode($quizzes, JSON_PRETTY_PRINT);
?>
