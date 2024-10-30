#This is a dummy file for the image processor
# implement loading r-cnn image processor that returns 3 outputs
import sys
import json
import numpy as np
import cv2
import os
from mrcnn import model as mrcnn_model
from mrcnn import config
from mrcnn import visualize

# Define the RCNN model
class LeafScarringConfig(config.Config):
    NAME = "LeafScarring"
    NUM_CLASSES = 2
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1
    DETECTION_MIN_CONFIDENCE = 0.8
    
# Load the model
def load_model(model_path):
    config = LeafScarringConfig()
    model = mrcnn_model.MaskRCNN(mode="inference",model_dir=os.getcwd(),config=config)
    model.load_weights(model_path, by_name=True)
    return model

# Image processing and analysis functions

def process_leaf_scarring(image, results):
    scarCount = 0
    scararea = 0
    total_area = image.shape[0]*image.shape[1]

    # Detect instances and count scars
    for i in range(len(results['rois'])):
        if results['scores'][i] >= LeafScarringConfig.DETECTION_MIN_CONFIDENCE:
            scar_count += 1
            mask = results['masks'][:,:,i]
            scar_area += np.sum(mask)

    damage_percent = (scar_area / total_area) * 100 if total_area > 0 else 0

    return scar_count, scar_area, damage_percent


if __name__ == "__main__":
    model_path = 'rcnn_model.h5' #Path to saved model
    model = load_model(model_path)

    # Read the image from stdin
    input_data = sys.stdin.read().strip()
    image_path = json.loads(input_data)['image_path']

    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    results = model.detect([image], verbose=0)[0]

    scarCount, scarArea, damagePercent = process_leaf_scarring(image, results)
    
    result = {
        'scarCount':scarCount,
        'surfaceArea':surfaceArea,
        'damagePercent':damagePercent
    }
    print(json.dumps(result))
