import {model, Schema} from 'mongoose';

const userSchema = new Schema({
name: {
    type: String,
    unique: true,
    required: true
},
email: {
    type: String,
    unique: true,
    required: true
},

mobile: {
    type: String,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true
},
city:{
    type: String,
    default:''
},
address: {
    type: String,
    default:''
},
});

const user = model('user', userSchema);
export default user;
