const express = require('express')
const dotenv = require('dotenv').config()
const session = require('express-session')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const MongoDBStore = require('connect-mongodb-session')(session)

const port = process.env.PORT || 5000
const MAX_AGE = 1000 * 60 * 60 * 3 // 3 hours

const app = express()

connectDB();



const MongoDBstore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions',
})

app.use(
    session({
        secret: 'CHANGEME',
        name: 'session-id', // cookies name to be put in "key" field in postman
        store: MongoDBstore,
        cookie: {
            maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
            sameSite: false,

            // to turn on just in production
            secure: false, 
            httpOnly: false 
        },
        resave: true,
        saveUninitialized: false,
    })
)

app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))