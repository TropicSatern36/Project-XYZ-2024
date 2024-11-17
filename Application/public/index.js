/**
 * Function to handle image upload and display.
 *
 * @param {Event} event - The change event triggered by selecting a file in the image input field.
 */



imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Clear previous image preview
            imagePreview.innerHTML = '';

            // Create and append the new image element
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.appendChild(img);

            // Simulate image processing (e.g., scar counting and area calculation)
            //simulateImageProcessing();

            // Display file uploaded information
            console.log(`File uploaded: ${file.name}`);
            console.log(`File size: ${file.size} bytes`);
            imageProcessing(file);
        };
        reader.readAsDataURL(file);
    }

    else {
        console.error('No file selected!');
    }
});

/**
 * Function to process the uploaded image and retrieve results.
 *
 * @param {File} img - The uploaded image file.
 */
/**
 * Function to process the uploaded image and retrieve results.
 *
 * @param {File} img - The uploaded image file.
 */
// Function to process the uploaded image
async function imageProcessing(file) {
    // Create FormData and append the file
    const formData = new FormData();
    formData.append('image', file);

    try {
        // Send request to server and wait for the response
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData, // Send FormData with the image
        });

        console.log('Sent');
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the response JSON
        const data = await response.json();
        console.log('Received data:', data);

        // Update UI with the received data
        scarCount.textContent = data.scarCount;
        surfaceArea.textContent = `${data.surfaceArea} cm²`;
        damagePercent.textContent = `${data.damagePercent}%`;

    } catch (error) {
        console.error('Error processing image:', error);
    } finally {
        // Reset the input field after processing
        imageInput.value = ''; // Clear the input field
        console.log('Done');
    }
}



/**
 * Simulated image processing results.
 * This function should be replaced with real image processing logic.
 */

/**
 * Handle export button click.
 * This function simulates exporting results by showing an alert.
 * In a real application, you might generate a CSV or Excel file.
 */
exportBtn.addEventListener('click', () => {

    // Example: Generating a CSV string (could be sent to a server or downloaded)
    const csvContent = `
        Scar Count,Surface Area (cm²),Damage Percentage (%)
        ${scarCount.textContent},${surfaceArea.textContent},${damagePercent.textContent}
    `;

    console.log("Exported CSV content:\n", csvContent); // Output to console for now

    // Send csv file to client
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'results.csv';
    link.click();
});

/**
 * Handle remove pictures button click.
 * This function clears all pictures from the 'pictureContainer' element.
 */
document.getElementById('removePictures').addEventListener('click', function () {
    const pictureContainer = document.getElementById('pictureContainer');
    if (pictureContainer) {
        pictureContainer.innerHTML = ''; // Clear all pictures
    }
});
