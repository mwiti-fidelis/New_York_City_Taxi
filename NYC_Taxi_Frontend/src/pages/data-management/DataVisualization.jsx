import { useState } from 'react';
import './DataVisualization.css';
import { DataFetcher } from '../../components/TripsDataFetcher';
import DistanceFareChart from './DistanceFareChart';
export function DataVisualization() {
    const [showChart, setShowChart ] = useState();

    const handleClick = () => {
        setShowChart(true);
    }

    return (
        <>
            <div className="minidata-container">
                <div className="mini-grid">
                    <p className="minidata-p">Total trips</p>
                    <p className="minidata-data">1000</p>
                    <p className="minidata-p">Jan 2019</p>
                </div>
                <div className="mini-grid">
                    <p className="minidata-p">Avg Fare</p>
                    <p className="minidata-data">$14.20</p>
                    <p className="minidata-p">Per trip</p>
                </div>
                <div className="mini-grid">
                    <p className="minidata-p">Avg Distance</p>
                    <p className="minidata-data">3.1 mi</p>
                    <p className="minidata-p">Per trip</p>
                </div>
                <div className="mini-grid">
                    <p className="minidata-p">Avg tip</p>
                    <p className="minidata-data">$2.80</p>
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
                    {!showChart && (
                        <button className='display-data-btn' onClick={handleClick}>Display Data</button>
                    )}
                    {showChart && <DataFetcher />}
                    <div className="grid-footer">
                        Bar Chart: trips per hour (0 to 23)
                    </div>
                </div>

                <div className="pickup-zones-data-cotainer">
                    <div className="container-info">
                        <div className="container-info-title">Busiest Pickup Zones</div>
                        <p>Midtown and the airports lead pickups</p>
                    </div>
                    <div className="pickup-zone-bar-chart"></div>
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
                    <DistanceFareChart />
                </div>
                <div className="grid-footer">Scatter plot: Trip distances Vs Fare amount</div>
            </div>
        </>
    )
}