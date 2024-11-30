import os
import sys
import io
import re
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Suppress TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Set the encoding for stdout to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Clean output to extract only the disease name
def clean_output(output):
    # Remove ANSI escape sequences for any progress bars
    ansi_escape = re.compile(r'\x1b\[([0-9]{1,2}(?:;[0-9]{1,2})?)?[m|K]')
    output = ansi_escape.sub('', output)
    
    # Remove any unwanted parts before and after the disease name
    # Only keep the part after '___' (as the disease name is after this part)
    disease_name = output.split('___')[-1]  # Get only the part after the '___'
    
    # Replace underscores with spaces and strip any excess whitespace
    disease_name = disease_name.replace('_', ' ').strip()

    return disease_name

# Load the saved model
model = tf.keras.models.load_model('maize_model.h5')

# Get the image path from command-line arguments
img_path = sys.argv[1]

# Load and preprocess the image
img = image.load_img(img_path, target_size=(256, 256))  # Resize image to match model input size
img_array = image.img_to_array(img)  # Convert the image to a numpy array
img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
img_array = img_array / 255.0  # Normalize the image (as done during training)

# Make a prediction
predictions = model.predict(img_array)

# Get the predicted class
predicted_class = np.argmax(predictions, axis=1)

# Map the predicted class to the corresponding label
class_labels = ['Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                'Corn_(maize)___Northern_Leaf_Blight',
                'Corn_(maize)___Common_rust_',
                'Corn_(maize)___healthy']

predicted_label = class_labels[predicted_class[0]]

# Clean the output to get only the disease name
cleaned_output = clean_output(predicted_label)

# Print the cleaned output (only disease name)
print(cleaned_output)
