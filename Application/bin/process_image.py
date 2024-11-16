#This is a dummy file for the image processor
# implement loading r-cnn image processor that returns 3 outputs
import sys
import json
import numpy as np
import cv2
import os
import tensorflow as tf

if __name__ == "__main__":
    # Import model
    # print current directory to log
    print(f"Current directory: {os.getcwd()}")

    model = tf.keras.models.load_model('bin/leaf_detection_model.h5')

    img_height, img_width = 128, 128  # Example dimensions

    # Read the image from stdin
    input_data = sys.stdin.read().strip()
    image_path = json.loads(input_data)['image_path']

    image_path = 'leaf_9.jpg'

    image = cv2.imread(image_path)
    image = cv2.resize(image, (img_height, img_width))

    image = image.astype('float32') / 255.0  # Normalize

    scarCount=model.predict(np.expand_dims(image, axis=0))  # Add batch dimension
    scarArea=0
    damagePercent = 0
    
    result = {
        'scarCount':scarCount,
        'surfaceArea':scarArea,
        'damagePercent':damagePercent
    }
    print(json.dumps(result))
