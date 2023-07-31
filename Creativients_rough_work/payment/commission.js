// this is the code to withdraw a commission from every ticket sale that happens on my platform


// Ticket Model
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Reference to the Event model
  buyer: { type: String, required: true },
  price: { type: Number, required: true },
});



const Ticket = mongoose.model('Ticket', ticketSchema);

// my ticket route and controller
// Calculate and Deduct Commission
const commissionPercentage = 0.1; // 10% commission

// Ticket Sale Route
app.post('/ticket-sale', async (req, res) => {
  try {
    const { eventID, buyer, ticketPrice } = req.body;

    // Calculate the commission amount
    const commissionAmount = ticketPrice * commissionPercentage;

    // Deduct the commission from the ticket price
    const finalPrice = ticketPrice - commissionAmount;

    // Save the ticket sale transaction to the database
    const newTicket = new Ticket({
      event: eventID,
      buyer: buyer,
      price: finalPrice,
    });
    await newTicket.save();

    // Process payment and send the commission amount to your platform's account

    // Respond with the ticket details and transaction status
    res.status(200).json({
      message: 'Ticket sale successful!',
      ticket: newTicket,
    });
  } catch (error) {
    res.status(500).json({ error: 'Ticket sale failed.' });
  }
});


// In this example, when a ticket is sold, the server calculates the commission based on the predefined percentage, deducts it from the ticket price, and stores the final sale details in the database. You can add further logic for processing the payment and transferring the commission amount to your platform's account.

// Please note that this is a basic implementation and may need further enhancement depending on your specific requirements and the payment gateway you choose to use. Additionally, ensure you handle errors and edge cases for a robust and reliable ticketing and event management system.