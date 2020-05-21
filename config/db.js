const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.end.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Connection to the MongoDB established successfully'.cyan.bold);
}

module.exports = connectDB;