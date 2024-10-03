import os
import csv
from naming_conventions import region_list, country_code_list

# Load the CSV file without pandas
csv_file_path = "../../data/co2_emissions_fossil_land.csv"
with open(csv_file_path, mode="r") as file:
    reader = csv.DictReader(file)
    data = list(reader)


def country_co2_emissions():
    # Check if the file already exists
    file_path = "../../data/country_co2_emissions_fossil_land.csv"
    write_header = not os.path.exists(file_path)

    # Open file in append mode if it exists, otherwise in write mode
    with open(file_path, "a" if not write_header else "w") as f:
        # Write header if needed
        if write_header:
            f.write("Entity,Code,Year,Annual CO2 emissions from land-use change,Annual CO2 emissions from fossil fuels and industry\n")

        # Iterate through each row in the CSV data
        for row in data:
            entity = row["Entity"]
            code = row["Code"]
            year = row["Year"]
            land_use_emissions = row["Annual CO2 emissions from land-use change"]
            fossil_fuel_emissions = row["Annual CO2 emissions from fossil fuels and industry"]

            if code in country_code_list:
                # Write data to file
                f.write(f"{entity},{code},{year},{land_use_emissions},{fossil_fuel_emissions}\n")


def region_co2_emission():
    # Check if the file already exists
    file_path = "../../data/region_co2_emissions_fossil_land.csv"
    write_header = not os.path.exists(file_path)

    # Open file in append mode if it exists, otherwise in write mode
    with open(file_path, "a" if not write_header else "w") as f:
        # Write header if needed
        if write_header:
            f.write("Entity,Code,Year,Annual CO2 emissions from land-use change,Annual CO2 emissions from fossil fuels and industry\n")

        # Iterate through each row in the CSV data
        for row in data:
            entity = row["Entity"]
            code = row["Code"]
            year = row["Year"]
            land_use_emissions = row["Annual CO2 emissions from land-use change"]
            fossil_fuel_emissions = row["Annual CO2 emissions from fossil fuels and industry"]

            if entity in region_list:
                # Write data to file
                f.write(f"{entity},{code},{year},{land_use_emissions},{fossil_fuel_emissions}\n")


# ------ Call the functions -----
country_co2_emissions()
region_co2_emission()
