const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const db = require("./configs/db");
const UserRouter = require("./routes/UserRouter");


const app = express();

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.log("Unable to connect to the database:", error);
}

app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

let PORT = process.env.PORT || 5555;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", UserRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} || http://localhost:${PORT} `);
});
