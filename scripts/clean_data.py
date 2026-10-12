import csv
from datetime import datetime

input_file = '../data/yellow_tripdata_2019-01.csv'

cleaned_output = '../data/cleaned_data.csv'
dropped_output = '../data/dropped_data.csv'

columns = [
    "tpep_pickup_datetime",
    "tpep_dropoff_datetime",
    "passenger_count",
    "trip_distance",
    "PULocationID",
    "DOLocationID",
    "fare_amount",
    "extra",
    "mta_tax",
    "tip_amount",
    "tolls_amount",
    "improvement_surcharge",
    "congestion_surcharge",
    "total_amount"
]
cleaned_columns = columns + ["trip_duration", "trip_speed", "tip_percentage"]
dropped_columns = columns + ["dropped_reason"]



with open(dropped_output, 'w', newline='', encoding='utf-8') as dropped_file:
    writer = csv.DictWriter(dropped_file, fieldnames=dropped_columns)
    writer.writeheader()

    with open(input_file, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        for row in reader:
            dropped_reasons = []

            total_amount = float(row["total_amount"])
            if total_amount <= 0:
                dropped_reasons.append("total_amount <= 0")

                
            fare_total = (
                float(row["fare_amount"])
                + float(row["extra"])
                + float(row["mta_tax"])
                + float(row["tip_amount"])
                + float(row["tolls_amount"])
                + float(row["improvement_surcharge"])
                + float(row["congestion_surcharge"] or 0)
                )
                
            if abs(fare_total - total_amount) > 0.01:
                dropped_reasons.append("fare_total != total_amount")


            pickup = datetime.strptime(
                row["tpep_pickup_datetime"], "%Y-%m-%d %H:%M:%S"
                )
            dropoff = datetime.strptime(
                row["tpep_dropoff_datetime"], "%Y-%m-%d %H:%M:%S"
                )
            if dropoff <= pickup:
                dropped_reasons.append("dropoff <= pickup")


            distance = float(row["trip_distance"])
            if distance <= 0:
                dropped_reasons.append("trip_distance <= 0")

            passengers = int(row["passenger_count"])
            if passengers <= 0:
                dropped_reasons.append("passenger_count <= 0")

            if dropped_reasons:
                dropped_row = {column: row[column] for column in columns}
                dropped_row["dropped_reason"] = "; ".join(dropped_reasons)
                writer.writerow(dropped_row)

with open(cleaned_output, 'w', newline='', encoding='utf-8') as cleaned_file:
    writer = csv.DictWriter(cleaned_file, fieldnames=cleaned_columns)
    writer.writeheader()