import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const useFetch = () => {
    const [data, setData] = useState([])  
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const [error, setError] = useState(false)

    const link = ''
    console.log(link)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://hotel-server-beryl.vercel.app/hotel/allhotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)
                setData(res.data)

            } catch (err) {
                setError(err)
            }
        }
        fetchData()
    }, [destination,max,min])

    const reFetch = async () => {
        try {
            const res = await axios.get(`https://hotel-server-beryl.vercel.app/hotel/allhotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)
            setData(res.data)

        } catch (err) {
            setError(err)
        }
    }

    return {data, error, reFetch}
}

export default useFetch