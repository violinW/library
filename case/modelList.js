'use strict';
const campaign_model = require("./models/campaign.json");
const course_model = require("./models/course.json");
const class_model = require("./models/class.json");

module.exports = {
  Campaign: campaign_model,
  Course: course_model,
  Class: class_model
};