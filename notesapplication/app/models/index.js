const dbConfig = require("../config/db.config.js");
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.notes = require("./note.model.js")(mongoose, mongoosePaginate);
db.students = require("./student.model.js")(mongoose, mongoosePaginate);
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["student", "admin"];
module.exports = db;