require('dotenv').config();


const express = require('express');
const cors = require('cors');
const  { MongoClient,ObjectId } = require('mongodb');
const app = express();
// middleware
app.use(cors());
app.use(express.json());
const PORTS = process.env.PORT || 5000;
  app.listen(PORTS, () => {
  console.log(`Server is running on ${PORTS}`);
});
const client = new MongoClient(`${process.env.URI}`);
 async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}
const db = client.db("Event-Manager"); 
const eventCollection = db.collection("events")


app.get('/', (req, res) => {
  res.send('Hello World');
})

app.post("/addEvent", async (req, res) => {
  const event = req.body;
  const result = await eventCollection.insertOne(event);
  res.send(result);
})
app.get("/events", async (req, res) => {
  const result = await eventCollection.find({}).toArray();
  res.send(result);
} )


connectToMongoDB()
   