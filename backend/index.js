const express = require('express');
const connectDb = require('./config/db');
const usersRoutes = require('./routes/users')
require('dotenv').config();

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000

// Middleware 



app.use(cors());
app.use(express.json());
//app.use(bodyParser.json()); // To parse JSON bodies

connectDb();

app.use('/user', usersRoutes);

app.listen(PORT, () => {
    console.log("Server is running on Port number", {PORT})
})