const express = require('express')
const session = require('express-session')
var passport = require('passport')
require('./config/passport');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');
const MongoDBStore = require('connect-mongodb-session')(session)

const port = process.env.PORT || 5000
const SESSION_MAX_AGE = 1000 * 60 * 60 * 3 // 3 hours

connectDB();

const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
})

// Declare and set up express instance.
const app = express()
app.use(express.urlencoded({extended: false}));
// app.set('view-engine', 'ejs')
app.use(errorHandler);
app.use(
    // cookie basic settings
    session({
        secret: process.env.SECRET,
        name: 'session-id',
        store: sessionStore,
        cookie: {
            maxAge: SESSION_MAX_AGE, // How long it takes for cookies to expire.
            sameSite: false,

            // to turn on just in production
            secure: false, 
            httpOnly: false 
        },
        resave: false,
        saveUninitialized: true,
    })
)

// Passport initizilaization for resource authorization.
app.use(passport.initialize());
app.use(passport.session());

// Import routes
app.use('/api/users', require('./routes/userRouter'));

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`))
