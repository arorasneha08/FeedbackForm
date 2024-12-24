const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('./mongo'); 
const upload = require("./multer"); 
const app = express();
const PORT = 5000;

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


app.post('/submit', upload.any(), (req, res) => {
    console.log(req.files);

    // Organize files based on their field names
    const maintenancePhotos = req.files
        .filter(file => file.fieldname === 'maintenancePhotos')
        .map(file => file.filename);

    const amenitiesPhotos = req.files
        .filter(file => file.fieldname === 'amenitiesPhotos')
        .map(file => file.filename);

    // Create a new Feedback instance with the request body and file data
    const feedbackData = new Feedback({
        ...req.body,
        maintenancePhotos,
        amenitiesPhotos
    });

    // Save the feedback data
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