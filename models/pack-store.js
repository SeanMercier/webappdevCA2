"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const cloudinary = require("cloudinary");
const logger = require("../utils/logger");

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
} catch (e) {
  logger.info("You must provide a Cloudinary credentials file - see README.md");
  process.exit(1);
}

const packStore = {
  store: new JsonStore("./models/pack-store.json", { packCollection: [] }),
  collection: "packCollection",

  getAllPacks() {
    return this.store.findAll(this.collection);
  },

  getPack(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addPack(pack, response) {
    pack.picture.mv("tempimage", (err) => {
      if (!err) {
        cloudinary.uploader.upload("tempimage", (result) => {
          console.log(result);
          pack.picture = result.url;
          response();
        });
      }
    });
    this.store.add(this.collection, pack);
  },

  deletePack(id) {
    const pack = this.getPack(id);
    this.store.remove(this.collection, pack);
  },

  removeAllPacks() {
    this.store.removeAll(this.collection);
  },

  addMovie(id, movie) {
    const pack = this.getPack(id);
    pack.movies.push(movie);
  },

  removeMovie(id, movieId) {
    const pack = this.getPack(id);
    const movies = pack.movies;
    _.remove(movies, { id: movieId });
  },

  editMovie(id, movieId, updatedMovie) {
    const pack = this.getPack(id);
    const movies = pack.movies;
    const index = movies.findIndex((movie) => movie.id === movieId);
    movies[index].title = updatedMovie.title;
    movies[index].director = updatedMovie.director;
    movies[index].genre = updatedMovie.genre;
    movies[index].duration = updatedMovie.duration;
  },
  getMemberPacks(userid) {
    logger.info("userid passed to getMemberPacks" + userid);
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = packStore;
