const User = require('../model/User')

const updateOrCreateUserFromOauth = async ({oauthUserInfo})=>{
    const {
        id: googleId,
        email
    } = oauthUserInfo;
    console.log(oauthUserInfo);
    const checkForExistingUser =  await User.findOne({email})

    if (checkForExistingUser) {
        const result = await User.findOneAndUpdate(
            {email},
            {$set: {googleId}},
            {returnOriginal: false}

        )
        return result
    }else {
        const newUser = await User.create({
            email,
            firstName: email,
            lastName: googleId,
        })
        return newUser
    }
}

module.exports = {updateOrCreateUserFromOauth}