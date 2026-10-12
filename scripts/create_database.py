import sqlite3
import polars as pl
import os


DATABASE = "NYC_taxi.db"
TRIPS_DATA = "../data/cleaned_data.csv"
ZONES = "../data/taxi_zone_lookup.csv" 

# Create the database tables
TABLES_SQL =  """
    PRAGMA foreign_keys = on;

    CREATE TABLE IF NOT EXISTS taxi_zones (
        location_id INTEGER PRIMARY KEY,
        borough TEXT NOT NULL,
        zone TEXT  NOT NULL,
        service_zone TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trips (
        trip_id INTEGER PRIMARY KEY AUTOINCREMENT,
        tpep_pickup_datetime TEXT NOT NULL,
        tpep_dropoff_datetime TEXT NOT NULL,
        passenger_count INTEGER NOT NULL,
        trip_distance REAL NOT NULL,
        PULocationID INTEGER NOT NULL,
        DOLocationID INTEGER NOT NULL,
        fare_amount REAL NOT NULL,
        extra REAL NOT NULL,
        mta_tax REAL NOT NULL,
        tip_amount REAL NOT NULL,
        tollS_amount REAL NOT NULL,
        improvement_surcharge REAL NOT NULL,
        congestion_surcharge REAL, 
        total_amount REAL NOT NULL,
        trip_duration REAL NOT NULL, 
        trip_speed REAL NOT NULL,
        tip_percentage INTEGER NOT NULL, 

        FOREIGN KEY (PULocationID) REFERENCES taxi_zones(location_id),
        FOREIGN KEY (DOLocationID) REFERENCES taxi_zones(location_id)

    );
"""

def initialize_database():
    print("Initializing NYC_taxi database...")
    if os.path.exists(DATABASE):
        os.remove(DATABASE)
    
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.executescript(TABLES_SQL)
    
    connection.commit()
    print("Schema created successfully")
    return connection

def insert_zones(connection):
    print("Inserting taxi zones data...")
    if os.path.exists(ZONES):
        zones_df = pl.read_csv(ZONES)
        zones_data = zones_df.select(['LocationID', 'Borough', 'Zone', 'service_zone']).to_numpy().tolist()

        cursor = connection.cursor()

        cursor.executemany(
                "INSERT INTO taxi_zones (location_id, borough, zone, service_zone) VALUES(?,?,?,?)", 
                zones_data
            )
        
        connection.commit()
        print(f"Inserted {len(zones_data)} Zones into taxi_zones table")

def insert_trips(connection):
    if os.path.exists(TRIPS_DATA):
        trips_df = pl.read_csv(TRIPS_DATA)

        trips_data = trips_df.select([
            'tpep_pickup_datetime', 'tpep_dropoff_datetime', 'passenger_count',
            'trip_distance', 'PULocationID', 'DOLocationID', 'fare_amount',
            'extra', 'mta_tax', 'tip_amount', 'tolls_amount', 'improvement_surcharge',
            'congestion_surcharge', 'total_amount', 'trip_duration', 'trip_speed', 'tip_percentage'
        ]).to_numpy().tolist()

        cursor = connection.cursor()

        cursor.executemany(
            """INSERT INTO trips (tpep_pickup_datetime, tpep_dropoff_datetime, 
            passenger_count, trip_distance, PULocationID,
            DOLocationID, fare_amount, extra, mta_tax, tip_amount,
            tolls_amount, improvement_surcharge, congestion_surcharge,
            total_amount, trip_duration, trip_speed, tip_percentage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""", 
            trips_data
        )

        connection.commit()

        print(f"Inserted {len(trips_data)} trips")
        print("All trips inserted successfully")



if __name__ == '__main__':
    database_connection = initialize_database()
    insert_zones(database_connection)
    insert_trips(database_connection)
    database_connection.close
    print("Database setup complete!")
    