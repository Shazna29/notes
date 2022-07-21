const db = require("../models");
const Student = db.students;
const User = db.user;

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
      res.status(400).send({ message: "First Name cannot be empty!" });
      return;
    }
    if (!req.body.lastName) {
      res.status(400).send({ message: "Last Name cannot be empty!" });
      return;
    }
    if (!req.body.email) {
      res.status(400).send({ message: "Email cannot be empty!" });
      return;
    }
    if (!req.body.mobile) {
      res.status(400).send({ message: "Mobile cannot be empty!" });
      return;
    }
    if (!req.body.password) {
      res.status(400).send({ message: "Password cannot be empty!" });
      return;
    }
    // Create a student
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      mobile: req.body.mobile,
      status: req.body.status ? req.body.status : false,
      password: req.body.password,
      accountType: req.body.accountType
    });
    // Save Student in the database
    student
      .save(student)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      });



       // Create a student user
    const user = new User({
      username: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.accountType
    });
    // Save Student in the database
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student user."
        });
      });

  };
  
  
  // Retrieve all students from the database.
  exports.findAll = (req, res) => {
    const { page, size, id } = req.query;
    var condition = id
      ? { id: { $regex: new RegExp(id), $options: "i" } }
      : {};
    const { limit, offset } = getPagination(page, size);
    Student.paginate(condition, { offset, limit })
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          students: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students.",
        });
      });
  };
  
  
  // Find a single Student with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Student with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Student with id=" + id });
      });
  };
  
  
  // Update a Student by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update cannot be empty!"
      });
    }
    const id = req.params.id;
    Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found!`
          });
        } else res.send({ message: "Student was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      });
  };
  