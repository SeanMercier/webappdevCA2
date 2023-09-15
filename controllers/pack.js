"use strict";

const logger = require("../utils/logger");
const packStore = require("../models/pack-store");
const uuid = require("uuid");
const accounts = require("./accounts.js");

const pack = {
  index(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const packId = request.params.id;
    logger.debug("Pack id = " + packId);
    if (loggedInMember) {
      const viewData = {
        title: "Pack",
        pack: packStore.getPack(packId),
        fullname: loggedInMember.firstName + " " + loggedInMember.lastName,
      };
      response.render("pack", viewData);
    } else response.redirect("/");
  },
  deleteMovie(request, response) {
    const packId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug(`Deleting Movie ${movieId} from Pack ${packId}`);
    packStore.removeMovie(packId, movieId);
    response.redirect("/pack/" + packId);
  },
  addMovie(request, response) {
    const packId = request.params.id;
    const pack = packStore.getPack(packId);
    const newMovie = {
      id: uuid(),
      title: request.body.title,
      director: request.body.director,
      duration: request.body.duration,
    };
    packStore.addMovie(packId, newMovie);
    response.redirect("/pack/" + packId);
  },
  updateMovie(request, response) {
    const packId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("updating movie " + movieId);
    const updatedMovie = {
      title: request.body.title,
      director: request.body.director,
      genre: request.body.genre,
      duration: request.body.duration,
    };
    packStore.editMovie(packId, movieId, updatedMovie);
    response.redirect("/pack/" + packId);
  },
};

module.exports = pack;
