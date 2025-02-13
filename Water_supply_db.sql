CREATE TABLE punto_distribucion (
    ejercicio INT NOT NULL,
    mes VARCHAR(50) NOT NULL,
    nombre_punto_distribucion VARCHAR(100) NOT NULL,
    tipo_asentamiento VARCHAR(50) NOT NULL,
    denominacion_asentamiento VARCHAR(100) NOT NULL,
    nombre_vialidad VARCHAR(100) NOT NULL,
    numero_vialidad VARCHAR(50) NOT NULL,
    tipo_abastecimiento VARCHAR(50) NOT NULL,
    dias VARCHAR(100) NOT NULL,
    horarios VARCHAR(100) NOT NULL,
    contacto TEXT,
    capacidad_unidad VARCHAR (20) NOT NULL,
    geopoint VARCHAR (100) NOT NULL,
    nota VARCHAR (1000) NOT NULL
);

SELECT * FROM punto_distribucion

CREATE TABLE cleaned_water_distribution (
    ID SERIAL PRIMARY KEY,  -- Assuming ID is a unique identifier
    Fecha VARCHAR (50) NOT NULL,     -- Storing date values
    Latitude FLOAT NOT NULL, -- Latitude as a floating-point number
    Longitude FLOAT NOT NULL, -- Longitude as a floating-point number
    Establecimiento VARCHAR(1000) NOT NULL, -- Establishment name
    Tipo_de_asentamiento VARCHAR(50) NOT NULL, -- Type of settlement
    Colonia VARCHAR(100) NOT NULL, -- Neighborhood or area
    Vialidad VARCHAR(100) NOT NULL, -- Street name
    Numero_de_vialidad VARCHAR(50), -- Street number (optional)
    Tipo_de_abastecimiento VARCHAR(50) NOT NULL, -- Type of supply
    Dias VARCHAR(100) NOT NULL, -- Days of operation
    Horarios VARCHAR(100) NOT NULL, -- Operating hours
    Capacidad_de_la_unidad VARCHAR(20) NOT NULL -- Capacity of the unit
);

SELECT * FROM cleaned_water_distribution