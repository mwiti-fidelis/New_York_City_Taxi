import axios from 'axios';
import { useState, useEffect } from 'react';

export function useFetchData(url){
    const [ zonesData, setZonesData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ tripChartData, setTripChartData ] = useState({labels: [], values: []})

    
    useEffect(()=>{
        const getData = async () => {
            const response = await axios.get(url);
            const raw_data = response.data;

            try {
                const newValues = [];
                const newLabels = [];
                const zonesValues = [];
                const zonesLabels = [];

                // save data for the zones barchart
                raw_data['topPickUpZones'].forEach(zone => {
                    zonesLabels.push(zone['zoone']);
                    zonesValues.push(zone['trips'])
                })
                setZonesData({labels: zonesLabels, values: zonesValues}); 
                
                // save data for the in number of trips and hours for the trip barchart
                raw_data['tripsByHour'].forEach(trip => {
                    const time = trip['hour']
                    newLabels.push(trip[`${time}:00`]);
                    newValues.push(trip['trips']);
                })

                setTripChartData({labels: newLabels, values: newValues});

            }catch(error){
                setError(error.message || "There has been an error in fetching the data")
            }finally{
                setLoading(false)
            }

        }
        getData();
    },
[url]);
    
    return { zonesData, error, loading, tripChartData }
}