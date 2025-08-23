const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected to host: ' + con.connection.host);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Stop server if DB connection fails
    }
};

module.exports = connectDatabase;
