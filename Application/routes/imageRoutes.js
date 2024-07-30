const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
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
