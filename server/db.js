const mongoose = require ('mongoose');

const mongoURI = "mongodb://localhost:27017/Haa"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.log('Error connecting to database:', error);
    });
}

module.exports =connectToMongo;