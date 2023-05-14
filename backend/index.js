import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "db",
  user: "user",
  password: "password123@",
  database: "test",
  port: 3306,
});

const query =
  "CREATE TABLE IF NOT EXISTS books( id int auto_increment,title varchar(255),description varchar(255),price int,cover varchar(255),primary key(id));";
db.query(query);
const userQuery =
  "CREATE TABLE IF NOT EXISTS users( id int auto_increment,name varchar(255),username varchar(255),email varchar(255),password varchar(255),primary key(id));";
db.query(userQuery);
app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books(`title`, `description`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/register", (req, res) => {
  const q =
    "INSERT INTO users(`name`, `username`, `email`, `password`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.username,
    req.body.email,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE username = ? ";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8080, () => {
  console.log("Connected to backend.");
});
