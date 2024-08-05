/*
* This route is used to retrieve an image and then use it as a parameter
* for processing with Python.
* 
* The Python script 'process_image.py' is expected to be in the 'bin' folder of the project
* and is used for image processing.
*/

const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');// allows for use of python in express
const fs = require('fs');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), (req, res) => {
    // Check if the file exists in the request
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imagePath = path.join(__dirname, '..', req.file.path);
    
    //create the object that will hold and execute the python script
    const pythonScriptPath = path.join(__dirname, '..', 'bin', 'process_image.py');
    const pythonProcess = spawn('python3', [pythonScriptPath, imagePath]);

    pythonProcess.stdout.on('data', (data) => {
        try {
            const result = JSON.parse(data.toString());
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to parse Python script output' });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send(data.toString());
    });

    pythonProcess.on('close', () => {
        fs.unlinkSync(imagePath); // Clean up uploaded file
    });
});

module.exports = router;
