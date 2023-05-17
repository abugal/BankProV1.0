const express = require('express');
const {
    createCustomer,
    getCustomer,
    getCustomers,
    deleteCustomer,
    updateCustomer
} =require('../controllers/legderController')

// create an instance of a router
const router = express.Router()

// Get all USERS
router.get('/', getCustomers)

// Get a single USER
router.get('/:id', getCustomer)

// POST a new customer
router.post('/', createCustomer)

//DELETE a USER
router.delete('/:id', deleteCustomer)

//UPDATE a USER
router.patch('/:id', updateCustomer)


module.exports = router