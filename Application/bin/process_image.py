#This is a dummy file for the image processor
import json
if __name__ == "__main__":

    # image processor code goes here
    result = {
        'scarCount':42,
        'surfaceArea':250.75,
        'damagePercent':16.8
    }
    print(json.dumps(result))
    #returns a json object to express
