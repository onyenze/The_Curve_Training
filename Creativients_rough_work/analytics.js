// to return valuable data on events that has taken place on the platform
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Reference to the Event model
  buyer: { type: String, required: true },
  price: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);


// Ticket Sale Route
app.post('/ticket-sale', async (req, res) => {
    try {
      const { eventID, buyer, ticketPrice } = req.body;
  
      // ... (calculate commission and deduct, as shown in previous examples)
  
      // Save the ticket sale transaction to the database
      const newTicket = new Ticket({
        event: eventID,
        buyer: buyer,
        price: finalPrice,
      });
      await newTicket.save();
  
      // Respond with the ticket details and transaction status
      res.status(200).json({
        message: 'Ticket sale successful!',
        ticket: newTicket,
      });
    } catch (error) {
      res.status(500).json({ error: 'Ticket sale failed.' });
    }
  });

  
// Analytics Route - Return Ticket Sales Data
app.get('/analytics/ticket-sales', async (req, res) => {
    try {
      // Use Mongoose aggregation to calculate analytics data
      const analyticsData = await Ticket.aggregate([
        {
          $group: {
            _id: '$event',
            totalSales: { $sum: 1 },
            totalRevenue: { $sum: '$price' },
            averageTicketPrice: { $avg: '$price' },
          },
        },
      ]);
  
      res.status(200).json({
        message: 'Ticket sales analytics data',
        data: analyticsData,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve analytics data.' });
    }
  });


//   In this example, the analytics route performs a MongoDB aggregation to group the ticket sales data based on the event ID. It then calculates the total sales, total revenue, and average ticket price for each event and returns the data to the client.

//   Of course, this is a basic example, and you can extend the analytics functionality based on your specific requirements. You may want to include more complex aggregations, filter data by date range, or provide analytics for specific event organizers or ticket types.
  
//   Remember to set up appropriate error handling, authentication, and validation mechanisms to ensure the security and reliability of your analytics endpoints. Additionally, consider caching mechanisms to optimize the performance of frequently accessed analytics data.