const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('./mongo'); 
const app = express();
const PORT = 4020;

mongoose.connect("mongodb://localhost:27017/FeedBackForm")
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Feedback.html'); 
});

app.post('/submit', (req, res) => {
    const feedbackData = new Feedback(req.body);
    feedbackData.save()
    .then(() => {
        res.send("Feedback submitted successfully!");
    })
    .catch(err => {
        res.status(400).send('Error saving feedback: ' + err);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});