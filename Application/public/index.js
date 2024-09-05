
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const scarCount = document.getElementById('scarCount');
    const surfaceArea = document.getElementById('surfaceArea');
    const damagePercent = document.getElementById('damagePercent');
    const exportBtn = document.getElementById('exportBtn');

    // Function to handle image upload and display
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
                simulateImageProcessing();
            };
            reader.readAsDataURL(file);
        }
    });

    // Simulated image processing results (replace this with real image processing logic)
    function simulateImageProcessing() {
        // For demonstration, we'll just set some static values
        const simulatedScarCount = 42; // Example scar count
        const simulatedSurfaceArea = 250.75; // Example surface area in cm²
        const simulatedDamagePercent = 16.8; // Example damage percentage

        // Update the results section with simulated data
        scarCount.textContent = simulatedScarCount;
        surfaceArea.textContent = simulatedSurfaceArea + ' cm²';
        damagePercent.textContent = simulatedDamagePercent + '%';
    }

    // Handle export button click
    exportBtn.addEventListener('click', () => {
        // Here we simulate exporting results by showing an alert
        // In a real application, you might generate a CSV or Excel file
        alert('Results exported successfully!');

        // Example: Generating a CSV string (could be sent to a server or downloaded)
        const csvContent = `
            Scar Count,Surface Area (cm²),Damage Percentage (%)
            ${scarCount.textContent},${surfaceArea.textContent},${damagePercent.textContent}
        `;

        console.log("Exported CSV content:\n", csvContent); // Output to console for now
    });
});
document.getElementById('removePictures').addEventListener('click', function() {
    // Assuming pictures are within an element with the ID 'pictureContainer'
    const pictureContainer = document.getElementById('pictureContainer');
    if (pictureContainer) {
      pictureContainer.innerHTML = ''; // Clear all pictures
    }
  });
  
  
  