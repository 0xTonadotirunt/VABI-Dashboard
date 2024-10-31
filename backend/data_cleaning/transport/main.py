import openpyxl

# Define categories
electric_category = "Electric"
fuel_category = ["Petrol", "Diesel", "CNG", "Petrol-CNG"]
hybrid_category = ["Petrol-Electric", "Petrol-Electric (Plug-In)", "Diesel-Electric", "Diesel-Electric (Plug-In)"]

# Define file path and initialize processed data structure
file_path = "../../../raw_data/M09-Vehs_by_Fuel_Type.xlsx"
processed = {
    2016: {"electric": 0, "fuel": 0, "hybrid": 0},
    2017: {"electric": 0, "fuel": 0, "hybrid": 0},
    2018: {"electric": 0, "fuel": 0, "hybrid": 0},
    2019: {"electric": 0, "fuel": 0, "hybrid": 0},
    2020: {"electric": 0, "fuel": 0, "hybrid": 0},
    2021: {"electric": 0, "fuel": 0, "hybrid": 0},
    2022: {"electric": 0, "fuel": 0, "hybrid": 0},
    2023: {"electric": 0, "fuel": 0, "hybrid": 0},
    2024: {"electric": 0, "fuel": 0, "hybrid": 0},
}

# Load the Excel file
workbook = openpyxl.load_workbook(file_path)
sheet = workbook.active

# Iterate through each row in the Excel data
for index, row in enumerate(sheet.iter_rows(values_only=True)):
    if index == 0:  # Skip the first row (header)
        continue

    # Extract and process values from the row
    date_string = row[0]
    category = row[1]
    type = row[2]
    number = row[3]

    # Check if `number` is valid and convert it
    if isinstance(number, str):
        number = number.replace(",", "").strip()  # Remove commas and any extra spaces
        if not number.isdigit():  # Skip if `number` is not a valid integer
            continue
        number = int(number)
    elif isinstance(number, int):
        pass  # Number is already an integer
    else:
        continue  # Skip rows where number is None or other types

    # Extract the year from the date string
    current_year = int(date_string.split("-")[0])

    # Categorize and update counts
    if type == electric_category:
        processed[current_year]["electric"] += number
    elif type in fuel_category:
        processed[current_year]["fuel"] += number
    elif type in hybrid_category:
        processed[current_year]["hybrid"] += number

# Print the result
print(processed)
