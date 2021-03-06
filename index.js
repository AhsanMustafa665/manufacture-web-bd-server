const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v1xk5w7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const toolCollection = client.db("tools-portal").collection("services");
    const reviewsCollection = client.db("tools-portal").collection("reviews");
    const ordersCollection = client.db("tools-portal").collection("orders");

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = toolCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/reviews", async (req, res) => {
      console.log(req.query);
      const get = reviewsCollection.find({});
      console.log("Request to find reviews");
      reviews = await get.toArray();
      res.send(reviews);
      console.log("Found all reviews", reviews);
    });

    app.get("/orders", async (req, res) => {
      console.log(req.query);
      const get = ordersCollection.find({});
      console.log("Request to find orders");
      orders = await get.toArray();
      res.send(orders);
      console.log("Found all orders", orders);
    });

    app.post("/reviews", async (req, res) => {
      const newReviews = req.body;
      console.log("Request from UI ", newReviews);
      const result = await reviewsCollection.insertOne(newReviews);
      console.log("Successfully Added New reviews ", result);
      res.json(result);
    });

    app.post("/orders", async (req, res) => {
      const newReviews = req.body;
      console.log("Request from UI ", newReviews);
      const result = await ordersCollection.insertOne(newReviews);
      console.log("Successfully Added New orders ", result);
      res.json(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Manufacturer-website is running");
});

app.listen(port, () => {
  console.log("Backend is running", port);
});
