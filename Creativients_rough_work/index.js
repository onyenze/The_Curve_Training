// Snippet to generate the bar code and return an image via a route


// this is my ticket model
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: String, required: true },
  purchaser: { type: String, required: true },
  ticketCode: { type: String, required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;



// my ticket controller
const bwipjs = require('bwip-js');
const Ticket = require('../models/ticketModel');

const generateQRCode = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const barcodeData = `${ticket._id}|${ticket.event}|${ticket.purchaser}`;
    bwipjs.toBuffer(
      {
        bcid: 'qrcode',
        text: barcodeData,
        scale: 3,
      },
      (err, png) => {
        if (err) {
          return res.status(500).json({ message: 'Error generating QR code' });
        }
        res.set('Content-Type', 'image/png');
        res.send(png);
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code' });
  }
};

module.exports = { generateQRCode };

// my generateQRcode route to display my ticket
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/ticket/:ticketId/qrcode', ticketController.generateQRCode);

module.exports = router;


// for my server.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/ticketing_db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/api', ticketRoutes);
