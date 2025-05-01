const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const accountSid = '';  // Your Account SID from www.twilio.com/console
const authToken = '';   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle confirmation
app.post('/send-confirmation', (req, res) => {
    const { phoneNumber, orderNumber, orderDate, paymentMethod, shippingMethod, shippingAddress } = req.body;

    // Construct the SMS message
    const messageBody = `
        Your order has been confirmed!
        Order Number: ${orderNumber}
        Order Date: ${orderDate}
        Payment Method: ${paymentMethod}
        Shipping Method: ${shippingMethod}
        Shipping Address: ${shippingAddress}
        Thank you for shopping with us!
    `;

    client.messages
        .create({
            body: messageBody,
            messagingServiceSid: '', // Your Messaging Service SID from Twilio
            to: phoneNumber
        })
        .then(message => {
            console.log('Message sent:', message.sid);
            res.status(200).json({ success: true, message: 'Confirmation sent!' });
        })
        .catch(error => {
            console.error('Error sending message:', error);
            res.status(500).json({ success: false, message: 'Failed to send confirmation.' });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});