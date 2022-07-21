module.exports = app => {
    const students = require("../controllers/student.controller.js");
    var router = require("express").Router();
    // Create a new Student
    router.post("/", students.create);
    // Retrieve all Students
    router.get("/", students.findAll);
    // Retrieve a single Student with id
    router.get("/:id", students.findOne);
    // Update a Note Student id
    router.put("/:id", students.update);
    app.use('/api/students', router);
  };