const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

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
});

function tb_kuis() {
  db.query("select * from tb_kuis", (err, hasil) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log("Data dari tb_kuis");
    console.log(hasil);
  });
}

function tb_user() {
  db.query("select * from tb_user", (err, hasil) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log("Data dari tb_kuis");
    console.log(hasil);
  });
}
