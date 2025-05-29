// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { sequelize } from './models/index.js';  // load models & associations
import authRoutes            from './routes/authRoutes.js';
import userRoutes            from './routes/userRoutes.js';
import bookRoutes            from './routes/bookRoutes.js';
import exchangeRoutes        from './routes/exchangeRoutes.js';
import exchangeHistoryRoutes from './routes/exchangeHitoryRoutes.js';  // pastikan nama file sesuai, typo sudah diperbaiki
import protectedRoutes       from './routes/protectedRoutes.js';

const app  = express();

// Ambil PORT dari environment variable (Cloud Run akan set ini), default ke 5010 hanya saat lokal
const PORT = process.env.PORT || 5003;

console.log(`🛠️ Running on port: ${PORT}`);

// --- Middlewares ---
app.use(cookieParser());
app.use(cors({
  origin:      process.env.CLIENT_URL || true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Health Check ---
app.get('/health', (_req, res) => res.status(200).send('OK'));

// --- Routes ---
app.use('/api/auth',                authRoutes);
app.use('/api/users',               userRoutes);
app.use('/api/books',               bookRoutes);
app.use('/api/exchanges/history',  exchangeHistoryRoutes);
app.use('/api/exchanges',           exchangeRoutes);
app.use('/api/protected',           protectedRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ status: 'Error', message: 'Route not found' });
});

// --- Global Error Handler ---
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    status: 'Error',
    message: err.message || 'Internal server error'
  });
});

// --- Bootstrap ---
(async () => {
  try {
    console.log('🔌 Connecting to DB...');
    await sequelize.authenticate();
    console.log('✅ DB connection established.');

    console.log('🔄 Syncing models...');
    await sequelize.sync();
    console.log('✅ Database synced.');

    console.log('🚀 Starting server...');
    // Listen pada port dari env variable supaya cocok dengan Cloud Run
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
})();
