const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// create a user
router.post('/', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user)
    } catch(error){
       res.status(400).send(err)
    }
});


// Get all users

router.get('/', async (req, res) => {
    try{
       const users = await User.find();
        res.status(200).send(users)
    } catch(error){
       res.status(500).send(error)
    }
});

router.get('/:id', async (req, res) => {
    try{
       const users = await User.findById(req.params.id);
        res.status(200).send(users)
    } catch(error){
       res.status(500).send(error)
    }
});

// Update a User

router.put('/:id', async(req, res) => {
    try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!user){
        return res.status(400).send("Id is not present")
    }
    res.send(user);
    }catch(error) {
        res.send(400).send(error)
    }

})


// Delete a User

router.delete('/:id', async(req, res) => {
    try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(400).send("Id is not present")
    }
    res.send(user);
    }catch(error){
        res.send(400).send(error)
    }
})

module.exports = router;
