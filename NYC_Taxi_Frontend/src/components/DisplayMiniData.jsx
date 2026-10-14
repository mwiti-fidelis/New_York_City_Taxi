import '../pages/data-management/DataVisualization.css';

export function DisplayMiniData({ summary }) {

    return (
        <div className="minidata-container">
            <div className="mini-grid">
                <p className="minidata-p">Total trips</p>
                <p className="minidata-data">{summary.totalTrips}</p>
                <p className="minidata-p">Jan 2019</p>
            </div>
            <div className="mini-grid">
                <p className="minidata-p">Avg Fare</p>
                <p className="minidata-data">{summary.averageFare}</p>
                <p className="minidata-p">Per trip</p>
            </div>
            <div className="mini-grid">
                <p className="minidata-p">Avg Distance</p>
                <p className="minidata-data">{summary.averageDistance}</p>
                <p className="minidata-p">Per trip</p>
            </div>
            <div className="mini-grid">
                <p className="minidata-p">Avg tip</p>
                <p className="minidata-data">{summary.averageTip}</p>
                <p className="minidata-p">Per trip</p>
            </div>
        </div>
    )
}