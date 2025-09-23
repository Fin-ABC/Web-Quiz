-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Sep 2025 pada 14.17
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
(44, 11, 3, 'Elbrus', 0),
(85, 26, 6, 'Amerika Serikat', 0),
(86, 26, 6, 'India', 1),
(87, 26, 6, 'China', 0),
(88, 26, 6, 'Rusia', 0),
(89, 27, 6, 'Amazon', 0),
(90, 27, 6, 'Nil', 1),
(91, 27, 6, 'Yangtze', 0),
(92, 27, 6, 'Mississippi', 0),
(93, 28, 6, 'Gobi', 0),
(94, 28, 6, 'Sahara', 1),
(95, 28, 6, 'Kalahari', 0),
(96, 28, 6, 'Atacama', 0),
(97, 29, 6, 'Torronto', 0),
(98, 29, 6, 'Ottawa', 1),
(99, 29, 6, 'Montreal', 0),
(100, 29, 6, 'Vancouver', 0),
(101, 30, 6, 'Danau Victoria', 0),
(102, 30, 6, 'Danau Toba', 0),
(103, 30, 6, 'Danau Kaspia', 1),
(104, 30, 6, 'Danau Baikal', 0),
(105, 31, 6, 'Eroap', 1),
(106, 31, 6, 'Afrika', 0),
(107, 31, 6, 'Asia', 0),
(108, 31, 6, 'Australia', 0),
(109, 32, 6, 'Gunung Kerinci', 0),
(110, 32, 6, 'Gunung Jayawijaya', 1),
(111, 32, 6, 'Gunung Semeru', 0),
(112, 32, 6, 'Gunung Rinjani', 0),
(113, 33, 6, 'Filipina', 0),
(114, 33, 6, 'Jepang', 0),
(115, 33, 6, 'Indonesia', 1),
(116, 33, 6, 'Maladewa', 0),
(117, 34, 6, 'Kapuas', 1),
(118, 34, 6, 'Mahakam', 0),
(119, 34, 6, 'Musi', 0),
(120, 34, 6, 'Barito', 0),
(121, 35, 6, 'Auckland', 0),
(122, 35, 6, 'Christchurch', 0),
(123, 35, 6, 'Wellington', 1),
(124, 35, 6, 'Hamilton', 0),
(145, 41, 8, '25k', 1),
(146, 41, 8, '20k', 0),
(147, 41, 8, '100k', 0),
(148, 41, 8, '50k', 0),
(149, 42, 8, '30k', 0),
(150, 42, 8, '100k', 1),
(151, 42, 8, '40k', 0),
(152, 42, 8, '50k', 0),
(153, 43, 8, 'iya', 1),
(154, 43, 8, 'mungkin', 0),
(155, 43, 8, 'tidak', 0),
(156, 43, 8, 'iyaa sekali', 0),
(157, 44, 8, 'hitam', 1),
(158, 44, 8, 'merah', 0),
(159, 44, 8, 'putih', 0),
(160, 44, 8, 'kuning', 0),
(161, 45, 8, 'padasuka', 1),
(162, 45, 8, 'curug', 0),
(163, 45, 8, 'tampomas', 0),
(164, 45, 8, 'bandung', 0),
(285, 76, 5, 'kk', 1),
(286, 76, 5, 'kk', 1),
(287, 76, 5, 'kk', 1),
(288, 76, 5, 'kk', 1),
(289, 77, 5, 'kk', 1),
(290, 77, 5, 'kk', 1),
(291, 77, 5, 'kk', 1),
(292, 77, 5, 'kk', 1),
(293, 78, 5, 'kk', 1),
(294, 78, 5, 'kk', 1),
(295, 78, 5, 'kk', 1),
(296, 78, 5, 'kk', 1),
(297, 79, 5, 'kk', 1),
(298, 79, 5, 'kk', 1),
(299, 79, 5, 'kk', 1),
(300, 79, 5, 'kk', 1),
(301, 80, 5, 'kk', 1),
(302, 80, 5, 'kk', 1),
(303, 80, 5, 'kk', 1),
(304, 80, 5, 'kk', 1),
(305, 81, 5, 'tes1', 1),
(306, 81, 5, 'tes2', 1),
(307, 81, 5, 'tes3', 1),
(308, 81, 5, 'tes4', 1),
(309, 82, 14, 'waioejhw', 1),
(310, 82, 14, 'wewqe', 0),
(311, 82, 14, 'rwdwdw', 0),
(312, 82, 14, 'wdwd', 0),
(313, 83, 14, 'wewr', 1),
(314, 83, 14, 'fsdf', 0),
(315, 83, 14, 'dggfed', 0),
(316, 83, 14, 'fdgegf', 0),
(317, 84, 14, 'fewf', 0),
(318, 84, 14, 'wfwefwe', 0),
(319, 84, 14, 'ewfewf', 1),
(320, 84, 14, 'fwe', 0),
(321, 85, 14, '6', 0),
(322, 85, 14, 'pp', 0),
(323, 85, 14, 'aa', 0),
(324, 85, 14, '4', 1),
(325, 86, 14, 'a', 0),
(326, 86, 14, 'Danau Toba', 0),
(327, 86, 14, 'Danau Kaspia', 1),
(328, 86, 14, 'Mungkin', 0);

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
(3, 2, 'official', 'Kisah Kuis', 'Kisah Kuis adalah kuis ', 'Kisah Kuis adalah kuis yang berkisah kasih', '2025-09-17 14:00:51'),
(5, 25, '', 'Editan Cuy', 'SubJudul', 'MyDeskripsi', '2025-09-22 05:20:09'),
(6, 25, 'custom', 'Geografi', 'Yah Geografi biasa', 'lalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalala', '2025-09-18 02:09:20'),
(8, 27, 'custom', 'refal galon', 'refal pln', 'bbbef', '2025-09-18 06:46:51'),
(14, 29, 'custom', 'hhs', '191', 'hss', '2025-09-22 11:46:27');

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
(15, 3, 'Penulis novel Laskar Pelangi adalah...'),
(26, 6, 'Negara dengan jumlah penduduk terbanyak di dunia adalah...'),
(27, 6, 'Sugai terpanjang di dunia adalah...'),
(28, 6, 'Gurun terbesar di dunia adalah..'),
(29, 6, 'Ibukota negara Kanada adalah...'),
(30, 6, 'Danau terbesar di dunia berdasarkan luas permukaan adalah...'),
(31, 6, 'Benua yang tidak memiliki gurun adalah...'),
(32, 6, 'Gunung tertinggi di Indonesia adalah...'),
(33, 6, 'Negara kepulauan terbesar di dunia adalah...'),
(34, 6, 'Sungai terpanjang di Indonesia adalah...'),
(35, 6, 'Ibukota negara Selandia Baru adalah...'),
(41, 8, 'bereapa harga galon dari refal'),
(42, 8, 'berapa harga bayar listrik kerefal'),
(43, 8, 'apa refal gelo'),
(44, 8, 'warna sepatu refal warna apa'),
(45, 8, 'dimana rumah refal'),
(76, 5, 'Apakah kamu bisa?'),
(77, 5, 'Ada berapa versi epos Mahabarata'),
(78, 5, 'Pertanyaan ke-3'),
(79, 5, 'Nafas kok manual'),
(80, 5, 'Bukankah ini'),
(81, 5, 'Myyy'),
(82, 14, 'pertanyaan 1'),
(83, 14, 'wleme'),
(84, 14, 'wefewfe'),
(85, 14, 'gjggjjg'),
(86, 14, 'Danau terbesar di dunia berdasarkan luas permukaan adalah...');

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
(16, 26, 2, 50),
(17, 26, 6, 100),
(18, 25, 6, 40),
(29, 27, 1, 60),
(32, 29, 8, 80);

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
(26, 'finAdmin', '$2b$08$yU5NGXLxDWvvhM1r8qkvPOtaZ/0pWsgAIcsCzfLIRla5kFO84kgIq', 'admin', '2025-09-16 08:11:27'),
(27, 'dino2123', '$2b$08$n3mLjceXpG2Jg4yl7qOpteX4oiaJ6XDAd3maeLzKAdYQpoNeI3QcK', 'user', '2025-09-18 04:13:03'),
(28, 'fahri', '$2b$08$kbE.g.9dVU9gQxMK8iM4luwkKc/hWkxNL2EZM/2c5Re0Tqo7XZ9da', 'user', '2025-09-19 02:16:16'),
(29, 'pahri', '$2b$08$X2xbBMP0oJ7btlQHn4vWpub9bhZif/2rLYBvNi67.mm.ic5JgN5s6', 'user', '2025-09-22 11:31:34');

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
  MODIFY `id_jawaban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=329;

--
-- AUTO_INCREMENT untuk tabel `tb_kuis`
--
ALTER TABLE `tb_kuis`
  MODIFY `id_kuis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `tb_like`
--
ALTER TABLE `tb_like`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `tb_pertanyaan`
--
ALTER TABLE `tb_pertanyaan`
  MODIFY `id_pertanyaan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT untuk tabel `tb_skor`
--
ALTER TABLE `tb_skor`
  MODIFY `id_skor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
