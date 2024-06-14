import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import md5 from 'js-md5';

dotenv.config();
import User from './model/user.js';
import Product from './model/product.js'; 

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
            name: name,
            email: email,
            mobile: mobile,
            password: md5(password),
            city: city,
            address: address
        });

        const savedUser = await user.save();
        res.json({
            success: true,
            data: savedUser,
            message: 'Signup successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message,
        });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const encryptedPassword = md5(password);

    try {
        console.log('Login attempt with:', email, encryptedPassword); 
        const user = await User.findOne({
            email: email,
            password: encryptedPassword
        });

        if (user) {
            console.log('Login successful:', user);
            res.json({
                success: true,
                data: user,
                message: 'Login successfully'
            });
        } else {
            console.log('Invalid credentials');
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message,
        });
    }
});

app.post("/product", async (req, res) => {
    const {
        title,
        description, 
        price,
        images,
        category
    } = req.body; 

    const product = new Product({ 
        title: title,
        description: description, 
        price: price,
        images: images,
        category: category
    });

    try {
        const savedProduct = await product.save();
        return res.json({
            success: true,
            data: savedProduct, 
            message: 'Product added successfully' 
        });
    } catch (e) {
        return res.status(500).json({ 
            success: false,
            data: null,
            message: e._message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
