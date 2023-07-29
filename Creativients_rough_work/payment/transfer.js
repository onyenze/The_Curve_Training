// this is to transfer the generated funds to their supposed destination, it is dicey because the library only allows the use of USD

const stripe = require('stripe')(YOUR_STRIPE_SECRET_KEY);

// Ticket Sale Route
app.post('/ticket-sale', async (req, res) => {
  try {
    const { eventID, buyer, ticketPrice } = req.body;

    // Calculate the commission amount
    const commissionPercentage = 0.1; // 10% commission
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

    // Process payment using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalPrice * 100, // Stripe requires the amount in cents
      currency: 'usd',
      // Add payment method details or customer ID here
    });

    // Transfer the commission to the platform's account
    await stripe.transfers.create({
      amount: commissionAmount * 100, // Stripe requires the amount in cents
      currency: 'usd',
      destination: PLATFORM_ACCOUNT_ID, // Replace with your platform's account ID
    });

    // Transfer the ticket price to the organizer's account
    await stripe.transfers.create({
      amount: finalPrice * 100, // Stripe requires the amount in cents
      currency: 'usd',
      destination: ORGANIZER_ACCOUNT_ID, // Replace with the organizer's account ID
    });

    // Respond with the ticket details and transaction status
    res.status(200).json({
      message: 'Ticket sale successful!',
      ticket: newTicket,
    });
  } catch (error) {
    res.status(500).json({ error: 'Ticket sale failed.' });
  }
});
