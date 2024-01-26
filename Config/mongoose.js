const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pradumyadav020:TLhjDw2rWbnpp4Ys@cluster0.1sumwvw.mongodb.net/?retryWrites=true&w=majority');
// mongodb+srv://pradumyadav020:pradum431@cluster0.0el1bkf.mongodb.net/?retryWrites=true&w=majority
// username : pradumyadav020
// pasword : TLhjDw2rWbnpp4Ys
const db = mongoose.connection;

db.on('err', console.error.bind(console, "Error in connecting to the database"));

db.once("open", function(){
    console.log("Connected to database :: Mongodb");
});