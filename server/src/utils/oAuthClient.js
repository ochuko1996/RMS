const { google } = require("googleapis");

const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5173/auth/google/callback'
)

module.exports = {oAuthClient}