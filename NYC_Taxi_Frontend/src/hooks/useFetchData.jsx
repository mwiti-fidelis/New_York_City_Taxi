import axios from 'axios';
import { useState, useEffect } from 'react';

export function useFetchData(url){
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    
    useEffect(()=>{
        const getData = async () => {
            setError(null)
            setLoading(true)

            try {
                const response = await axios.get(url);
                const raw_data = response.data;

                const tripValues = [];
                const tripLabels = [];
                const zonesValues = [];
                const zonesLabels = [];
                const summaryObject = null;

                // Save the summary data for the mini dashboard
                if(raw_data?.summary){
                    summaryObject = raw_data.summary;
                }
                
                // save data for the zones barchart
                if(raw_data?.topPickUpZones){
                    raw_data['topPickUpZones'].forEach(zone => {
                        zonesLabels.push(zone['zone']);
                        zonesValues.push(zone['trips'])
                    })
                }
                
                // save data for the in number of trips and hours for the trip barchart
                if(raw_data?.tripsByHour){
                    raw_data['tripsByHour'].forEach(trip => {
                        const time = trip['hour']
                        tripLabels.push(trip[`${time}:00`]);
                        tripValues.push(trip['trips']);
                    });
                }

                setData({
                    zones: {labels: zonesLabels, values: zonesValues},
                    trips: {labels: tripLabels, values: tripValues}, 
                    summary: summaryObject
                });

            }catch(error){
                setError(error.message || "There has been an error in fetching the data")
            }finally{
                setLoading(false)
            }

        }
        if(url){
            getData();
        }
    }, [url]);
    
    return { data, error, loading }
}