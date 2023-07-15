# user-auth
Backend user authentication and authorization with MongoDB, ExpressJS, and Passport. Password hashes and salts are stored together for each user in the database. Session cookies (via express-session and Passport) are also stored in the database, allowing for routes to be protected or only exposed to users not logged in.
