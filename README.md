# NYC Taxi Data Dashboard

An interactive dashboard for exploring New York City taxi trip data from January 2019. The project provides summary statistics, hourly trip trends, popular pickup zones, fare-versus-distance data, and filtered trip details.

## Project Structure

```text
New_York_City_Taxi/
├── data/                    # CSV files, taxi zone data, and SQLite database
├── NYC_Taxi_Backend/        # Express API and SQLite database connection
├── NYC_Taxi_Frontend/       # React + Vite dashboard
└── scripts/                 # Optional Python data preparation scripts
```

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm
- The SQLite database file: `data/NYC_taxi.db`

## Download the Codebase

Download the project codebase from [Google Drive](https://drive.google.com/file/d/1thNVwYlyM1V07z5Y88fXTMoucyLl48ng/view?usp=sharing), extract the downloaded archive, and open a terminal in the extracted project folder before following the installation and running instructions below.

## Database Setup

The backend expects the database at the following exact path:

```text
data/NYC_taxi.db
```


## Installation

Open a terminal in the project root and install the dependencies for both applications:

```bash
cd NYC_Taxi_Backend
npm install

cd ../NYC_Taxi_Frontend
npm install
```

## Running the Application

The backend and frontend run as separate processes. Open two terminals.

### 1. Start the backend

From the project root:

```bash
cd NYC_Taxi_Backend
npm install
node server.js
```

The API runs at `http://localhost:3000`.

### 2. Start the frontend

In a second terminal, from the project root:

```bash
cd NYC_Taxi_Frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

**The main way to interact with this project is through the frontend interface. Open the frontend link in your browser and use the dashboard there.** Keep both terminals running while using the dashboard.

## Video Walkthrough

Watch our video walkthrough for a demonstration of the application:

[Open the NYC Taxi Dashboard video walkthrough](https://drive.google.com/file/d/1YGR406EYsoTBshru3mQkyN5o-_slsIIm/view?usp=sharing)

## Available Commands

Run these commands from `NYC_Taxi_Frontend`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## API Endpoints

The backend exposes the following routes:

| Endpoint | Description |
| --- | --- |
| `GET /api/health` | Check that the API is running |
| `GET /api/dashboard` | Get dashboard statistics for all trips |
| `GET /api/dashboard?day=2019-01-25` | Get dashboard statistics for one day |
| `GET /api/trips` | Get the latest trip records |
| `GET /api/trips?day=2019-01-25&limit=20` | Filter trips by day and limit the results |

The supported date format is `2019-01-DD`, where `DD` is the day of January 2019.

## Data Preparation Scripts

The `scripts` directory contains optional Python scripts for preparing the data and creating the SQLite database. These scripts are not required when using the supplied database file.

The raw source file required by the data preparation scripts is:

```text
data/yellow_tripdata_2019-01.csv
```

This file was originally provided on Canvas. Download it from Canvas and place it in the repository's `data` folder before running `clean_data.py`. The filename must remain `yellow_tripdata_2019-01.csv` because the script uses that exact path.

The main input files are:

- `data/yellow_tripdata_2019-01.csv`
- `data/cleaned_data.csv`
- `data/taxi_zone_lookup.csv`

When generating the database from the scripts, run them from the `scripts` directory. The generated database must ultimately be placed at `data/NYC_taxi.db` for the Node.js backend to use it.