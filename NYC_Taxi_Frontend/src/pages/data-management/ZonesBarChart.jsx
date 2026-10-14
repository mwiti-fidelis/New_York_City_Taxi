import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart.js elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function ZonesBarChart({ labels, values }){
    const data = {
        labels: labels,
        datasets: [{
            label: 'Top Performing Zones',
            data: values,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(68, 68, 68, 0.2)',
            borderWidth: 1
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'Top'
            },
            title: {
                display: true,
                text: 'Top Pickup Zones'
            },
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            height: '350px',
            padding: '10px',
            margin: '0 auto'
        }}>
            <Bar data={data} options={options} />
        </div>
    );
}