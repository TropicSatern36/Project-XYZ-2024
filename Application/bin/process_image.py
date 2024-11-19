import sys
import json
import numpy as np
import cv2
import tensorflow as tf

if __name__ == "__main__":
    try:
        # Load the model (ensure the path to the model is correct)
        model = tf.keras.models.load_model('bin/leaf_detection_model.h5')

        # Set image dimensions expected by the model
        img_height, img_width = 128, 128

        # Read JSON input from stdin
        input_data = sys.stdin.read().strip()

        # Parse the input data to extract the image path
        data = json.loads(input_data)

        if 'image_path' not in data:
            raise ValueError("The input JSON does not contain 'image_path' to the image.")

        image_path = data['image_path']  # Extract image path from the JSON input

        # Read and process the image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Error loading image from path: {image_path}")
        
        # Resize the image to match model input size
        image = cv2.resize(image, (img_height, img_width))
        
        # Normalize the image
        image = image.astype('float32') / 255.0

        # Predict scar count using the model
        predicted_objects = model.predict(np.expand_dims(image, axis=0))  # Add batch dimension
        scarCount = predicted_objects[0][0]


        # Placeholder values for scar area and damage percent
        scarArea = 0.003
        damagePercent = 0.003

        # Create the result dictionary with the required data
        result = {
            'scarCount': int(round(scarCount.tolist())),  # Convert numpy array to list for JSON serialization
            # Round to 2 decimal places
            'surfaceArea': format(round(scarArea,2),'.2f'),
            'damagePercent': format(round(damagePercent,2),'.2f')
        }

        # Output the final result as a JSON string (ensure no extra logs are printed)
        print(json.dumps(result))  # Ensure only JSON output

    except Exception as e:
        # If any exception occurs, output it as an error message in JSON format
        error_result = {
            'error': str(e),
            'scarCount': None,  # Convert numpy array to list for JSON serialization
            'surfaceArea': None,
            'damagePercent': None
        }
        print(json.dumps(error_result))  # Ensure to print the JSON error result
