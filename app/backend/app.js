const mysql = require("mysql2");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web-kuis",
});

db.connect((err) => {
  if (err) {
    console.log("Gagal", err);
    return;
  }
  console.log("Database tersambung");
});

// Register
app.post("/register", (req, res) => {
  const { username, password, confirm } = req.body;

  if (!username || !password || !confirm) {
    return res.status(400).json({ error: "Semua field harus diisi!" });
  }
  if (password !== confirm) {
    return res
      .status(400)
      .json({ error: "Password tidak sama dengan konfirmasi!" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query(
    "INSERT INTO tb_user (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Username sudah digunakan!" });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User berhasil didaftarkan!" });
    },
  );
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username dan password harus diisi!" });
  }

  db.query(
    "SELECT * FROM tb_user WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(400).json({ error: "User tidak ditemukan!" });

      const user = results[0];
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ error: "Password salah!" });
      }

      const token = jwt.sign(
        { id: user.id_user, username: user.username },
        "SECRET_KEY",
        {
          expiresIn: "12h",
        },
      );

      res.json({ message: "Login berhasil!", token });
    },
  );
});

// Middleware verifikasi token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token tidak ada" });

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) return res.status(401).json({ error: "Token tidak valid" });
    req.user = user;
    next();
  });
}

// Route yang butuh login
app.get("/profile", verifyToken, (req, res) => {
  res.json({ 
    message: "Anda sudah login", 
    user: req.user,
  });
});

// Ambil semua kuis
app.get("/kuis", (req, res) => {
  const sql = `
    SELECT 
      k.id_kuis, k.judul, k.subjudul, k.deskripsi, k.kategori, k.created_at,
      u.username AS author,
      p.id_pertanyaan, p.teks_pertanyaan,
      (SELECT COUNT(*) FROM tb_like l WHERE l.id_kuis = k.id_kuis) AS jumlah_like
    FROM tb_kuis k
    JOIN tb_user u ON k.id_author = u.id_user
    LEFT JOIN tb_pertanyaan p ON k.id_kuis = p.id_kuis
    ORDER BY k.id_kuis, p.id_pertanyaan
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const kuisMap = {};

    results.forEach((row) => {
      if (!kuisMap[row.id_kuis]) {
        kuisMap[row.id_kuis] = {
          id_kuis: row.id_kuis,
          judul: row.judul,
          subjudul: row.subjudul,
          deskripsi: row.deskripsi,
          kategori: row.kategori,
          created_at: row.created_at,
          author: row.author,
          like: row.jumlah_like || "0",
          pertanyaan: [],
        };
      }

      // tambahin pertanyaan
      let pertanyaan = kuisMap[row.id_kuis].pertanyaan.find(
        (p) => p.id_pertanyaan === row.id_pertanyaan,
      );
      if (!pertanyaan && row.id_pertanyaan) {
        pertanyaan = {
          id_pertanyaan: row.id_pertanyaan,
          teks_pertanyaan: row.teks_pertanyaan,
        };
        kuisMap[row.id_kuis].pertanyaan.push(pertanyaan);
      }
    });

    res.json(Object.values(kuisMap));
  });
});

// Route ambil kuis berdasarkan ID
app.get("/kuis/:id", (req, res) => {
  const idKuis = req.params.id;
  const sql = `
    SELECT 
      k.id_kuis, k.judul, k.subjudul, k.deskripsi, k.kategori, k.created_at,
      u.username AS author,
      p.id_pertanyaan, p.teks_pertanyaan,
      jb.id_jawaban, jb.teks_jawaban, jb.is_benar,
      (SELECT COUNT(*) FROM tb_like l WHERE l.id_kuis = k.id_kuis) AS jumlah_like
    FROM tb_kuis k
    JOIN tb_user u ON k.id_author = u.id_user
    LEFT JOIN tb_pertanyaan p ON k.id_kuis = p.id_kuis
    left JOIN tb_jawaban jb ON p.id_pertanyaan = jb.id_pertanyaan
    WHERE k.id_kuis = ?
  `;

  db.query(sql, [idKuis], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Kuis tidak ditemukan" });
    }

    const kuis = {
      id_kuis: results[0].id_kuis,
      judul: results[0].judul,
      subjudul: results[0].subjudul,
      deskripsi: results[0].deskripsi,
      kategori: results[0].kategori,
      created_at: results[0].created_at,
      author: results[0].author,
      like: results[0].jumlah_like || "0",
      pertanyaan: [],
      leaderboard: [],
    };

    const pertanyaanMap = {};

    results.forEach((row) => {
      if (row.id_pertanyaan) {
        if (!pertanyaanMap[row.id_pertanyaan]) {
          pertanyaanMap[row.id_pertanyaan] = {
            id_pertanyaan: row.id_pertanyaan,
            teks_pertanyaan: row.teks_pertanyaan,
            jawaban: [],
          };
          kuis.pertanyaan.push(pertanyaanMap[row.id_pertanyaan]);
        }

        if (row.id_jawaban) {
          pertanyaanMap[row.id_pertanyaan].jawaban.push({
            id_jawaban: row.id_jawaban,
            teks_jawaban: row.teks_jawaban,
            is_benar: row.is_benar,
          });
        }
      }
    });

    // ambil leaderboard
    const sqlLeaderboard = `
      SELECT s.id_skor, s.skor, u.username 
      FROM tb_skor s
      JOIN tb_user u ON s.id_player = u.id_user
      WHERE s.id_kuis = ?
      ORDER BY s.skor DESC
      LIMIT 10
    `;

    db.query(sqlLeaderboard, [idKuis], (err, skorResults) => {
      if (err) return res.status(500).json({ error: err.message });

      kuis.leaderboard = skorResults.map((row) => ({
        id_skor: row.id_skor,
        username: row.username,
        skor: row.skor,
      }));

      res.json(kuis);
    });
  });
});

// Route: Ambil semua kuis yang dibuat
app.get("/my-kuis", verifyToken, (req, res) => {
  const idUser = req.user.id; // pastikan waktu login, JWT menyimpan { id, username }

  const sql = `
    SELECT 
      k.id_kuis, k.judul, DATE_FORMAT(k.created_at, '%d-%m-%Y') as created_at,
      u.username AS author,
      (SELECT COUNT(*) FROM tb_like l WHERE l.id_kuis = k.id_kuis) AS jumlah_like,
      (SELECT COUNT(*) FROM tb_pertanyaan p WHERE p.id_kuis = k.id_kuis) AS jumlah_pertanyaan
    FROM tb_kuis k
    JOIN tb_user u ON k.id_author = u.id_user
    WHERE k.id_author = ?
    ORDER BY k.created_at DESC
  `;

  db.query(sql, [idUser], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Jalan di http://localhost:${port}`);
});
