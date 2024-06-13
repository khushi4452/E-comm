import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import md5 from "js-md5";

dotenv.config();
import User from './model/user.js';

const app = express();
app.use(express.json());

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
    res.send('server is running');
});
app.get('/', (req, res) => {
    res.send('server is running!');
});



app.post('/signup', async (req, res) => {
    const { name, email, mobile, password, city, address } = req.body;

    try {
        const user = new User({
            name:name,
            email:email,
            mobile:mobile,
            password: md5 (password),
            city: city,
            address:address
        });

        const savedUser = await user.save();
        res.json({
            success: true,
            data: savedUser,
            message: 'signup successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message,
        });
    }
});

app.post('/login', async (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
