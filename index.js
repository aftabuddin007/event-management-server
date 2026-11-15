require('dotenv').config();


const express = require('express');
const cors = require('cors');
const  { MongoClient,ObjectId } = require('mongodb');
// middleware
// app.use(cors());
// app.use(express.json());
const app = express();
const PORT = 5000;
  app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
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
app.get('/', (req, res) => {
  res.send('Hello World');
})
connectToMongoDB()
   