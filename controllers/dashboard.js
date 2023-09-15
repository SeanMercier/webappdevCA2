"use strict";

// import all required modules
const logger = require("../utils/logger");
const uuid = require("uuid");
const accounts = require("./accounts.js");
const packStore = require("../models/pack-store.js");

// create dashboard object
const dashboard = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    if (loggedInMember) {
      const viewData = {
        title: "Movie Manager Dashboard",
        packs: packStore.getMemberPacks(loggedInMember.id),
        fullname: loggedInMember.firstName + " " + loggedInMember.lastName,
      };
      logger.info(loggedInMember);
      logger.info("about to render" + viewData.packs);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deletePack(request, response) {
    const packId = request.params.id;
    logger.debug(`Deleting Pack ${packId}`);
    packStore.deletePack(packId);
    response.redirect("/dashboard");
  },

  addPack(request, response) {
    const date = new Date();
    const loggedInMember = accounts.getCurrentMember(request);
    const newPack = {
      id: uuid(),
      userid: loggedInMember.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      movies: [],
    };
    logger.debug("Creating a new Pack" + newPack);
    packStore.addPack(newPack, function () {
      response.redirect("/dashboard");
    });
  },
};

// export the dashboard module
module.exports = dashboard;
