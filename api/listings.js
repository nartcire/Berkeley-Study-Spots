const express = require("express");
const router = express.Router();
const listings = require("../data/data.js");
const uuid = require("uuid");

// Gets All Listings
router.get("/", (req, res) => {
  res.json(listings);
});

// Get Single Listing
router.get("/:id", (req, res) => {
  const found = listings.some(
    (listing) => listing.ID === Number(req.params.id)
  );

  if (found) {
    res.json(
      listings.filter((listing) => listing.ID === Number(req.params.id))
    );
  } else {
    res.status(400).json({ msg: "Listing not found" });
  }
});

// Create A Member
// TODO

// Update A Member
// TODO

//Delete A Listing
// TODO

module.exports = router;
