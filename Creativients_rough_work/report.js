const reportSchema = new mongoose.Schema({
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      enum: ['event', 'review', 'user'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    // ... other fields ...
  });
  
  const reportModel = mongoose.model('Report', reportSchema);

  

  const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const eventModel = require('../models/eventModel');
const reviewModel = require('../models/reviewModel');
const reportModel = require('../models/reportModel');

const createReport = async (req, res) => {
  try {
    const { targetType, targetId, reason } = req.body;
    const reporterId = req.userId; // Assuming user is authenticated
    
    // Check if the target exists and is valid
    let targetModel, targetDocument;
    if (targetType === 'event') {
      targetModel = eventModel;
    } else if (targetType === 'review') {
      targetModel = reviewModel;
    } else if (targetType === 'user') {
      targetModel = userModel;
    } else {
      return res.status(400).json({ message: 'Invalid target type' });
    }
    
    targetDocument = await targetModel.findById(targetId);
    if (!targetDocument) {
      return res.status(404).json({ message: 'Target not found' });
    }
    
    // Create and save the report
    const newReport = new reportModel({
      reporter: reporterId,
      targetType,
      targetId,
      reason,
    });
    await newReport.save();
    
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};

module.exports = {
  createReport,
};


const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Admin dashboard to view reported items
router.get('/admin/reports', async (req, res) => {
  try {
    const reports = await reportModel.find().populate('reporter targetId').exec();
    res.render('admin-dashboard', { reports });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
});

// Route to handle actions on reported items (e.g., delete, warn user, etc.)
router.post('/admin/reports/:reportId', async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const action = req.body.action; // Example: 'delete', 'warn'
    
    // Handle the action based on your business logic
    // For example, you can delete the reported item, warn the user, etc.
    
    // Update the report status (e.g., resolved, action taken)
    const report = await reportModel.findByIdAndUpdate(reportId, { status: 'resolved', actionTaken: action });
    
    res.json({ message: 'Action taken successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error taking action on report', error: error.message });
  }
});

module.exports = router;
