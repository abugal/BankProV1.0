const Customer = require("../models/customer");
const mongoose = require('mongoose')

// get all customers
const getCustomers = async (req, res) => {
    const customers = await Customer.find({}).sort({createdAt: -1})

    res.status(200).json(customers)
}

// get a single customer
const getCustomer = async(req, res) => {
    const{id} = req.params

    // check the id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such customer'})
    }

    const customer = await Customer.findById(id)

    // if that customer does not exist
    if(!customer) {
        return res.status(404).json({error: 'customer not availbale'})
    }
    // if we found the customer
    res.status(200).json(customer)
}


// create new customer
const createCustomer = async (req, res) => {
    const { name, email, password, balance } = req.body;

    // create a customized error check
    let emptyFields = []

    if(!name) {
      emptyFields.push('name')
    }
    if (!email) {
      emptyFields.push('email');
    }
    if (!password) {
      emptyFields.push('password');
    }
    if (!balance) {
      emptyFields.push('balance');
    }
    if(emptyFields.length > 0 ) {
      return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }
    // add doc to db
    try {
      const user_id = req.user._id
      const customer = await Customer.create({
        name,
        email,
        password,
        balance,
        user_id
      });
      res.status(200).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}


// delete a customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    // check for a valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such customer" });
    }

    const customer = await Customer.findOneAndDelete({_id: id})

    // do we have a customer?
    if (!customer) {
      return res.status(400).json({ error: "customer not availbale" });
    }

    res.status(200).json(customer)

}

// update a customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;

  // check for a valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such customer" });
  }
  
  const customer = await Customer.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  // check for a customer
  if (!customer) {
    return res.status(400).json({ error: "customer not availbale" });
  }

  res.status(200).json(customer)


}

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer
};