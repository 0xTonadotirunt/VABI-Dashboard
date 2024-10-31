import os
import pandas as pd
from naming_conventions import region_list, country_code_list

# Load the dataset (replace 'GDP.csv' with your file path)
df = pd.read_csv('../../../raw_data/co2-emissions-transport.csv')

# Filter rows where Country Code is in country_code_list and Country Name is in region_list
df_filtered = df[
    (df["Code"].isin(country_code_list)) |
    (df["Entity"].isin(region_list))
]

# Rename columns
df_filtered = df_filtered.rename(columns={
    "Country Name": "Entity",
    "Country Code": "Code",
    "Carbon dioxide emissions from transport": "Carbon dioxide emissions from Aviation and Shipping"
})

# View the renamed and reshaped dataframe
print(df_filtered.head())

# Save the file to cleaned folder
output_directory = "../../data/cleaned"

# Create the directory if it doesn't exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Save the new filtered and renamed dataset to the specified directory
output_path = os.path.join(output_directory, "cleaned_aviation&shipping.csv")
df_filtered.to_csv(output_path, index=False)

# Confirm the path where the file was saved
print(f"File saved to: {output_path}")
