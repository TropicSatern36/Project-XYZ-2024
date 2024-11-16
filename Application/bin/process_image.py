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
    model = tf.keras.models.load_model('leaf_detection_model.h5')

    img_height, img_width = 128, 128  # Example dimensions

    # Read the image from stdin
    input_data = sys.stdin.read().strip()
    image_path = json.loads(input_data)['image_path']

    image = cv2.imread(image_path)
    image = cv2.resize(img, (img_height, img_width))

    image = image.astype('float32') / 255.0  # Normalize

    scarCount=model.predict(np.expand_dims(img, axis=0))  # Add batch dimension
    scarArea=0
    damagePercent = 0
    
    result = {
        'scarCount':scarCount,
        'surfaceArea':scarArea,
        'damagePercent':damagePercent
    }
    print(json.dumps(result))
