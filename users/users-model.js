const db = require("../database/dbConfig");

exports.find = () => {
  return db("users");
};

exports.findById = id => {
  return db("users")
    .where({ id })
    .first();
};

exports.add = userData => {
  return db("users")
    .insert(userData)
    .then(([id]) => {
      return this.findById(id);
    });
};

exports.findBy = filter => {
  return db("users")
    .where(filter)
    .first();
};

exports.findByDept = departmentName => {
  return db("users").where(departmentName);
};
