const db = require("../models");
const Note = db.notes;
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Title cannot be empty!" });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({ message: "Description cannot be empty!" });
      return;
    }
    // Create a Note
    const note = new Note({
      title: req.body.title,
      description: req.body.description
    });
    // Save Note in the database
    note
      .save(note)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Note."
        });
      });
  };




// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    var condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
    const { limit, offset } = getPagination(page, size);
    Tutorial.paginate(condition, { offset, limit })
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          notes: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving notes.",
        });
      });
  };




// Find a single Note with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Note with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Note with id=" + id });
      });
  };




// Update a Note by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Note with id=${id}. Maybe Note was not found!`
        });
      } else res.send({ message: "Note was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Note with id=" + id
      });
    });
};



// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
          });
        } else {
          res.send({
            message: "Note was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Note with id=" + id
        });
      });
  };




// Delete all Notes from the database.
exports.deleteAll = (req, res) => {
  Note.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Notes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notes."
      });
    });
};