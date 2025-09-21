// const express = require('express');
// const mongoose = require('mongoose');
// const app = require('./app');
// const path = require("path")

// const PORT = process.env.PORT || 4000;
// const MONGO_URI = process.env.MONGO;

// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('Mongo connection error', err);
//     process.exit(1);
//   });

// //serving the frontend
// app.use(express.static(path.join(__dirname, "./frontend/dist")))

// app.get(/.*/, (req, res)=>{
//   res.sendFile(
//     path.join(__dirname, "./frontend/dist/index.html"),
//     function(err){
//        res.status(500).send(err)
//     }
//   )
// })

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
