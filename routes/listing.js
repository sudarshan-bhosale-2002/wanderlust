// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js");
// const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const listingController = require("../controller/listing.js");
// const multer = require("multer");
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const listingController = require("../controller/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

router
  .route("/")
  // Index Route
  .get(wrapAsync(listingController.index))
  // Create Route
  .post(
    isLoggedIn,
    upload.single("listing[images]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router
  .route("/:id")
  // Show Route
  .get(wrapAsync(listingController.showListing))
  //Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[images]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  // Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
