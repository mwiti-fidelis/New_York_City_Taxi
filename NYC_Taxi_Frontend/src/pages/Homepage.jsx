import './HomePage.css';

export function HomePage() {
    return (
        <>

            <div className="home-page">
                <div className="header">
                    <p className="title">NYC Taxi Urban Mobility Explorer</p>
                </div>
                <div className="data-grid">
                    <div className="tool-bar-container">
                        <div className="filters">
                            <div className="sort-bar">
                                <select className="filter-by-tool" name="date-sort">
                                    <option value="Date Range">Date Range</option>
                                    <option value="Date Range">Date Range</option>
                                    <option value="Date Range">Date Range</option>
                                    <option value="Date Range">Date Range</option>
                                </select>
                            </div>
                            <div className="sort-bar">
                                <select className="filter-by-tool" name="zone-sort">
                                    <option value="Borough">Borough</option>
                                    <option value="Date Range">Date Range</option>
                                    <option value="Date Range">Date Range</option>
                                    <option value="Date Range">Date Range</option>
                                </select>
                            </div>
                            <div className="sort-bar">
                                <select className="filter-by-tool" name="trip-dependecies-sort">
                                    <option value="distance">Distance</option>
                                    <optgroup label="Number of passengers">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}

                                    </optgroup>
                                    <option value="duration">Duration</option>
                                    <option value="speed">Speed</option>
                                    <optgroup label="Peak hours">
                                        <option value="6">6 AM</option>
                                        <option value="7">7 AM</option>
                                        <option value="8">8 AM</option>
                                        <option value="9">9 AM</option>
                                        <option value="18">6 PM</option>
                                        <option value="19">7 PM</option>
                                        <option value="20">8 PM</option>
                                        <option value="21">9 PM</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="sort-bar">
                                <select className="filter-by-tool" name="trip-charges-sort">
                                    <option value="fare">Fare</option>
                                    <option value="tip">Tip</option>
                                    <option value="total_charges">Total Charged</option>
                                    <option value="tolls_amount">Toll Amount</option>
                                </select>
                            </div>
                        </div>

                        <div className="filter-btns">
                            <button className="apply-filters-btn primary-button">Apply</button>
                            <button className="reset-filters-btn secondary-button">Reset</button>
                        </div>
                    </div>

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
                            <div className="trip-by-hour-bar-chart"></div>
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
                        <div className="distance-vs-fare-scatter-plot"></div>
                        <div className="grid-footer">Scatter plot: Trip distances Vs Fare amount</div>
                    </div>

                    <div className="trip-details-container">
                        <div className="trip-details">
                            <p className="container-info-title">Trip Details</p>
                            <div className="trip-details-grid">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Pickup time</th>
                                            <th>Distance </th>
                                            <th>Pickup zone</th>
                                            <th>Drop-off zone</th>
                                            <th>Fare</th>
                                            <th>Tip</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2019-01-15 08:42</td>
                                            <td>3.1 mi</td>
                                            <td>Midtown Center</td>
                                            <td>JFK Airport</td>
                                            <td>$14.20</td>
                                            <td>$2.80</td>
                                        </tr>
                                        <tr>
                                            <td>2019-01-15 09:10</td>
                                            <td>1.8 mi</td>
                                            <td>Upper East Side</td>
                                            <td>Midtown</td>
                                            <td>$9.50</td>
                                            <td>$1.50</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 