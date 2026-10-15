import { useState } from 'react';
import './DataVisualization.css';
import DistanceFareChart from './DistanceFareChart';
import { TripBarChart } from './TripBarChart';
import { ZonesBarChart } from './ZonesBarChart';

export function DataVisualization({ dashboardData}) {
    const [showChart, setShowChart ] = useState(false);

    const handleClick = () => {
        setShowChart(true);
    }

    const tripChartData = dashboardData.tripsByHour || [];
    const labels = tripChartData.map(item => `${item.hour}:00`);
    const values = tripChartData.map(item => item.trips);
    const zoneData = dashboardData.topPickUpZones || [];
    const zoneLabels = zoneData.map((item) => item.zone);
    const zoneValues = zoneData.map((item) => item.trips);


    return (
        <>
            <div className="minidata-container">
                <div className="mini-grid">
                    <p className="minidata-p">Total trips</p>
                    <p className="minidata-data">
                        {dashboardData.summary.totalTrips}
                    </p>
                    <p className="minidata-p">Jan 2019</p>
                </div>
                <div className="mini-grid">
                    <p className="minidata-p">Avg Fare</p>
                    <p className="minidata-data">
                        ${Number(dashboardData.summary.averageFare).toFixed(2)}
                    </p>
                    <p className="minidata-p">Per trip</p>
                </div>
                <div className="mini-grid">
                    <p className="minidata-p">Avg Distance</p>
                    <p className="minidata-data">
                        {Number(dashboardData.summary.averageDistance).toFixed(2)} mi
                    </p>
                    <p className="minidata-p">Per trip</p>
                </div>
                <div className="mini-grid">
                    <p className="minidata-p">Avg tip</p>
                    <p className="minidata-data">
                        ${Number(dashboardData.summary.averageTip).toFixed(2)}
                    </p>
                    <p className="minidata-p">Per trip</p>
                </div>
            </div>

            <div className="data-charts-container">
                <div className="trip-by-hour-container">
                    <div className="container-info">
                        <p className="container-info-title">Trips by Hour of Day</p>
                        <p>Evening rush is the busiest period</p>
                    </div>
                    {/* if showChart is false, display the button otherwise show the TripBarChart */}
                    {!showChart ? (
                        <button 
                            className='display-data-btn' 
                            onClick={handleClick}
                        >
                            Display Data
                        </button>
                    ) : (
                        <TripBarChart labels={labels} values={values} />
                    )}
                    <div className="grid-footer">
                        Bar Chart: trips per hour (0 to 23)
                    </div>
                </div>

                <div className="pickup-zones-data-cotainer">
                    <div className="container-info">
                        <div className="container-info-title">Busiest Pickup Zones</div>
                        <p>Midtown and the airports lead pickups</p>
                    </div>
                    <div className="pickup-zone-bar-chart">
                        <ZonesBarChart labels={zoneLabels} values={zoneValues} />
                    </div>
                    <div className="grid-footer">
                        Ranked bar chart: top 10 pickup zones
                    </div>
                </div>
            </div>

            <div className="distance-fare-comparison-container">
                <div className="container-info">
                    <p className="container-info-title">Distance Vs Fare</p>
                    <p>Fare rises with the distance, with a few outliers</p>
                </div>
                <div className="distance-vs-fare-scatter-plot">
                    <DistanceFareChart data={dashboardData.distanceFare} />
                </div>
                <div className="grid-footer">Scatter plot: Trip distances Vs Fare amount</div>
            </div>
        </>
    )
}