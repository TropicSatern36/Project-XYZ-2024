const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Configure multer to save files with their original name and extension
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname); // Get file extension
        const filename = Date.now() + extname; // Use timestamp for uniqueness
        cb(null, filename); // Save the file with the generated filename
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
    console.log('Received file:', req.file);

    // Check if file exists and is an image
    if (!req.file || !req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'No image file uploaded or invalid file type' });
    }

    const imagePath = path.join(__dirname, '..', req.file.path);
    const homeDir = process.env.HOME || process.env.USERPROFILE; // HOME on Linux/macOS, USERPROFILE on Windows
    const pythonEnvPath = path.join(homeDir, 'venv', 'bin', 'python');  // For macOS/Linux
    const pythonScriptPath = path.join(__dirname, '..', 'bin', 'process_image.py');
    const pythonProcess = spawn(pythonEnvPath, [pythonScriptPath]);

    //const pythonProcess = spawn('python3', [pythonScriptPath]);

    pythonProcess.stdin.write(JSON.stringify({ image_path: imagePath }));
    pythonProcess.stdin.end();

    let responseSent = false;
    let output = ''; // To accumulate the Python output


    // Handle data coming from Python process
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString(); // Append the data

        try {
            // Regular expression to extract JSON from the output
            const jsonMatch = output.match(/{.*}/s); // Matches JSON from `{` to `}`
            
            if (jsonMatch && jsonMatch[0]) {
                let result = JSON.parse(jsonMatch[0].trim());  // Parse the JSON part
                console.log('Parsed JSON result:', result);
                res.json(result);
            }
        } catch (error) {
            console.error('Failed to parse Python script output on process end:', error);
            res.status(500).json({ error: 'Failed to parse Python script output' });
        }
    });


    // Clean up and log when Python process closes
    pythonProcess.on('close', (code) => {
        // Clean up uploaded file after processing
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        console.log(`Python script exited with code ${code}`);
    });

    // Handle error in spawning Python process
    pythonProcess.on('error', (err) => {
        console.error('Error starting Python process:', err);
        if (!responseSent) {
            res.status(500).json({ error: 'Error starting Python process' });
            responseSent = true;  // Prevent multiple responses
        }
    });

});

module.exports = router;
