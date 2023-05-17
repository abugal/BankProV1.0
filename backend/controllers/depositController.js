const Deposit = require("../models/depositModel")
const mongoose = require('mongoose')


// GET all deposits
const getDeposits = async (req, res) => {
    const user_id = req.user._id 

    const deposits = await Deposit.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(deposits)
}

// GET a single deposit
const getDeposit = async (req, res) => {
    const { id } = req.params

    // Check the db to prevent the internal error from the mangoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record'})
    }

    const deposit = await Deposit.findById(id) // find record based on the id

    // if the id is valid but there was no deposit record
    if (!deposit) {
        return res.status(404).json({error: 'The deposit record does not exit'})
    }

    res.status(200).json(deposit)
}

// CREATE a new deposit
const createDeposit = async (req, res) => {
    const { customerID, name, amount } = req.body;
    // add a document to the Database
    try {
      const user_id = req.user._id
      const deposit = await Deposit.create({ customerID, name, amount, user_id });
      res.status(200).json(deposit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

}

// DELETE a deposit
const deleteDeposit = async (req, res) => {
    const { id } = req.params;

    // Making sure the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such record" });
    }

    const deposit = await Deposit.findOneAndDelete({_id: id})

    if (!deposit) {
      return res
        .status(400)
        .json({ error: "The deposit record does not exit" });
    }

    res.status(200).json(deposit)
    
}

// UPDATE a deposit
const updateDeposit = async (req, res) => {
    const { id } = req.params;

    // Making sure the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such record" });
    }

    const deposit = await Deposit.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!deposit) {
        return res.status(400).json({error: 'No such deposit'})
    }

    res.status(200).json(deposit)
}

module.exports = {
  getDeposits,
  getDeposit,
  createDeposit,
  deleteDeposit,
  updateDeposit
};