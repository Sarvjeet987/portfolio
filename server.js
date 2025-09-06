// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(__dirname)); 

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/contactDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // MongoDB Schema and Model
// const contactSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     subject: String,
//     message: String
// });

// const Contact = mongoose.model("Contact", contactSchema);

// // POST Route to Save Contact Form
// app.post('/contact', async (req, res) => {
//     const { name, email, subject, message } = req.body;

//     const newContact = new Contact({ name, email, subject, message });

//     try {
//         await newContact.save();
//         res.send("✅ Message saved successfully.");
//     } catch (error) {
//         console.error("❌ Error saving contact:", error);
//         res.status(500).send("Error saving contact message.");
//     }
// });

// // Custom Route to serve contact.html
// app.get('/contactform', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Start the Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server running at: http://localhost:${PORT}/contactform`);
// });
