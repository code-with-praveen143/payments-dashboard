// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const encryptionRoutes = require('./routes/encryptionRoutes');
const busRoutes = require('./routes/busRouteRoutes');
const userRoutes = require('./routes/userRoutes')
const studentRoutes = require('./routes/studentFeeRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger');

const paymentRoutes = require('./routes/payment'); 

const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: "*", // Adjust based on your frontend
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
// Routes
// app.use('/api/payments', paymentRoutes);
app.use('/api/encryption', encryptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/busRoutes', busRoutes);
app.use('/api/students', studentRoutes);

app.use('/api/payment', paymentRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to DB and start server
connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
