const express = require('express')
const {
    createDeposit,
    getDeposits,
    getDeposit,
    deleteDeposit,
    updateDeposit 
} = require('../controllers/depositController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all deposits
router.get('/', getDeposits)

// Get a single deposit
router.get('/:id', getDeposit)

// POST a new deposit
router.post('/', createDeposit)

// DELETE a deposit record
router.delete('/:id',deleteDeposit)

// UPDATE deposit
router.patch('/:id', updateDeposit)

module.exports = router