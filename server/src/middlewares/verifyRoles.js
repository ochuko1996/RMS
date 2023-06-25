const { StatusCodes } = require("http-status-codes")

const verifyRoles = (...allowedRoles)=> {
    return (req, res, next)=> {
        if(!req?.roles) return res.sendStatus(StatusCodes.UNAUTHORIZED)
        const rolesArray = [...allowedRoles]

        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)

        if(!result) return res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
}

module.exports = verifyRoles