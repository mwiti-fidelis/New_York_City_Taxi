import './ToolBar.css';

export function ToolBar() {
    return (
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
    )
} 