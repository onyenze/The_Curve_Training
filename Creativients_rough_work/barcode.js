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


// With the above code, when you send a GET request to /api/ticket/:ticketId/qrcode, it will fetch the ticket details from the MongoDB database using the ticketModel, generate a QR code based on the ticket data using bwip-js, and send the QR code image as the response. The QR code data contains the ticket ID, event details, and purchaser information.

// On the frontend (React), you can create a ticket details page and make an API request to the server to get the QR code image for a specific ticket ID. Then, you can display the QR code image using an image tag or a library like react-qr-code or qrcode.react.

// Please make sure to handle authentication and authorization for the ticket details route appropriately, as QR codes may contain sensitive data, and you want to ensure that only authorized users can access them.