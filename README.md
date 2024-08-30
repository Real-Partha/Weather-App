# Astratine Weather Visualization

This project is a weather data visualization application built using React, Redux, Recharts, and TypeScript. The app loads weather data from a CSV file and presents it in interactive charts and a virtualized data list, making it efficient and scalable for large datasets.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [CSV Data Format](#csv-data-format)
- [Usage](#usage)
  - [Filtering Data](#filtering-data)
  - [Visualizing Data](#visualizing-data)
  - [Virtual Scrolling](#virtual-scrolling)
- [Technology Stack](#technology-stack)

## Features

- **Data Visualization**: Temperature data is visualized using a line chart, and precipitation data is visualized using a bar chart.
- **Virtual Scrolling**: Efficient rendering of large datasets in a virtualized data list.
- **State Management**: Uses Redux for managing and persisting application state.
- **Filtering**: Filter weather data by city and date range.
- **Type Safety**: Written in TypeScript to provide type safety and reduce bugs.
- **CSV Parsing**: Parses weather data from a CSV file using the `d3-dsv` library.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- Basic knowledge of React, Redux, and TypeScript.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Real-Partha/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

1. **Generate the CSV data**:
   To simulate weather data, run the following Python script:
   ```bash
   python generate_weather_data.py
   ```
   This will generate a `weather_data.csv` file.

2. **Move the CSV file**:
   Move the generated `weather_data.csv` file to the `public` folder of the React app:
   ```bash
   mv weather_data.csv public/
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

- `src/`: Contains all source code files.
  - `app/`: Contains Redux store setup.
  - `features/`: Contains Redux slices for state management.
  - `components/`: Contains reusable React components.
  - `App.tsx`: The main entry point of the application.
  - `index.tsx`: Renders the React app to the DOM.
- `public/`: Contains static assets, including the `weather_data.csv` file.
- `generate_weather_data.py`: A script to generate mock weather data.

## CSV Data Format

The CSV file should be in the following format:

```
Date,City,Temperature,Precipitation,Wind Speed,Humidity
2022-06-27,Chicago,12.4,39.8,16.2,24.6
2022-07-04,Phoenix,21.2,90.2,7.0,46.0
2023-03-11,Houston,26.0,38.7,15.3,40.9
```

- **Date**: The date of the weather data.
- **City**: The city for which the weather data is recorded.
- **Temperature**: The temperature in degrees Celsius.
- **Precipitation**: The precipitation in millimeters.
- **Wind Speed**: The wind speed in kilometers per hour.
- **Humidity**: The humidity percentage.

## Usage

### Filtering Data

- **Select City**: Use the dropdown to select a specific city or view data for all cities.
- **Select Date Range**: Use the date pickers to filter the data by a specific date range.

### Visualizing Data

- **Temperature Trends**: A line chart visualizes temperature trends over time.
- **Precipitation**: A bar chart displays precipitation levels over time.

### Virtual Scrolling

- The data list is virtualized using `react-window` to efficiently handle large datasets, ensuring smooth scrolling performance.

## Technology Stack

- **Frontend**: React, TypeScript, Recharts
- **State Management**: Redux Toolkit
- **Data Parsing**: `d3-dsv` for CSV parsing
- **Styling**: CSS
- **Virtualization**: `react-window` for virtual scrolling
