// Initialize the map with a center point and a zoom level
let myMap = L.map('map').setView([25.2605, -99.9018], 8);

// Add OpenStreetMap tiles to the map
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Data for the dams including their name and coordinates
const damData = [
    { name: "La Boca", lat: 25.4282, lon: -100.1278 },
    { name: "Cerro Prieto", lat: 24.9422, lon: -99.4004 },
    { name: "El Cuchillo", lat: 25.7117, lon: -99.2774 }
];

// Iterate through the dam data and add markers to the map
damData.forEach(dam => {
    L.marker([dam.lat, dam.lon]).addTo(myMap)
        .bindPopup(dam.name)
        .openPopup();
});

// Get the context of the canvas element where the chart will be rendered
const ctx = document.getElementById('myChart').getContext('2d');

// Data for the dams including their fill percentage and storage volume
const data = [
    { name: "La Boca", fill: 92.12, storage: 36.379 },
    { name: "Cerro Prieto", fill: 115.63, storage: 346.875 },
    { name: "El Cuchillo", fill: 95.29, storage: 1070.193 }
];

// Extract the dam names, fill percentages, and storage volumes for the chart
const names = data.map(dam => dam.name);
const fills = data.map(dam => dam.fill);
const storages = data.map(dam => dam.storage);

// Create a new bar chart
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [
            {
                label: 'Fill (%)', // Dataset label for fill percentages
                data: fills,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Storage (Mm³)',
                data: storages,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
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
homeButton.addTo(myMap);