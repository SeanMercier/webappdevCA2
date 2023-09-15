"use strict";

// import all required modules
const logger = require("../utils/logger");
const developerStore = require("../models/developer-store.js");
const accounts = require("./accounts.js");

// create about object
const about = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    logger.info("about rendering");
    if (loggedInMember) {
      const viewData = {
        title: "About the Movie Manager App",
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInMember.firstName + " " + loggedInMember.lastName,
      };
      response.render("about", viewData);
    } else response.redirect("/");
  },
};

// export the about module
module.exports = about;
