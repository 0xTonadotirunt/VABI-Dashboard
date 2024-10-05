import os
import pandas as pd
from naming_conventions import region_list, country_code_list

# Load the dataset (replace 'GDP.csv' with your file path)
df = pd.read_csv('GDP.csv')

# Unpivot the dataframe using pd.melt() to move the years into rows under a 'Year' column
df_melted = pd.melt(df, id_vars=["Country Name", "Country Code"], var_name="Year", value_name="Value")

# Filter rows where Country Code is in country_code_list and Country Name is in region_list
df_filtered = df_melted[
    (df_melted["Country Code"].isin(country_code_list)) |
    (df_melted["Country Name"].isin(region_list))
]

# Rename columns
df_renamed = df_filtered.rename(columns={
    "Country Name": "Entity",
    "Country Code": "Code",
    "Value": "GDP growth (annual %)"
})

# Round the GDP values to 2 decimal places
df_renamed["GDP growth (annual %)"] = df_renamed["GDP growth (annual %)"].round(2)

# View the renamed and reshaped dataframe
print(df_renamed.head())

# Save the file to cleaned folder
output_directory = "../../data/cleaned"

# Create the directory if it doesn't exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Save the new filtered and renamed dataset to the specified directory
output_path = os.path.join(output_directory, "cleaned_GDP.csv")
df_renamed.to_csv(output_path, index=False)

# Confirm the path where the file was saved
print(f"File saved to: {output_path}")
