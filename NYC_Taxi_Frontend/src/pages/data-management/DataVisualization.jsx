import { useState } from 'react';
import './DataVisualization.css';
import { DisplayMiniData } from '../../components/DisplayMiniData';
import { TripsDataFetcher } from '../../components/TripsDataFetcher';
import { ZonesDataFetcher } from '../../components/ZonesDataFetcher';
import DistanceFareChart from './DistanceFareChart';
import { useFetchData } from '../../hooks/useFetchData';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage'


export function DataVisualization() {
    const { data, error, loading } = useFetchData("http://localhost:3000/api/dashboard");
    const [ showTripChart, setShowTripChart ] = useState();
    const [ showZoneChart, setShowZoneChart ] = useState();

    
    if(loading)return <LoadingSpinner />
    if(error) return <ErrorMessage message={error}/>
    if(!data) return null;


    return (
        <>
            {/* Mini Data Display */}
            <DisplayMiniData summary={data.summary} />

{/* Trips by hour bar chart */}
            <div className="data-charts-container">
                <div className="trip-by-hour-container">
                    <div className="container-info">
                        <p className="container-info-title">Trips by Hour of Day</p>
                        <p>Evening rush is the busiest period</p>
                    </div>
                    {/* if showChart is false, display the button otherwise show the TripBarChart */}
                    {!showTripChart && (
                        <button className='display-data-btn' onClick={()=>setShowTripChart(true)}>Display trips</button>
                    )}
                    {showTripChart && <TripsDataFetcher tripsData={data.trips} />}
                    <div className="grid-footer">
                        Bar Chart: trips per hour (0 to 23)
                    </div>
                </div>
{/* Top Zones bar chart */}
                <div className="pickup-zones-data-cotainer">
                    <div className="container-info">
                        <div className="container-info-title">Busiest Pickup Zones</div>
                        <p>Midtown and the airports lead pickups</p>
                    </div>
                    {!showZoneChart && (
                        <button className='display-data-btn' onClick={()=>setShowZoneChart(true)}>Display Zones</button>
                    )}
                    {showZoneChart && <ZonesDataFetcher zonesData={data.zones} />}
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