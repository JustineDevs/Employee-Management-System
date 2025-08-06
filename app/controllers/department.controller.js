const db = require("../models");
const Department = db.department;

// Create and save a new Department
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Department
  const department = new Department({
    name: req.body.name,
    description: req.body.description,
    manager: req.body.manager,
    location: req.body.location,
    departmentCode: req.body.departmentCode
  });

  // Save Department in the database
  department
    .save(department)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department."
      });
    });
};

// Retrieve all Departments from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Department.find(condition)
    .populate('manager', 'firstName lastName')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving departments."
      });
    });
};

// Find a single Department with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findById(id)
    .populate('manager', 'firstName lastName')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Department with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Department with id=" + id });
    });
};

// Update a Department by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found!`
        });
      } else res.send({ message: "Department was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Department with id=" + id
      });
    });
};

// Delete a Department with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Department.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
        });
      } else {
        res.send({
          message: "Department was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Department with id=" + id
      });
    });
};

// Delete all Departments from the database
exports.deleteAll = (req, res) => {
  Department.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Departments were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all departments."
      });
    });
};

// Find all active Departments
exports.findAllActive = (req, res) => {
  Department.find({ isActive: true })
    .populate('manager', 'firstName lastName')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving active departments."
      });
    });
}; 