require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const {urlencoded} = require('express')

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(urlencoded({extended: false}))

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define routes
const userRoutes = require('./Routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});