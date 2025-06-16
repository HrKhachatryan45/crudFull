const express = require('express');
const cors = require('cors')
const adminRoutes = require('./routes/adminRoute')

const app = express()

app.use(cors());
app.use(express.json())
app.use('/admin',adminRoutes)

const PORT = 8080;

app.listen(PORT,() => {
    console.log(`Running on port ${PORT}`);
})
