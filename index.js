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
const userCollection = db.collection("users")


app.get('/', (req, res) => {
  res.send('Hello World');
})
// add event
app.post("/addEvent", async (req, res) => {
  const event = req.body;
  const result = await eventCollection.insertOne(event);
  res.send(result);
})
// all events
app.get("/events", async (req, res) => {
  const result = await eventCollection.find().toArray();
  res.send(result);
})
// single event
app.get("/events/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await eventCollection.findOne(query);
  res.send(result);
})
// put event\
app.put("/events/:id", async (req, res) => {
  const id = req.params.id;
  const updatedEvent = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name: updatedEvent.name,
      date: updatedEvent.date,
      location: updatedEvent.location,
      description: updatedEvent.description,
    },
  };
  const result = await eventCollection.updateOne(filter, updateDoc, options);
  res.send(result);
})
// delete event
app.delete("/events/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await eventCollection.deleteOne(query);
  res.send(result);
})
// user
app.post("/addUser", async (req, res) => {
  const user = req.body;
  const result = await userCollection.insertOne(user);
  res.send(result);
})




connectToMongoDB()
   