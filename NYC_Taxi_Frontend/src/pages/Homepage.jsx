import { TripDetails } from './TripDetails';
import { ToolBar } from './ToolBar';
import './HomePage.css';
import { DataVisualization } from './DataVisualization';

export function HomePage() {
    return (
        <>

            <div className="home-page">
                <div className="header">
                    <p className="title">NYC Taxi Urban Mobility Explorer</p>
                </div>
                <div className="data-grid">
                    <ToolBar />

                    <DataVisualization />

                    <TripDetails />
                </div>
            </div>
        </>
    )
} 