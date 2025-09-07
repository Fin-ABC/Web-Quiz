const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
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

app.get("/tes", (req, res) => {
  res.send("hallo");
});

app.get("/kuis", (req, res) => {
  const sql = "select * from tb_kuis";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Jalan di http://localhost:${port}`);
});
