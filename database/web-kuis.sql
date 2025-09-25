-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 25 Sep 2025 pada 16.13
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
(409, 107, 16, '80', 0),
(410, 107, 16, '88', 0),
(411, 107, 16, '96', 1),
(412, 107, 16, '108', 0),
(413, 108, 16, '10', 0),
(414, 108, 16, '11', 0),
(415, 108, 16, '12', 1),
(416, 108, 16, '14', 0),
(417, 109, 16, '25', 0),
(418, 109, 16, '50', 1),
(419, 109, 16, '75', 0),
(420, 109, 16, '100', 0),
(421, 110, 16, '1/2', 0),
(422, 110, 16, '1/3', 0),
(423, 110, 16, '1/4', 1),
(424, 110, 16, '2/5', 0),
(425, 111, 16, '50 cm²', 0),
(426, 111, 16, '60 cm²', 1),
(427, 111, 16, '100 cm²', 0),
(428, 111, 16, '60 cm²', 1),
(429, 112, 17, 'Sungai Amazon', 0),
(430, 112, 17, 'Sungai Nil', 1),
(431, 112, 17, 'Sungai Mussissippi', 0),
(432, 112, 17, 'Sungai Yangtze', 0),
(433, 113, 17, 'Amerika Serikat', 0),
(434, 113, 17, 'India', 1),
(435, 113, 17, 'Tiongkok', 0),
(436, 113, 17, 'Indonesia', 0),
(437, 114, 17, 'Kilimanjaro', 0),
(438, 114, 17, 'Elbrus', 0),
(439, 114, 17, 'Everest', 1),
(440, 114, 17, 'Aconcagua', 0),
(441, 115, 17, 'Sahara', 1),
(442, 115, 17, 'Gobi', 0),
(443, 115, 17, 'Kalahari', 0),
(444, 115, 17, 'Atacama', 0),
(445, 116, 17, 'Sydney', 0),
(446, 116, 17, 'Melbourne', 0),
(447, 116, 17, 'Canberra', 1),
(448, 116, 17, 'Perth', 0),
(449, 117, 18, 'Airani Iofifteen', 1),
(450, 117, 18, 'Moona Hoshinova', 0),
(451, 117, 18, 'Ayunda Risu', 0),
(452, 117, 18, 'Kobo Kanaeru', 0),
(453, 118, 18, 'Kureiji Ollie', 0),
(454, 118, 18, 'Anya Melfissa', 0),
(455, 118, 18, 'Pavolia Reine', 1),
(456, 118, 18, 'Vestia Zeta', 0),
(457, 119, 18, 'Generasi 1', 0),
(458, 119, 18, 'Generasi 2', 0),
(459, 119, 18, 'Generasi 3', 1),
(460, 119, 18, 'Generasi 4', 0),
(461, 120, 18, 'Moona Hoshinova', 0),
(462, 120, 18, 'Vesria Zeta', 0),
(463, 120, 18, 'Ayunda Risu', 1),
(464, 120, 18, 'Kaela Kovalskia', 0),
(465, 121, 18, 'Kobo Kanaeru', 0),
(466, 121, 18, 'Vestia Zeta', 0),
(467, 121, 18, 'Kaela Kovalskia', 1),
(468, 121, 18, 'Anya Melfissa', 0),
(469, 122, 19, 'Seoharto dan Bung Tomo', 0),
(470, 122, 19, 'Soekarno dan Mohammad Hatta', 1),
(471, 122, 19, 'Soekarno dan Jenderal Sudirman', 0),
(472, 122, 19, 'Mohammad Hatta dan Tan Malaka', 0),
(473, 123, 19, 'Jawa', 0),
(474, 123, 19, 'Kalimantan', 1),
(475, 123, 19, 'Sumatra', 0),
(476, 123, 19, 'Papua', 0),
(477, 124, 19, 'Tanah Airku', 0),
(478, 124, 19, 'Indonesia Pusaka', 0),
(479, 124, 19, 'Indonesia Raya', 1),
(480, 124, 19, 'Rayuan Pulau Kelapa', 0),
(481, 125, 19, 'Jawa Barat', 0),
(482, 125, 19, 'Jawa Tengah', 1),
(483, 125, 19, 'Jawa Timur', 0),
(484, 125, 19, 'Yogyakarta', 0),
(485, 126, 19, 'Abdurrahman Wahid', 0),
(486, 126, 19, 'B.J. Habibie', 1),
(487, 126, 19, 'Megawati Soekarnoputri', 0),
(488, 126, 19, 'Susilo Bambang Yudhoyono', 0),
(489, 127, 20, 'Osaka', 0),
(490, 127, 20, 'Kyoto', 0),
(491, 127, 20, 'Tokyo', 1),
(492, 127, 20, 'Nagoya', 0),
(493, 128, 20, 'Kairo', 1),
(494, 128, 20, 'Alexandria', 0),
(495, 128, 20, 'Giza', 0),
(496, 128, 20, 'Luxor', 0),
(497, 129, 20, 'Rio de Janeiro', 0),
(498, 129, 20, 'Sao Paulo', 0),
(499, 129, 20, 'Brasilia', 1),
(500, 129, 20, 'Salvador', 0),
(501, 130, 20, 'Sydney', 0),
(502, 130, 20, 'Melbourne', 0),
(503, 130, 20, 'Canberra', 1),
(504, 130, 20, 'Brisbane', 0),
(505, 131, 20, 'Toronto', 0),
(506, 131, 20, 'Vancouver', 0),
(507, 131, 20, 'Ottawa', 1),
(508, 131, 20, 'Montreal', 0);

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
(16, 31, 'official', 'Matematika', 'Basik Matematika', 'Kuis yg berisi soal-soal Matematika tingkat dasar', '2025-09-25 14:02:43'),
(17, 31, 'official', 'Geografi', 'Kuis Geografi', 'Beberapa pertanyaan terkait mata pelajaran Geografi', '2025-09-25 14:02:43'),
(18, 36, 'custom', 'HololiveID Edition', 'All about HoloID', 'Kuis tentang', '2025-09-25 14:03:41'),
(19, 35, 'custom', 'Tentang Indonesia', 'Kuis yg berhubungan dengan Indonesia', 'Cakupan materi dari kuis ini mencakup banyak hal, seperti sejarah, geografi, dan masih banyak lagi', '2025-09-25 14:03:41'),
(20, 35, 'custom', 'Tebak Ibu Kota', 'Apakah kamu bisa menebaknya', 'Apakah kamu bisa menebak ibu kota dari setiap negara?', '2025-09-25 14:03:41');

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
(107, 16, 'Berapakah hasil dari 12 x 8?'),
(108, 16, 'Hasil dari 144 / 12 adalah..'),
(109, 16, 'Jika x = 5, maka nilai dari 2x² adalah'),
(110, 16, 'Bentuk pecahan dari 0,25 adalah..'),
(111, 16, 'Sebuah segitiga memiliki luas panjang alas 10 cm dan tinggi 12 cm. Luasnya adalah..'),
(112, 17, 'Sungai terpanjang di dunia adalah..'),
(113, 17, 'Negara dengan jumlah penduduk terbanyak di dunia adalah...'),
(114, 17, 'Gunung tertinggi di dunia adalah...'),
(115, 17, 'Gurun terbesar di dunia adalah'),
(116, 17, 'Ibu kota negara Australia adalah...'),
(117, 18, 'Siapakah VTuber pertama dari Hololive Indonesia Generasi 1'),
(118, 18, 'Dari Generasi 2 HoloID, siapakah yang dikenal dengan tema burung merak?'),
(119, 18, 'Kobo Kanaeru adalah VTuber dari generasi berapa?'),
(120, 18, 'Siapakah VTuber HoloID yang terkenal suka bercanda dengan \"ara-ara~\"?'),
(121, 18, 'Dari Generasi 3 HoloID, siapa yang bertema pandai besi (blacksmith)?'),
(122, 19, 'Siapakah proklamator kemerdekaan Indonesia?'),
(123, 19, 'Pulau terbesar di Indonesia adalah...'),
(124, 19, 'Lagu kebangsaan Indonesia berjudul...'),
(125, 19, 'Candi Borobudur terletak di provinsi...'),
(126, 19, 'Siapakah presiden Indonesia ketiga'),
(127, 20, 'Ibu kota Jepang adalah...'),
(128, 20, 'Ibu kota Mesir adalah...'),
(129, 20, 'Ibu kota Brasil adalah...'),
(130, 20, 'Ibu kota Australia adalah...'),
(131, 20, 'Ibu kota Kanada adalah...');

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
(34, 31, 16, 100),
(35, 38, 16, 95),
(36, 35, 16, 80),
(37, 33, 16, 78),
(38, 34, 16, 70),
(39, 36, 16, 60),
(40, 39, 16, 50),
(41, 37, 16, 60),
(42, 32, 16, 70);

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
(31, 'admin', '$2b$08$dBKVMTsQ5SvmXE5xtxjK/eBA6AyJX2noOXGn5LvQeVOwTbb2ANRue', 'user', '2025-09-25 12:28:52'),
(32, 'user', '$2b$08$ajaajMCu4v9ReKinalzbye/08OxMzfUefJA0.zOo4aAEcRFtCp6Ji', 'user', '2025-09-25 12:31:48'),
(33, 'gawrguraa', '$2b$08$hy65kZ3buSmmbjUxg8AMheogs35aEZPJlKEdJT8/rnGdFdwZJecpi', 'user', '2025-09-25 12:32:19'),
(34, 'kaelaela', '$2b$08$uPEJTdcHqrf/k7dV6b48Tek9xFnUydTdDZHbz1u7rHZ5Fa64aYTeu', 'user', '2025-09-25 12:32:55'),
(35, 'finwidth', '$2b$08$390dnC4WgS2kWdllmwgXNOzHRyjvca9mvsMJ0ZYHLImX0BQUGlh0e', 'user', '2025-09-25 12:35:00'),
(36, 'kobokers', '$2b$08$vqtSNFFGLRrw.wLr2nlVH.JbpYydkvGDhrhCFOzIez3lKOZpg8/ua', 'user', '2025-09-25 12:37:07'),
(37, 'kolonimbus', '$2b$08$K0p.ZFXM0LuU3ejCdhpwluFzk4Bf0QTphOHlLPHigjx9fKzyE6gjC', 'user', '2025-09-25 12:38:29'),
(38, 'fin172616', '$2b$08$SsWM875MKoS08A031L3/cuuv/4CQEe3z8izc1U8S8bocQhx517xma', 'user', '2025-09-25 12:38:46'),
(39, 'mamang12', '$2b$08$/RtI8GHgU49ZncsuSQUFYOUrEh.qmPXQ84u6AwS06bRFNgtkRS3yi', 'user', '2025-09-25 12:39:15');

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
  MODIFY `id_jawaban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=509;

--
-- AUTO_INCREMENT untuk tabel `tb_kuis`
--
ALTER TABLE `tb_kuis`
  MODIFY `id_kuis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `tb_like`
--
ALTER TABLE `tb_like`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT untuk tabel `tb_pertanyaan`
--
ALTER TABLE `tb_pertanyaan`
  MODIFY `id_pertanyaan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT untuk tabel `tb_skor`
--
ALTER TABLE `tb_skor`
  MODIFY `id_skor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
