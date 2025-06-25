const jwt = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')
const protectRoute =async (req, res, next) => {
        const filePath = path.resolve('data','users.json');
    
    try {
        const token = req.cookies.jwt
        if (!token){
            return res.status(401).json({error:'No token provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({error:'Invalid token'})
        }

        const data = fs.readFileSync(filePath,{encoding:'utf-8'})
        let users = JSON.parse(data)
        const user = users.find(userX => userX.id.toString() === decoded.userId.toString())


        if (!user){
            return  res.status(400).json({error: 'User not found'});
        }

        req.user = user

        next()

    }catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = protectRoute