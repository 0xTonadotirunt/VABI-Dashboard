import os
import pandas as pd
from naming_conventions import region_list, country_code_list

# Load the dataset (replace 'GDP.csv' with your file path)
df = pd.read_csv('../../../raw_data/co-emissions-by-sector.csv')

# Filter rows where Country Code is in country_code_list and Country Name is in region_list
df_filtered = df[
    (df["Code"].isin(country_code_list)) |
    (df["Entity"].isin(region_list))
]

# Identify the columns that should remain unchanged
id_vars = ['Entity', 'Code', 'Year']  # Adjust this based on your actual file

# Reshape the dataframe while keeping the 'Entity', 'Code', 'Year' columns
df_melted = pd.melt(df_filtered, id_vars=id_vars, var_name='Carbon dioxide emission', value_name='Carbon Dioxide Emission')

# Clean up the 'Carbon dioxide emission' column to extract the type of emission
df_melted['Type of emission'] = df_melted['Carbon dioxide emission'].str.replace('Carbon dioxide emissions from ', '').str.replace('Fugitive emissions of carbon dioxide from ', '')

# Drop the original 'Carbon dioxide emission' column if you don't need it anymore
df_melted = df_melted.drop(columns=['Carbon dioxide emission'])

# View the renamed and reshaped dataframe
print(df_melted.head())

# Save the file to cleaned folder
output_directory = "../../data/cleaned"

# Create the directory if it doesn't exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Save the new filtered and renamed dataset to the specified directory
output_path = os.path.join(output_directory, "cleaned_sector_emissions.csv")
df_melted.to_csv(output_path, index=False)

# Confirm the path where the file was saved
print(f"File saved to: {output_path}")
