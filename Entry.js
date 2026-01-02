const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Entry", EntrySchema);