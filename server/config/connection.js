const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dylanhoryza:dog123@cluster0.ezqwhyq.mongodb.net/pizzaparlor?retryWrites=true&w=majority');

module.exports = mongoose.connection;