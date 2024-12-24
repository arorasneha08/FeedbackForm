const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flatNumber: { type: String, required: true },
    email: { type: String, required: true },
    societyName: { type: String, required: true },
    date: { type: Date, required: true },
    waterSupplyRating: { type: String, required: true },
    maintenanceRating: { type: String, required: true },
    electricSupplyRating: { type: String, required: true },
    amenities: { type: String, required: true },
    cleanlinessRating: { type: String, required: true },
    staffBehaviour: { type: String, required: true },
    recommendationComments: { type: String }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;