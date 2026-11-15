require('dotenv').config();


const express = require('express');
const cors = require('cors');
const  { MongoClient,ObjectId } = require('mongodb');
// middleware
// app.use(cors());
// app.use(express.json());
const app = express();
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
connectToMongoDB()
   