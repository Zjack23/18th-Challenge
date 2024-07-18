const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// Get all thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

// Create a new thought
router.post('/', async (req, res) => {
  const thought = await Thought.create(req.body);
  res.json(thought);
});

// Update a thought
router.put('/:id', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(thought);
});

// Delete a thought
router.delete('/:id', async (req, res) => {
  await Thought.findByIdAndDelete(req.params.id);
  res.json({ message: 'Thought deleted' });
});

// Add a reaction to a thought
router.post('/:id/reactions', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.id, { $push: { reactions: req.body } }, { new: true });
  res.json(thought);
});

// Remove a reaction from a thought
router.delete('/:id/reactions/:reactionId', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.id, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
  res.json(thought);
});

module.exports = router;
