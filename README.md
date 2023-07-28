# user-auth
Backend REST API with user authentication and authorization. Built with NodeJS, Express, MongoDB Atlas, Mongoose and Passport. Password hashes and salts are generated with the PBKDF2 algorithm and are stored for each user in the database. Session cookies (via express-session and Passport) are stored in the database for validation, and middleware allows for protected routes.
