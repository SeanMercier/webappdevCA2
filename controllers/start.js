"use strict";

// import all required modules
const logger = require("../utils/logger");
const packStore = require("../models/pack-store.js");
const accounts = require("./accounts.js");

// create start object
const start = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    logger.info("start rendering");

    if (loggedInMember) {
      const packs = packStore.getAllPacks();
      let numPacks = packs.length;
      let numMovies = 0;
      for (let item of packs) {
        numMovies += item.movies.length;
      }

      const viewData = {
        title: "Welcome to the Movie Manager App!",
        totalPacks: numPacks,
        totalMovies: numMovies,
        fullname: loggedInMember.firstName + " " + loggedInMember.lastName,
      };

      response.render("start", viewData);
    } else response.redirect("/");
  },
};

// export the start module
module.exports = start;
