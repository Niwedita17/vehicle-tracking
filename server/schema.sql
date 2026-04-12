-- Bulletproof Schema for FleetOps Compliance

-- Vehicles Table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    plate_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    year INTEGER,
    status VARCHAR(20) DEFAULT 'Active',
    odometer VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on plate number for fast lookups
CREATE INDEX idx_vehicles_plate ON vehicles(plate_number);

-- Compliance Documents Table
CREATE TABLE compliance_documents (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
    doc_type VARCHAR(50) NOT NULL, -- 'RC', 'Insurance', 'PUC', 'Fitness', 'Tax'
    doc_number VARCHAR(50),
    status VARCHAR(20) NOT NULL, -- 'Valid', 'Expired', 'Expiring Soon'
    expiry_date DATE NOT NULL,
    last_fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(vehicle_id, doc_type) -- Ensure one doc type per vehicle
);

-- Create index on expiry date for fast alert queries
CREATE INDEX idx_docs_expiry ON compliance_documents(expiry_date);

-- Drivers Table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    contact_number VARCHAR(20),
    status VARCHAR(20) DEFAULT 'Active',
    dl_expiry DATE,
    hazmat_valid DATE,
    eye_test_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
