const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('./mongo'); 
const upload = require("./multer"); 
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

app.post('/submit', upload.fields([{ name: 'maintenancePhotos', maxCount: 5 }, { name: 'amenitiesPhotos', maxCount: 5 }]), (req, res) => {
    console.log(req.files); 

    const feedbackData = new Feedback({
        ...req.body,
        maintenancePhotos: req.files['maintenancePhotos'] ? req.files['maintenancePhotos'].map(file => file.filename) : [],
        amenitiesPhotos: req.files['amenitiesPhotos'] ? req.files['amenitiesPhotos'].map(file => file.filename) : []
    });

    feedbackData.save()
    .then(() => {
        res.send("Feedback submitted successfully!");
    })
    .catch(err => {
        res.status(400).send('Error saving feedback: ' + err);
    });
});

app.get('/feedback', (req, res) => {
    Feedback.find()
    .then(feedbacks => {
        console.log(feedbacks); 
        res.json(feedbacks); 
    })
    .catch(err => {
        console.error('Error retrieving feedback:', err);
        res.status(500).send('Error retrieving feedback: ' + err);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});