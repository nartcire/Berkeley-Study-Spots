const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://erictran1547:ET070502@cluster0.tpldddt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Gets All Listings
router.get("/", async (req, res) => {
  let listings;

  try {
    await client.connect();
    listings = await client
      .db("BerkeleyStudySpots")
      .collection("listings")
      .find({})
      .toArray();
  } finally {
    await client.close();
  }

  res.json(listings);
});

// Get Single Listing
router.get("/:id", async (req, res) => {
  let listings;

  try {
    await client.connect();
    listings = await client
      .db("BerkeleyStudySpots")
      .collection("listings")
      .find({})
      .toArray();
  } finally {
    await client.close();
  }

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
