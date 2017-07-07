'use strict';
const course_model = require("./models/course.json");
const class_model = require("./models/class.json");
const student_model = require("./models/student.json");

module.exports = {
  Student: student_model,
  Course: course_model,
  Class: class_model
};