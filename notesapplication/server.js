require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));
var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");

const Role = db.role;
// db.sequelize.sync();

db.mongoose
  .connect('mongodb://localhost:27017/notesappdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to notess application." });
// });

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});



require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/note.routes")(app);
require("./app/routes/student.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "student"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'student' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  module.export = db;