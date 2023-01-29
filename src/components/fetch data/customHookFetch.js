import{ useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null) 
        const [Loading, setIsLoading] = useState(true) 
        const [error, setIsError] = useState(null) 
    useEffect(() => {
        const AbortCont = new AbortController();
        fetch(url,  {signal: AbortCont.signal})
        .then((resp) => {
            if (! resp.ok) {
                throw Error('Cannot Fetch the Data from Your Resource')
            }
            return resp.json()
        })
        .then(data => {
            setData(data)
            setIsLoading(false)
            setIsError(null)
        }).catch ( err => {
            if (err.name !== 'AbortError') {
                setIsLoading(false)
                setIsError(err.message)
            }
        }
    
        )
        return () => AbortCont.abort();
    }, [url])
    return {data, Loading, error}
}

export default useFetch;