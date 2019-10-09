const db = require("../../config/knexConfig");

module.exports = {
  getAll_reviews,
  getReviewById,
  getReviewsByUser,
  getReviewsByLocation,
  add,
  remove,
  update,
  firstHighestRating,
  getFirstReviewByLocation
};

function getAll_reviews() {
  return db("reviews");
}

function getReviewById(id) {
  return db("reviews").where({ id });
}

//reviews by user id
function getReviewsByUser(id) {
  return db("reviews as r")
    .join("users as u", "r.user_id", "u.id")
    .join("locations as l", "r.location_id", "l.id")
    .select("u.id as userId", "u.userName", "l.locationName", "r.rating", "r.comments", "r.internet_rating")
    .where("u.id", id);
}

//reviews by location id 
function getReviewsByLocation(id) {
  return db("reviews as r")
    .join("users as u", "u.id", "r.user_id")
    .join("locations as l", "r.location_id", "l.id")
    .select("r.id as ratingId", "r.rating ", "r.comments", "r.internet_rating", "u.id", "u.userName")
    .where("l.id", id);
}

//first review posted (by location id )
function getFirstReviewByLocation(id) {
  return db("reviews as r")
    .join("users as u", "u.id", "r.user_id")
    .join("locations as l", "r.location_id", "l.id")
    .select("r.id as ratingId", "r.rating ", "r.comments", "r.internet_rating", "u.id", "u.userName")
    .where("l.id", id).first();
}




function firstHighestRating(id) {
  return db("reviews as r")
    .join("users as u", "u.id", "r.user_id")
    .join("locations as l", "r.location_id", "l.id")
    .select("l.locationName", "r.id as ratingId", "r.rating as rating_score", "r.comments", "r.internet_rating", "r.secure_wifi", "u.id as userId", "u.userName")
    .where("l.id", id).andWhere(function () {
      this.max("r.rating")
    }).first()
}


function add(review) {
  return db("reviews").insert(review).return(review);
}

function remove(id) {
  return db("reviews").where({ id }).del();
}

function update(id, update) {
  return db("reviews").where({ id }).update(update).return(update);
}

