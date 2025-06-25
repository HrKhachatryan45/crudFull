const path = require('path')
const fs = require('fs')
const validator = require('validator');
const jwt = require('jsonwebtoken')



const register = async (req,res) => {
    const {name,email,password} = req.body;
    const filePath = path.resolve('data','users.json');

    
        if (!name || !email || !password) {
            return res.status(400).json({error:'All fields are required'})
        }

          const data = fs.readFileSync(filePath,{encoding:'utf-8'})
        let users = JSON.parse(data)
        const user = users.find(userX => userX.email === email)

        if (user) {
            return res.status(400).json({error:'Email already in use'})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({error:'Enter valid email'})
        }

    

    try {

        let data = fs.readFileSync(filePath,{encoding:'utf-8'});
        let users = data && JSON.parse(data)
        if (!users || users.length == 0) {
            users = []
        }

        const user = {
            id:users.length + 1,
            name,
            email,
            password,
            isAdmin:false
        }

        users.push(user)

        fs.writeFileSync(filePath,JSON.stringify(users,null,2))

       const token =  jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:'4d'})

       res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        })

        res.status(200).json(user)



    } catch (error) {
        console.log(error);
    }
}

const login = async (req,res) => {
const {email,password} = req.body;
    const filePath = path.resolve('data','users.json');

        if (!email || !password) {
            return res.status(400).json({error:'All fields are required'})
        }


    try {


        const data = fs.readFileSync(filePath,{encoding:'utf-8'})
        let users = JSON.parse(data)
        const user = users.find(userX => userX.email === email)

        if (!user) {
            return res.status(400).json({error:'User not found'})
        }

        if (user.password !== password) {
            return res.status(400).json({error:'Incorrect Password'})
        }

       const token =  jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:'4d'})

       res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        })

        res.status(200).json(user)

    } catch (error) {
        console.log(error);
    }
}

const logout = async (req,res) => {
    try{
        res.clearCookie('jwt')
        return res.status(200).json({msg:'Logged out successfully'})
    }catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login,
    logout
}