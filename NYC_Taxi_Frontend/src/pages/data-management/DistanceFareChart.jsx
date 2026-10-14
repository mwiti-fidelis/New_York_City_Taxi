import { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';
import './DistanceFareChart.css';

export default function DistanceFareChart() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/distance_fare_sample.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load data');
                }
                return response.json();
            })
            .then(setData)
            .catch(() => setError('Could not load trip data.'));
    }, []);

    return (
        <div className="distance-fare-chart">
            {error ? (
                <p>{error}</p>
            ) : (
                <ResponsiveContainer width="100%" height={340}>
                    <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis
                            type="number"
                            dataKey="trip_distance"
                            name="Distance"
                            unit=" mi"
                            domain={[0, 40]}
                            tick={{ fill: '#aaa', fontSize: 12 }}
                            label={{
                                value: 'Trip distance (miles)',
                                position: 'insideBottom',
                                offset: -12,
                                fill: '#aaa'
                            }}
                        />
                        <YAxis
                            type="number"
                            dataKey="fare_amount"
                            name="Fare"
                            unit="$"
                            domain={[0, 200]}
                            tick={{ fill: '#aaa', fontSize: 12 }}
                        />
                        <Tooltip
                            formatter={(value, name) => [
                                name === 'Fare'
                                    ? `$${Number(value).toFixed(2)}`
                                    : `${value} miles`,
                                name
                            ]}
                        />
                        <Scatter
                            name="Fare"
                            data={data}
                            fill="#0084ff"
                            fillOpacity={0.6}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            )}
            <p className="distance-fare-chart-note">
                {data.length} sampled trips
            </p>
        </div>
    );
}
