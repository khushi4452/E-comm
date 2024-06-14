import { model, Schema } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['Electronics', 'Fashion', 'Health', 'Books', 'Others'],
            message: 'Invalid category: {VALUE}'
        }
    }
});

const Product = model('Product', productSchema);

export default Product;
