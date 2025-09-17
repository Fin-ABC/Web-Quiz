-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Sep 2025 pada 17.07
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web-kuis`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_jawaban`
--

CREATE TABLE `tb_jawaban` (
  `id_jawaban` int(11) NOT NULL,
  `id_pertanyaan` int(11) NOT NULL,
  `id_kuis` int(11) NOT NULL,
  `teks_jawaban` varchar(50) NOT NULL,
  `is_benar` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_jawaban`
--

INSERT INTO `tb_jawaban` (`id_jawaban`, `id_pertanyaan`, `id_kuis`, `teks_jawaban`, `is_benar`) VALUES
(1, 1, 1, 'Ya', 0),
(2, 1, 1, 'Tidak', 1),
(3, 1, 1, 'Mungkin', 1),
(4, 1, 1, 'Tidak Tau', 0),
(5, 2, 1, 'Cepuluh', 0),
(6, 2, 1, '4', 0),
(7, 2, 1, 'Tiga', 1),
(8, 2, 1, '3', 1),
(9, 3, 1, 'Iya', 1),
(10, 3, 1, 'Tak tau', 0),
(11, 3, 1, 'Laut itu manis', 0),
(12, 3, 1, 'Tentu Saja', 1),
(13, 4, 1, 'Salah', 0),
(14, 4, 1, 'Benar', 1),
(15, 4, 1, 'Benar', 1),
(16, 4, 1, 'Salah', 0),
(17, 5, 1, 'Salah', 0),
(18, 5, 1, 'Benar', 1),
(19, 5, 1, 'Benar', 1),
(20, 5, 1, 'Salah', 0),
(21, 6, 2, 'Venus', 0),
(22, 6, 2, 'Mars', 1),
(23, 6, 2, 'Jupiter', 0),
(24, 6, 2, 'Saturnus', 0),
(25, 7, 2, 'Andrea Hirata', 1),
(26, 7, 2, 'Tere Liye', 0),
(27, 7, 2, 'Habiburrahman El Shirazy', 0),
(28, 7, 2, 'Dee Lestari', 0),
(29, 8, 2, 'C++', 0),
(30, 8, 2, 'Java', 1),
(31, 8, 2, 'Python', 0),
(32, 8, 2, 'PHP', 0),
(33, 9, 2, 'Beijing', 0),
(34, 9, 2, 'Tokyo', 1),
(35, 9, 2, 'Kyoto', 0),
(36, 9, 2, 'Osaka', 0),
(37, 10, 2, 'Ayam', 0),
(38, 10, 2, 'Ular', 0),
(39, 10, 2, 'Katak', 0),
(40, 10, 2, 'Kucing', 1),
(41, 11, 3, 'Kilimanjaro', 0),
(42, 11, 3, 'Everest', 1),
(43, 11, 3, 'Fuji', 0),
(44, 11, 3, 'Elbrus', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_kuis`
--

CREATE TABLE `tb_kuis` (
  `id_kuis` int(11) NOT NULL,
  `id_author` int(11) NOT NULL,
  `kategori` enum('custom','official') NOT NULL,
  `judul` varchar(20) NOT NULL,
  `subjudul` varchar(40) NOT NULL,
  `deskripsi` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_kuis`
--

INSERT INTO `tb_kuis` (`id_kuis`, `id_author`, `kategori`, `judul`, `subjudul`, `deskripsi`, `created_at`) VALUES
(1, 2, 'official', 'Kuis Dummy', 'Hanya sample kuis', 'Apa? ini hanya sample alias cuman contoh kuis aja buat ngetes apakah jalan apa enggak fitur2nya, isinya juga palingan pertanyaan random dari admin. Sekian Terima Gaji.', '2025-09-17 01:59:13'),
(2, 1, 'custom', 'My Kuis', 'Kuis sample dari user', 'Abang tukang timpa, mari, mari sini\r\nAku mau doksi\r\nAbang tukang timpa, cepat kasih doksi\r\nSudah tak tahan lagi', '2025-08-24 03:15:17'),
(3, 2, 'official', 'Kisah Kuis', 'Kisah Kuis adalah kuis ', 'Kisah Kuis adalah kuis yang berkisah kasih', '2025-09-17 14:00:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_like`
--

CREATE TABLE `tb_like` (
  `id_like` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_kuis` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_like`
--

INSERT INTO `tb_like` (`id_like`, `id_user`, `id_kuis`, `created_at`) VALUES
(1, 25, 1, '2025-09-17 02:00:21'),
(2, 26, 1, '2025-09-17 02:00:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_pertanyaan`
--

CREATE TABLE `tb_pertanyaan` (
  `id_pertanyaan` int(11) NOT NULL,
  `id_kuis` int(11) NOT NULL,
  `teks_pertanyaan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_pertanyaan`
--

INSERT INTO `tb_pertanyaan` (`id_pertanyaan`, `id_kuis`, `teks_pertanyaan`) VALUES
(1, 1, 'Apakah bumi itu datar?'),
(2, 1, 'Secara astronomi, dalam tata surya, planet Bumi merupakan planet urutan ke berapa?'),
(3, 1, 'Apakah laut itu asin?'),
(4, 1, 'NKRI merupakan singkatan dari?'),
(5, 1, 'Au ah, bingung mau ngasih pertanyaan apa'),
(6, 2, 'Planet apa yang dikenal dengan planet merah?'),
(7, 2, 'Siapa penulis novel Laskar Pelangi'),
(8, 2, 'Bahasa pemograman apa yang logonya berupa cangkir kopi'),
(9, 2, 'Ibu kota dari Jepang adalah...'),
(10, 2, 'Hewan manakan yang termasuk mamalia?'),
(11, 3, 'Gunung tertinggi di dunia adalah...'),
(12, 3, 'Unsur kimia dengan simbol \"Au\" adalah...'),
(13, 3, 'Tahun berapa Indonesia merdeka?'),
(14, 3, 'Organ manusia yang berfungsi memompa darah adalah...'),
(15, 3, 'Penulis novel Laskar Pelangi adalah...');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_skor`
--

CREATE TABLE `tb_skor` (
  `id_skor` int(11) NOT NULL,
  `id_player` int(11) NOT NULL,
  `id_kuis` int(11) NOT NULL,
  `skor` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_skor`
--

INSERT INTO `tb_skor` (`id_skor`, `id_player`, `id_kuis`, `skor`) VALUES
(6, 1, 1, 100),
(7, 2, 1, 95),
(16, 26, 2, 50);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user`
--

CREATE TABLE `tb_user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_user`
--

INSERT INTO `tb_user` (`id_user`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'user', '$2b$08$w3BWCoADEw9TlaGce6cPRO/fca7mk2y0RQMfInGleE8whearH7nYO', 'user', '2025-09-17 12:46:09'),
(2, 'admin', '$2b$08$w3BWCoADEw9TlaGce6cPRO/fca7mk2y0RQMfInGleE8whearH7nYO', 'admin', '2025-09-17 12:46:16'),
(25, 'fin1', '$2b$08$w3BWCoADEw9TlaGce6cPRO/fca7mk2y0RQMfInGleE8whearH7nYO', 'user', '2025-09-16 07:46:18'),
(26, 'finAdmin', '$2b$08$yU5NGXLxDWvvhM1r8qkvPOtaZ/0pWsgAIcsCzfLIRla5kFO84kgIq', 'admin', '2025-09-16 08:11:27');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_jawaban`
--
ALTER TABLE `tb_jawaban`
  ADD PRIMARY KEY (`id_jawaban`),
  ADD KEY `fk_id_pertanyaan` (`id_pertanyaan`),
  ADD KEY `id_kuis` (`id_kuis`);

--
-- Indeks untuk tabel `tb_kuis`
--
ALTER TABLE `tb_kuis`
  ADD PRIMARY KEY (`id_kuis`),
  ADD KEY `fk_author` (`id_author`);

--
-- Indeks untuk tabel `tb_like`
--
ALTER TABLE `tb_like`
  ADD PRIMARY KEY (`id_like`),
  ADD UNIQUE KEY `id_user` (`id_user`,`id_kuis`),
  ADD KEY `id_kuis` (`id_kuis`);

--
-- Indeks untuk tabel `tb_pertanyaan`
--
ALTER TABLE `tb_pertanyaan`
  ADD PRIMARY KEY (`id_pertanyaan`),
  ADD KEY `fk_id_kuis` (`id_kuis`);

--
-- Indeks untuk tabel `tb_skor`
--
ALTER TABLE `tb_skor`
  ADD PRIMARY KEY (`id_skor`),
  ADD KEY `fk_id_player` (`id_player`),
  ADD KEY `id_kuis` (`id_kuis`);

--
-- Indeks untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `u_username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tb_jawaban`
--
ALTER TABLE `tb_jawaban`
  MODIFY `id_jawaban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `tb_kuis`
--
ALTER TABLE `tb_kuis`
  MODIFY `id_kuis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `tb_like`
--
ALTER TABLE `tb_like`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `tb_pertanyaan`
--
ALTER TABLE `tb_pertanyaan`
  MODIFY `id_pertanyaan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `tb_skor`
--
ALTER TABLE `tb_skor`
  MODIFY `id_skor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_jawaban`
--
ALTER TABLE `tb_jawaban`
  ADD CONSTRAINT `fk_id_pertanyaan` FOREIGN KEY (`id_pertanyaan`) REFERENCES `tb_pertanyaan` (`id_pertanyaan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_jawaban_ibfk_1` FOREIGN KEY (`id_kuis`) REFERENCES `tb_kuis` (`id_kuis`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tb_kuis`
--
ALTER TABLE `tb_kuis`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`id_author`) REFERENCES `tb_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tb_like`
--
ALTER TABLE `tb_like`
  ADD CONSTRAINT `tb_like_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `tb_like_ibfk_2` FOREIGN KEY (`id_kuis`) REFERENCES `tb_kuis` (`id_kuis`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tb_pertanyaan`
--
ALTER TABLE `tb_pertanyaan`
  ADD CONSTRAINT `fk_id_kuis` FOREIGN KEY (`id_kuis`) REFERENCES `tb_kuis` (`id_kuis`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tb_skor`
--
ALTER TABLE `tb_skor`
  ADD CONSTRAINT `fk_id_player` FOREIGN KEY (`id_player`) REFERENCES `tb_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_skor_ibfk_1` FOREIGN KEY (`id_kuis`) REFERENCES `tb_kuis` (`id_kuis`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
