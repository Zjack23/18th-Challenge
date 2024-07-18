const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().populate('thoughts').populate('friends');
  res.json(users);
});

// Create a new user
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Update a user
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Delete a user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Add a friend to a user's friend list
router.post('/:id/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

// Remove a friend from a user's friend list
router.delete('/:id/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

module.exports = router;
