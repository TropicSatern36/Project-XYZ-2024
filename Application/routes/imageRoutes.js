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
    console.log('Received file:', req.file); // Log the received file object
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imagePath = path.join(__dirname, '..', req.file.path);
    
    //create the object that will hold and execute the python script
    const pythonScriptPath = path.join(__dirname, '..', 'bin', 'process_image.py');
    const pythonProcess = spawn('python3', [pythonScriptPath]);

    // Send image to python script
    pythonProcess.stdin.write(JSON.stringify({ image_path: imagePath }));
    pythonProcess.stdin.end(); // End the input stream to signal end of input

    pythonProcess.stdout.on('data', (data) => {
        try {
            const result = JSON.parse(data.toString().trim());
            console.log('Python script output:', result); // Print JSON object to console
            res.json(result);
        } catch (error) {
            console.error('Failed to parse Python script output:', error);
            res.status(500).json({ error: 'Failed to parse Python script output' });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send(data.toString());
    });

    pythonProcess.on('close', (code) => {
        // Clean up uploaded file after processing
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
        
        // Log exit code for debugging
        console.log(`Python script exited with code ${code}`);
    });
});

module.exports = router;
