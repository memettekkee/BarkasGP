const express = require('express')
require("dotenv").config();

// const userRoute = require('./routes/userRoutes')
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRoutes')

const connectDB = require('./database/connectDB')
const app = express()
const port = 8070
// const address = 127.0.0.1
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    method: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
  })
);

connectDB();

app.use('/', userRoute)
app.use('/chat', chatRoute)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})