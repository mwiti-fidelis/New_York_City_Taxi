import geopandas as gpd

input_file = "../data/taxi_zones/taxi_zones.shp"
output_file = "../data/taxi_zones.geojson"

source = gpd.read_file(input_file)

print("SOURCE")
print("Total features:", len(source))
print("Unique LocationIDs:", source["LocationID"].nunique())
print("Duplicate LocationIDs:",
      source["LocationID"].duplicated().sum())

zones = gpd.read_file(input_file)

print(f"Converting {input_file} to {output_file}...")

zones = zones.to_crs(epsg=4326)

zones.to_file(output_file, driver="GeoJSON")

print(f"Conversion complete. Output saved to {output_file}.")
print("New CRS:", zones.crs)

check = gpd.read_file(output_file)

print("Total zones:", len(check))
print("Unique LocationIDs:", check['LocationID'].nunique())
print("Missing LocationIDs:", check["LocationID"].isna().sum())
print("CRS:", check.crs)
print("Geometry types:", check.geometry.geom_type.value_counts().to_dict())
