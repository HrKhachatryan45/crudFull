const express = require('express');
const cors = require('cors')
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const adminRoutes = require('./routes/adminRoute')
const authRoutes = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use('/admin',adminRoutes)
app.use('/auth',authRoutes)

const PORT = 8080;

app.listen(PORT,async() => {

    const createAdmin = async () => {
            const filePath = path.resolve('data','users.json');
        
    let data = fs.readFileSync(filePath,{encoding:'utf-8'});
        let users = data && JSON.parse(data)
        if (!users || users.length == 0) {
            users = []
        }
        const adminUser = users.find((userX) => userX.isAdmin)

        if (adminUser) {
            return
        }

        const user = {
            id:users.length + 1,
            name:"Admin",
            email:'admin@gmail.com',
            password:'admin123',
            isAdmin:true
        }

        users.push(user)

        fs.writeFileSync(filePath,JSON.stringify(users,null,2))

    }
    await createAdmin()


    console.log(`Running on port ${PORT}`);
})
