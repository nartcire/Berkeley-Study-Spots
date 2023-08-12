const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://erictran1547:ET070502@cluster0.tpldddt.mongodb.net/?retryWrites=true&w=majority";

let listings;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(listings) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    listings = client.db("BerkeleyStudySpots").collection("listings").find({});
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = listings;
