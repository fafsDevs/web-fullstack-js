const { Schema, model } = require('mongoose');

const FileSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    imagePath: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('File', FileSchema);