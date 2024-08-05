// this directs the api to the python script for image processing
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const upload = multer({ dest: 'uploads/' });

// Route to display the upload form
router.get('/', (req, res) => {
    res.render('upload');
});

// Route to handle the file upload

module.exports = router;
