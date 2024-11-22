# Final Report: Leaf Scarring Analysis System

## Abstract
This report presents the development, deployment, and evaluation of the *Leaf Scarring Analysis System*. The system provides a scalable, containerized solution for environmental researchers to measure leaf size and analyze damage using image processing techniques. It combines a Node.js backend, a Python-based image analysis service, and Docker for deployment. 

The system is designed for researchers studying the effects of treatments on invasive plants or environmental conditions. The report highlights its design, architecture, testing, and potential improvements for future iterations.  

The complete source code can be found on GitHub:  
[Leaf Scarring Analysis System - GitHub Repository](https://github.com/TropicSatern36/Project-XYZ-2024).

## Introduction

### Purpose
The Leaf Scarring Analysis System automates the process of measuring leaf size and detecting damage caused by environmental factors or treatments. By integrating modern image processing algorithms, the system enhances research efficiency and provides precise results for ecological studies.

### Objectives
- Automate the detection of leaf size and damage using Python-based image processing.
- Provide researchers with a user-friendly, web-based interface to upload leaf images and view results.
- Deploy the system in a containerized environment (Docker) for scalability and portability.

### Scope
The system is designed for environmental researchers and ecologists analyzing the effects of treatments or environmental factors on plant health. By offering precise measurements of leaf size and damage, the system reduces manual labor and increases the accuracy of ecological studies.

## System Overview

### Architecture
The system comprises the following components:
- **Frontend**: A simple web interface for image uploads and results display.
- **Backend**: A Node.js server for handling requests and managing communication.
- **Image Processing Service**: Python-based image analysis to detect leaf size and damage.
- **Docker**: Containerization for scalability and easy deployment across environments.

### Workflow
1. The user uploads a leaf image via the web interface.
2. The backend server forwards the image to the Python-based image processor.
3. The Python service analyzes the image, calculating leaf size and damage percentage.
4. Results are returned to the front end and displayed to the user.

## Design and Implementation

### Key Features
- Image upload and validation through a user-friendly web interface.
- Python-based image processing for size measurement and damage detection.
- Results are delivered in real time through the web interface.
- Dockerized deployment for ease of setup and scalability.

### Technologies Used
- **Node.js**: Backend server for managing uploads and communication.
- **Python**: Core image processing using libraries like OpenCV.
- **Docker**: Containerization for cross-platform deployment.

### Algorithms
- **Edge Detection**: Used to identify leaf contours and scars.
- **Supervised Classification**: Differentiates between healthy and damaged leaves.
- **Area Calculation**: Measures total leaf size and calculates damage percentage.

## Testing and Validation

### Test Plan
- Unit testing for individual components like the Python image processor and Node.js server.
- Integration testing to validate the complete pipeline from upload to results.

### Performance Metrics
- Accuracy of leaf size and damage detection compared to manually annotated data.
- Processing time per image.

## Results and Discussion

### Achievements
- Successfully implemented a containerized system for leaf damage analysis.
- Delivered relatively real-time results through a user-friendly web interface.

### Challenges
- Optimizing image processing for diverse leaf shapes and lighting conditions.

## Conclusion and Future Work

### Conclusion
The Leaf Scarring Analysis System successfully automates leaf size and damage measurement, providing researchers with a robust tool for ecological studies. Its containerized architecture ensures scalability and portability, making it accessible to a wide range of users.

### Future Improvements
- Enhancing image processing algorithms to handle more complex leaf shapes and lighting conditions.
- Increase the accuracy of the model.
- Introducing a database for storing processed results and enabling historical analysis.
- Adding batch processing capabilities for large-scale studies.
- Allow exporting more data in the CSV file.

## Deployment Instructions
To deploy the containerized version of the Leaf Scarring Analysis System, run the following Docker command:

```bash
docker run --name project-xyz -p 3000:3000 -e PORT=3000 ghcr.io/tropicsatern36/project-xyz-2024:latest
