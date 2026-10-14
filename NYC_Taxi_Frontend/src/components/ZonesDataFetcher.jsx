import { ZonesBarChart } from "../pages/data-management/ZonesBarChart";
import { useFetchData } from "../hooks/useFetchData";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";

export function ZonesDataFetcher(){
    const [ zonesData, error, loading] = useFetchData('http://localhost:3000/api/dashboard');

    if(error)return <ErrorMessage />

    if(loading) return <LoadingSpinner />

    return <ZonesBarChart labels={zonesData['labels']} values={zonesData['values']} />
}