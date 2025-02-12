# VABI Dashboard

A comprehensive dashboard application for visualizing and analyzing greenhouse gas emissions data, with a focus on Singapore and ASEAN regions.

## Overview

VABI Dashboard is a full-stack web application that provides interactive visualizations of greenhouse gas emissions data. It features multiple sections including overall emissions trends, transport, agriculture, trees, manufacturing, and policy impacts.

## Features

- Interactive data visualizations using Tableau integration
- Real-time data updates and animations
- Responsive design with mobile support
- Multiple dashboard sections:
  - Overall Emissions Trends
  - Transport Emissions
  - Agriculture Impact
  - Singapore Trees Project
  - Manufacturing Emissions
  - Policy Analysis

## Tech Stack

### Frontend

- React + Vite
- TailwindCSS for styling
- Recharts for charts
- Tableau API for data visualization
- React Router for navigation

## Installation

### Prerequisites

- Node.js (v18+)

### Frontend Setup

1. Navigate to the frontend directory:

```
sh
cd frontend
```

2. Install dependencies:

```
sh
npm install
```

## Running the Application

### Frontend Development Server

1. Start the frontend:

```
sh
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
├── frontend/ # React frontend application
│ ├── public/ # Static files
│ │ ├── assets/ # Images, fonts, etc.
│ │ └── index.html # HTML entry point
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── contexts/ # React contexts
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API services
│ │ ├── utils/ # Utility functions
│ │ ├── App.tsx # Root component
│ │ └── main.tsx # Application entry point
│ ├── package.json
├── backend/ # Flask backend application
│ ├── data/ # Data files and datasets
│ │ ├── co2_emissions/
│ │ ├── transport/
│ │ └── trees/
│ ├── data_cleaning/ # Data processing scripts
│ │ ├── aviation&shipping/
│ │ ├── co2_emissions/
│ │ ├── gdp/
│ │ ├── sector_emissions/
│ │ └── transport/
│
├── tableau/ # Tableau workbooks and data sources
```

## Features

### VABI Dashboard Core Features

1. Main Dashboard

- Global, Singapore & ASEAN emissions tracking
- Real-time emissions reduction progress
- Interactive data visualizations
- Emissions breakdown by gas type

2. Sector Analysis

- Transport: Vehicle emissions & YoY changes
- Agriculture: Emissions & future projections
- Trees: Singapore tree planting impact
- Manufacturing: Industrial emissions
- Policy: Regulatory impact analysis

3. Visualization Tools

- Tableau integration
- Custom charts (Line, Pie, Geo)
- Progress gauges
- Interactive maps

4. Technical Features

- React + Vite frontend
- Flask backend API
- Real-time data processing
- Mobile-responsive design
- Dark mode interface
- Data Management
- CSV data processing
- Multiple data source integration
- Historical data tracking
- Future projections modeling

The application serves as a mock environmental monitoring tool, primarily focused on tracking and visualizing Singapore and global progress toward emissions reduction goals across various sectors.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
