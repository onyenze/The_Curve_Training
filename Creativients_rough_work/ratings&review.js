// Decided to give the users the ability pass raings and reviews on the events 

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  // Add fields for overallRating and reviews array
  overallRating: { type: Number, default: 0 },
  reviews: [
    {
      attendeeName: { type: String, required: true },
      rating: { type: Number, required: true },
      reviewText: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

// Event controller
const Event = require('../models/eventModel');

const submitReview = async (req, res) => {
  const { eventId, attendeeName, rating, reviewText } = req.body;

  try {
    // Find the event in the database
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Add the new review to the event's reviews array
    event.reviews.push({
      attendeeName,
      rating,
      reviewText,
    });

    // Calculate the updated overall rating
    const totalRating = event.reviews.reduce((sum, review) => sum + review.rating, 0);
    event.overallRating = totalRating / event.reviews.length;

    // Save the updated event data
    await event.save();

    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review' });
  }
};

module.exports = { submitReview };

// event route
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// POST request to submit review
router.post('/events/:eventId/reviews', eventController.submitReview);

module.exports = router;
