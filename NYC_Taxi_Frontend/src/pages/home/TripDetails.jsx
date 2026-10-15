import './TripDetails.css';

export function TripDetails( {trips = [] }) {
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
                                {trips.map((trip, index) => (
                                <tr key={`${trip.pickupTime}-${index}`}>
                                    <td>{trip.pickupTime}</td>
                                    <td>{Number(trip.distance).toFixed(2)} mi</td>
                                    <td>{trip.pickupZone || 'Unknown'}</td>
                                    <td>{trip.dropoffZone || 'Unknown'}</td>
                                    <td>${Number(trip.fare).toFixed(2)}</td>
                                    <td>${Number(trip.tip).toFixed(2)}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}