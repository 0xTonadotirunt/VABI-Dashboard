import os
import csv

# Load the CSV file without pandas
csv_file_path = "../../data/co2_emissions.csv"
with open(csv_file_path, mode="r") as file:
    reader = csv.DictReader(file)
    data = list(reader)

# Regions
region_list = ["International aviation", "International shipping", "Oceania", "Asia (excl. China and India)", "China", "India", "Africa", "South America", "North America (excl. USA)", "United States", "European Union (27)", "Europe (excl. EU-27)"]


def global_co2_emissions():
    # Check if the file already exists
    file_path = "../../data/global_co2_emissions.csv"
    write_header = not os.path.exists(file_path)

    # Iterate through each row in the CSV data
    for row in data:
        entity = row["Entity"]
        code = row["Code"]
        year = row["Year"]
        annual_co2_emissions = row["Annual CO2 emissions"]

        if code == "OWID_WRL":
            # Write to new file
            with open(file_path, "a") as f:
                if write_header:
                    f.write("Entity, Code, Year, Annual CO2 emissions\n")
                    write_header = False  # Set to False after writing header
                f.write(f"{entity}, {code}, {year}, {annual_co2_emissions}\n")


def country_co2_emissions():
    # Check if the file already exists
    file_path = "../../data/country_co2_emissions.csv"
    write_header = not os.path.exists(file_path)

    # Iterate through each row in the CSV data
    for row in data:
        entity = row["Entity"]
        code = row["Code"]
        year = row["Year"]
        annual_co2_emissions = row["Annual CO2 emissions"]

        if code and code != "OWID_WRL":
            # Write to new file
            with open(file_path, "a") as f:
                if write_header:
                    f.write("Entity, Code, Year, Annual CO2 emissions\n")
                    write_header = False  # Set to False after writing header
                f.write(f"{entity}, {code}, {year}, {annual_co2_emissions}\n")


def region_co2_emission():
    # Check if the file already exists
    file_path = "../../data/region_co2_emissions.csv"
    write_header = not os.path.exists(file_path)

    # Iterate through each row in the CSV data
    for row in data:
        entity = row["Entity"]
        code = row["Code"]
        year = row["Year"]
        annual_co2_emissions = row["Annual CO2 emissions"]

        print(annual_co2_emissions)

        if entity in region_list:
            # Write to new file
            with open(file_path, "a") as f:
                if write_header:
                    f.write("Entity, Code, Year, Annual CO2 emissions\n")
                    write_header = False  # Set to False after writing header
                f.write(f"{entity}, {code}, {year}, {annual_co2_emissions}\n")


# ------ Call the functions -----
# global_co2_emissions()
# country_co2_emissions()
region_co2_emission()
