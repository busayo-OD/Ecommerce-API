const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const authRouter = require('./src/routes/authRoute');

// Load config
dotenv.config({ path: './config/config.env'})

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB();



app.use('/', authRouter );

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})