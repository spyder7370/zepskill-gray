env
DB_URI=
SESSION_SECRET=92BCD6ED83CCCEFA5689A1F33D622
PORT=

Authentication
* create session - express session
SESSION -> COOKIE -> TOKEN

1. email check - mongoose
2. generate salt - bcrypt
3. hash password using salt - bcrypt
4. token - jwt
5. send cookie containing that token - express

PASSPORT.JS
1. LOGIN - passport.authenticate
2. REGISTER - model.register
3. LOGOUT - req.logout
4. Integration with other auth apps - google, facebook, twitter

