import { ZonesBarChart } from "../pages/data-management/ZonesBarChart";

export function ZonesDataFetcher({ zonesData }){
    return zonesData ? (
        <ZonesBarChart labels={zonesData.labels} values={zonesData.values} />
    ) : null;
}