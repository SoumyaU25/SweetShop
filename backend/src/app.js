require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")

const authRoutes = require('./routes/auth');
const sweetsRoutes = require('./routes/sweets');

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO;

const app = express();

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

//serving the frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get(/.*/, (req, res)=>{
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html"),
    function(err){
       res.status(500).send(err)
    }
  )
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



//module.exports = app;
