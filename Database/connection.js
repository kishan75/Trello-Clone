var mongoose = require("mongoose");
const USER_NAME = process.env.USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const URI = `mongodb+srv://${USER_NAME}:${DB_PASSWORD}@cluster0.9qht3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectDB = async () => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log('DB has connected');
};

module.exports = connectDB;