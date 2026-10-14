import sqlite3
connection = sqlite3.connect("NYC_taxi.db")
cursor = connection.cursor()
cursor.execute("CREATE INDEX IF NOT EXISTS idx_trips_pickup_time ON trips(tpep_pickup_datetime)")
cursor.execute("CREATE INDEX IF NOT EXISTS idx_trips_pu_location ON trips(PULocationID)")
cursor.execute("CREATE INDEX IF NOT EXISTS idx_trips_do_location ON trips(DOLocationID)")
cursor.execute("CREATE INDEX IF NOT EXISTS idx_trips_fare ON trips(fare_amount)")
connection.commit()
connection.close()
   