"use strict";

const express = require("express");
const router = express.Router();

const start = require("./controllers/start");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const pack = require("./controllers/pack.js");
const accounts = require("./controllers/accounts.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/start", start.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);

router.get("/pack/:id", pack.index);

router.get("/pack/:id/deleteMovie/:movieid", pack.deleteMovie);
router.post("/pack/:id/addmovie", pack.addMovie);

router.get("/dashboard/deletePack/:id", dashboard.deletePack);
router.post("/dashboard/addpack", dashboard.addPack);

router.post("/pack/:id/updatemovie/:movieid", pack.updateMovie);

module.exports = router;
