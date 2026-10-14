import { useFetchData } from "../hooks/useFetchData"
import { TripBarChart } from "../pages/data-management/TripBarChart"
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
 
export function DataFetcher (){
    const [ zonesData, error, Loading, tripChartData ] = useFetchData('http://localhost:3000/api/dashboard')

    if(Loading)return <LoadingSpinner />
    if(error)return <ErrorMessage message={error} />

    return <TripBarChart data={zonesData} labels={tripChartData.labels} values={tripChartData.values} />

}