const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Importing Routes
const posts = require('./routes/posts');
const auth = require('./routes/auth');

// Initializing Express Server
const app = express();
connectDB();
app.use(cors());

// .ENV variables
dotenv.config({
    path: './config/config.env'
})
// Express middleware so we can access the req.body
app.use(express.json());

//Routes
app.use('/posts', posts);
app.use('/auth', auth);

// Setting up the port
const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server successfully started on PORT: ${PORT}`.cyan.bold));