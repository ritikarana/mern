const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create a user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
});

// login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
   // console.log(password)
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });


// Get all users

router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1; // Page Number 
        const limit = req.query.limit || 5; // No of records per page
        const searchParam = req.query.searchParam || '';
        let skip = (page - 1) * limit ;

        const searchQuery = {
            $or: [
                {name: {$regex : searchParam, $options: 'i'}},
                {email: {$regex : searchParam, $options: 'i'}},
                {role: {$regex : searchParam, $options: 'i'}}
            ]
        }

        const users = await User.find(searchQuery).skip(skip).limit(limit);
        const totalUsers = await User.countDocuments(searchQuery);
        res.json({
            users,
            totalUsers,
            totalPage: Math.ceil(totalUsers/ limit),
            currentPage: page
        })
      //  res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Update a User

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(400).send("Id is not present")
        }
        res.send(user);
    } catch (error) {
        res.send(400).send(error)
    }

})


// Delete a User

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).send("Id is not present")
        }
        res.send(user);
    } catch (error) {
        res.send(400).send(error)
    }
})

module.exports = router;
