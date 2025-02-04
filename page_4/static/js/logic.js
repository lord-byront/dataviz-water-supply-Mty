// Create the 'basemap' tile layer that will be the background of our map.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

  

// Create the map object with center and zoom options.
let myMap = L.map("map", {
  center: [25.704628, -100.324548],
  zoom: 11,
  layers: [street]
});

// Then add the 'basemap' tile layer to the map.
let baseMaps = {
  "Street Map": street,
};


// Call the json whith the polygons for the "zones"
d3.json("https://lord-byront.github.io/dataviz-water-supply-Mty/Resources/nuevoleon.json").then(function (data) {

  function style_poly(feature) {
    return {
      opacity: 1,
      fillOpacity: .1,
      fillColor: 'F8F8F5',
      stroke: true,
      weight: 0.5
    };
  }
  
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.polygon(latlng);
    },

    style: style_poly,

    onEachFeature: function (feature, layer) {
      layer.bindPopup("<b>Colonia: </b>" +feature.properties.SETT_NAME);

    }
  }).addTo(myMap);

  
  });

// Make a request that retrieves the water geoJSON data.
d3.json("https://lord-byront.github.io/dataviz-water-supply-Mty/Resources/puntos-de-abastecimiento-de-agua-a-nivel-municipal-monterrey.geojson").then(function (data) {

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: .40,
      fillColor: getColor(feature.properties.horarios),
      color: getColor(feature.properties.horarios),
      radius: getRadius(feature.properties.capacidad_de_la_unidad),
      stroke: true,
      weight: 0.5
    };
  }

  function getRadius(liters) {
    let size = liters.replace(/\D/g, '');
    if (size / 500 < 5){
      return 5;
    }
    else{
      return size / 800;
    }
    
    }

  function getColor(time) {
    if (time === 'Se realiza el llenado cuando se vacían'){
      return "#ff5f65";
    }
    else if (time === '8:00 a.m. a 7:59 a.m.'){
      return "#fba35d";
    }
    else if (time === '8:00 a 8:00'){
      return "#fdb72a";
    }
    else if (time === '8:00 a 17:00'){
      return "#f6db11";
    }
    else if (time === '8:00 a.m. a 5:00 p.m.'){
      return "#f6db11";
    }
    else if (time === '7:00 a 22:30'){
      return "#dcf401";
    }
    else {
      return "#a3f600";
    }
  }

  setTimeout(function (){
  
    L.geoJson(data, {

      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
  
      style: styleInfo,
  
      onEachFeature: function (feature, layer) {
              layer.bindPopup("<b>Nombre del punto de distribución: </b>"+ feature.properties.nombre_del_punto_de_distribucion +'<br><br><span style="color: #B0BCB5 ;"><b>Horario de distribución: </b>'+ feature.properties.horarios  + "</span><br><br><b>Días de distribución: </b>" + feature.properties.dias + "<br><b>Horario de distribución: </b>" + feature.properties.ejercicio+ "<br><b>Mes de registro: </b>" + feature.properties.mes+ "<br><br><b>Este centro tiene una capacidad de: </b>" +feature.properties.capacidad_de_la_unidad);
  
      }
      
    // Add the data to the layer.
    }).addTo(myMap);
              
  }, 1000);


    // Create a legend control object.
    let legend = L.control({
      position: "bottomright"
    });


  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depth = ['7:00 a 18:00', '7:00 a 22:30', '8:00 a 17:00', '8:00 a 8:00', '8:00 a 7:59', 'Se realiza el llenado cuando se vacían'];
    let colors = ['#a3f600','#dcf401','#f6db11','#fdb72a','#fba35d','#ff5f65']

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depth.length; i++) {
      div.innerHTML += 
    "<i style='background: " + colors[i] + " '></i>" + 
    depth[i]+ "<br>";
    }
    return div;
  };


  // Finally, add the legend to the map.

  legend.addTo(myMap)

  let legend2 = L.control({
    position: "topright"
  });




  // Creating a legend to go back "home"
  legend2.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');

    // Add your legend content here
    div.innerHTML = '<h4>Monterrey water supply</h4>'; 
    div.innerHTML += '<p>This map shows different records of previous water supply schedules.</p>'; 

    // Create the home button
    let homeButton = L.DomUtil.create('button', 'home-button');
    homeButton.innerHTML = 'Go home';
    homeButton.style.marginTop = '10px'; // Add some spacing

    // Add event listener to the home button
    homeButton.onclick = function() {
        window.location.href = '../index.html'; 
    };

    div.appendChild(homeButton); // Append the button to the legend

    return div;
};


  // Finally, add the legend to the map.

  legend2.addTo(myMap)


});








