require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
//const ledgerRoutes = require('./routes/ledger')
const depositRoutes = require('./routes/deposit')
const userRoutes = require('./routes/user')

// initialise the express App
const app = express();

// register a global middleware
app.use(express.json()) // to be use in accessing the request body
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()

})

// setup a route handler
//app.use('/api/ledger/', ledgerRoutes)
app.use('/api/deposit', depositRoutes)
app.use('/api/user', userRoutes)
/// connect to the database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // Listen for a request in a certain port number.
    // through the use of the .env
    app.listen(process.env.PORT, () => {
        console.log('connect to MongoDB and listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})