import './TripDetails.css';

export function TripDetails() {
    return (
        <>
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
        </>
    )
}