require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const hpp = require('hpp');
const connectDB = require('./config/db');

const path = require('path');
const fs = require('fs');

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 1. Database connect
connectDB();

// 2. Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 3. CORS policy (support credential sharing for HTTP-only cookies)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// 4. Request logging
app.use(morgan('dev'));

// 5. Rate limiting (100 requests per 15 min max)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use(limiter);

// 6. JSON body parser (increased to 10mb for image base64 uploads)
app.use(express.json({ limit: '10mb' }));

// 7. Cookie parser
app.use(cookieParser());

// 8. XSS protection
app.use(xss());

// 9. HTTP parameter pollution
app.use(hpp());

// Serve static uploads
app.use('/uploads', express.static(uploadsDir));

// 10. Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// 11. Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: { status: 'OK', timestamp: new Date() }
  });
});

// 12. 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// 13. Global error handler
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🍯 Amazing Natures Backend running on port ${PORT}`);
  });
}

module.exports = app;
