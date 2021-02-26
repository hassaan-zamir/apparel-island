const mongoose = require('mongoose');
const mongoosePaginate= require('mongoose-paginate');
 
const orderSchema = mongoose.Schema({
    orderCode: String,
    brandName: String,
    customerName: String,
    country: String,
    product: String,
    phases: Array,
    orderTimeline: Number,
    startTime: Number,
    style: Number,
    color: Number,
    state: String,
    amount: Number,
    quantity: Number,
    user: String,

});

orderSchema.plugin(mongoosePaginate);

module.exports =  mongoose.model('orders', orderSchema);

