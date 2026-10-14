import { TripBarChart } from "../pages/data-management/TripBarChart"
 
export function DataFetcher ({ tripsData}){
    return tripsData ? (
        <TripBarChart labels={tripsData.labels} values={tripsData.values} />
    ) : null;

}