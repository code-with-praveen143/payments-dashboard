// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const encryptionRoutes = require('./routes/encryptionRoutes');
const swaggerSetup = require('./swagger/swagger');
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: "*", // Adjust based on your frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/encryption', encryptionRoutes);

// Swagger
swaggerSetup(app);

// Connect to DB and start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:5000${PORT}`));
