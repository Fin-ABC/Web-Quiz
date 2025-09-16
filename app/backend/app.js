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
        { id: user.id, username: user.username },
        "SECRET_KEY",
        {
          expiresIn: "1h",
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
  res.json({ message: "Berhasil masuk profile", user: req.user });
});

app.get("/test", (req, res) => {
res("Test berhasil, server berjalan lancar!");
});

// Ambil semua kuis
app.get("/kuis", (req, res) => {
  const sql = `
    SELECT 
      k.id_kuis, k.judul, k.subjudul, k.deskripsi, k.kategori, k.created_at,
      u.username AS author,
      p.id_pertanyaan, p.teks_pertanyaan,
      j.id_jawaban, j.teks_jawaban, j.is_benar,
      s.id_skor, s.id_player, s.skor
    FROM tb_kuis k
    JOIN tb_user u ON k.id_author = u.id_user
    LEFT JOIN tb_pertanyaan p ON k.id_kuis = p.id_kuis
    LEFT JOIN tb_jawaban j ON p.id_pertanyaan = j.id_pertanyaan
    LEFT JOIN tb_skor s ON k.id_kuis = s.id_kuis
    ORDER BY k.id_kuis, p.id_pertanyaan, j.id_jawaban
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
          pertanyaan: [],
          skor: [],
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
          jawaban: [],
        };
        kuisMap[row.id_kuis].pertanyaan.push(pertanyaan);
      }

      // tambahin jawaban
      if (pertanyaan && row.id_jawaban) {
        pertanyaan.jawaban.push({
          id_jawaban: row.id_jawaban,
          teks_jawaban: row.teks_jawaban,
          is_benar: row.is_benar,
        });
      }

      // tambahin skor
      if (row.id_skor) {
        kuisMap[row.id_kuis].skor.push({
          id_skor: row.id_skor,
          id_player: row.id_player,
          skor: row.skor,
        });
      }
    });

    res.json(Object.values(kuisMap));
    console.log(Object.values(kuisMap));
  });
});

app.listen(port, () => {
  console.log(`Jalan di http://localhost:${port}`);
});
