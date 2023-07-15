const express = require('express')
const dotenv = require('dotenv').config()
const session = require('express-session')
var passport = require('passport')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const MongoDBStore = require('connect-mongodb-session')(session)

const port = process.env.PORT || 5000
const MAX_AGE = 1000 * 60 * 60 * 3 // 3 hours

connectDB();

const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
})

const app = express()
app.use(express.urlencoded({extended: false}));
app.set('view-engine', 'ejs')
app.use(errorHandler);
app.use(
    session({
        secret: process.env.SECRET,
        name: 'session-id', // cookies name to be put in "key" field in postman
        store: sessionStore,
        cookie: {
            maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
            sameSite: false,

            // to turn on just in production
            secure: false, 
            httpOnly: false 
        },
        resave: false,
        saveUninitialized: true,
    })
)


// PASSPORT
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

// ROUTES
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`))
