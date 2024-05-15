const mongoose = require('mongoose');

// Create schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    benefits: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: String, // Adding image URL field
    updatedAt: {
        type: Date,
        default: Date.now // Set default value to current date
    }
});

productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create model
module.exports = mongoose.model("Products", productSchema);
