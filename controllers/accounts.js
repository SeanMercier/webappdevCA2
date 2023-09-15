"use strict";

const memberstore = require("../models/member-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

//create an accounts object
const accounts = {
  //index function to render index page
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },
  //login function to render login page
  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },
  //logout function to render logout page
  logout(request, response) {
    response.cookie("pack", "");
    response.redirect("/");
  },
  //signup function to render signup page
  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup", viewData);
  },
  //register function to render the registration page for adding a new user
  register(request, response) {
    const member = request.body;
    member.id = uuid();
    memberstore.addMember(member);
    logger.info("registering" + member.email);
    response.redirect("/");
  },
  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie("pack", member.email);
      logger.info("logging in" + member.email);
      response.redirect("/start");
    } else {
      response.redirect("/login");
    }
  },
  //utility function getCurrentUser to check who is currently logged in
  getCurrentMember(request) {
    const memberEmail = request.cookies.pack;
    return memberstore.getMemberByEmail(memberEmail);
  },
};

module.exports = accounts;
