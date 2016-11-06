import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  companyName: String,
  customerAddress: String,
  orderedItem: String,
});

export default mongoose.model('Orders', schema);
