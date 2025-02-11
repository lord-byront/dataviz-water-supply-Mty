// Load CSV data
// Initialize the map
var map = L.map('map').setView([25.6866, -100.3161], 12); // Monterrey center

// Add a tile layer (Base map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Define colors for supply types
const colors = {
    'pipa': 'purple', 
    'contenedor': 'yellow'
};

// Dictionary to store markers by coordinate
const markerGroups = {};
const markerLayer = L.layerGroup().addTo(map); 

// Function to load and process CSV data
async function loadCSV() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/lord-byront/dataviz-water-supply-Mty/refs/heads/supply-type-map/wst%20points/Resources/cleaned_water_distribution.csv');
        const data = await response.text();
        const rows = data.split("\n").slice(1); // This removes header

        rows.forEach(row => {
            const cols = row.split(",");
            if (cols.length < 10) return;  // Ensures valid row data

            const lat = parseFloat(cols[2]);  // Latitude (Column #3)
            const lon = parseFloat(cols[3]);  // Longitude (Column #4)
            const supplyType = cols[9].trim().toLowerCase(); // 'Tipo de abastecimiento' (Column #10)
            const colonia = cols[6].trim(); // 'Colonia' (Column #7)
            const establecimiento = cols[4].trim(); // 'Establecimiento' (Column #5)

            if (!isNaN(lat) && !isNaN(lon)) {
                const key = `${lat},${lon}`; 

                if (!markerGroups[key]) {
                    markerGroups[key] = {
                        supplyTypes: new Set(),
                        colonia: colonia,
                        establecimiento: establecimiento
                    };
                }

                markerGroups[key].supplyTypes.add(supplyType);
            }
        });

        updateMarkers("all"); // Show all markers on load

    } catch (error) {
        console.error("Error loading CSV:", error);
    }
}

// Function to update markers based on filter selection
function updateMarkers(filterType) {
    markerLayer.clearLayers(); // Remove existing markers

    Object.keys(markerGroups).forEach(key => {
        const [lat, lon] = key.split(',').map(Number);
        const supplyTypes = Array.from(markerGroups[key].supplyTypes);
        const colonia = markerGroups[key].colonia;
        const establecimiento = markerGroups[key].establecimiento;

        // Show all, or filter by type
        if (filterType === "all" || supplyTypes.includes(filterType)) {
            const markerColor = colors[supplyTypes[0]] || 'gray';

            const marker = L.circleMarker([lat, lon], {
                color: markerColor, 
                radius: 8, 
                fillOpacity: 0.8
            })
            .bindPopup(`<b>Neighborhood:</b> ${colonia}<br><b>Establishment:</b> ${establecimiento}`);

            markerLayer.addLayer(marker);
        }
    });
}

// Event listener for dropdown selection change
document.getElementById("supplyFilter").addEventListener("change", function() {
    updateMarkers(this.value);
});

// Load CSV and add markers
loadCSV();

// Create a control for the home button
const homeButton = L.control({ position: 'topright' });

homeButton.onAdd = function () {
    const div = L.DomUtil.create('div'); // Create a div for the button
    const button = L.DomUtil.create('button', 'home-button'); // Create the button element
    button.innerHTML = 'Go Home'; // Button text

    // Add event listener to the button
    button.onclick = function() {
        window.location.href = '../index.html'; // Redirect to the main index page
    };

    div.appendChild(button); // Append the button to the div
    return div; // Return the div containing the button
};

// Add the home button to the map
homeButton.addTo(map);