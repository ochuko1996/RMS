const jwt = require('jsonwebtoken')
const {getGoogleUser} = require('../utils/getGoogleUser')
const  {updateOrCreateUserFromOauth} = require('../utils/updateOrCreateUserFromOauth')

const updateOrCreateUser = async (req, res)=> {
    const {code} = req.body

    const oauthUserInfo = await getGoogleUser({code});
    // const updateUser = await updateOrCreateUserFromOauth({oauthUserInfo});

}

module.exports = updateOrCreateUser