import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "inciner8r",
  password: "password123@",
  database: "test",
  port: 3306,
});

const query =
  "CREATE TABLE IF NOT EXISTS blogs( id int auto_increment,title varchar(255),content text, datetime varchar(255), userid varchar(255), username varchar(255), likes int, dislikes int ,primary key(id));";
db.query(query);
const userQuery =
  "CREATE TABLE IF NOT EXISTS users( id int auto_increment,username varchar(255),email varchar(255),password varchar(255),primary key(id));";
db.query(userQuery);
app.get("/", (req, res) => {
  res.json("hello");
});

// app.get("/books", (req, res) => {
//   const q = "SELECT * FROM books";
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });
app.get("/blogs", (req, res) => {
  const q = "SELECT * FROM blogs";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/blogs/:id", (req, res) => {
  const userid = req.params.id;
  const q = "SELECT * FROM blogs WHERE userid = ? ";

  db.query(q, [userid], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// app.post("/books", (req, res) => {
//   const q =
//     "INSERT INTO books(`title`, `description`, `price`, `cover`) VALUES (?)";

//   const values = [
//     req.body.title,
//     req.body.description,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });
app.post("/blog", (req, res) => {
  const q =
    "INSERT INTO blogs(`title`, `content`, `userid`, `username`, `datetime`,`likes`,`dislikes`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.content,
    req.body.userid,
    req.body.username,
    req.body.datetime,
    0,
    0,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/register", (req, res) => {
  const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";

  const values = [req.body.username, req.body.email, req.body.password];

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

app.post("/user", (req, res) => {
  const q = "SELECT * FROM users WHERE id = ? ";

  db.query(q, [req.body.id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// app.delete("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = " DELETE FROM books WHERE id = ? ";

//   db.query(q, [bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

app.delete("/blogs/:id", (req, res) => {
  const blogid = req.params.id;
  const q = " DELETE FROM blogs WHERE id = ? ";

  db.query(q, [blogid], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Route for updating like count
app.put("/likes/:id", (req, res) => {
  const postId = req.params.id;

  // Update the like count in the database for the specified post
  db.query(
    "UPDATE blogs SET likes = likes + 1 WHERE id = ?",
    [postId],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(200);
    }
  );
});

// Route for updating dislike count
app.put("/dislikes/:id", (req, res) => {
  const postId = req.params.id;

  // Update the dislike count in the database for the specified post
  db.query(
    "UPDATE blogs SET dislikes = dislikes + 1 WHERE id = ?",
    [postId],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(200);
    }
  );
});
// app.put("/blogs/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q =
//     "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

//   const values = [
//     req.body.title,
//     req.body.description,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [...values, bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

app.listen(8080, () => {
  console.log("Connected to backend.");
});
