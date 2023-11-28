const  { getGoogleOauthUrl } = require("../utils/getGoogleOauthUrl")
const googleOauth = (req, res) => {
    const url = getGoogleOauthUrl();
    res.status(200).json({url})
}

module.exports = {googleOauth}