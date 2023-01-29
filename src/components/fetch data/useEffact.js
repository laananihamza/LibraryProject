import React from 'react';
import { useState, useEffect } from 'react';
import useFetch from './customHookFetch';
import axios from 'axios';

export let ListObjectUsingEffect = () => {
    const [names, setName] = useState([
        {id: 1, name: "Laravel"},
        {id: 2, name: "React"},
        {id: 3, name: ".net"},
        {id: 4, name: "tailwind"}
    ]) 
    const handlDelete = (idname) => {
        // setName(names.filter((name) => name.id != idname ? name : ''))
        setName(names.filter((name) => name.id !== idname ))
    }
    useEffect(() => {
        // to run Json server use Commande line in learn folder:
        // ?    => npx json-server --watch data/db.json --port 8000
        console.log('useEffect is ran')
    }, [names])
    
    return(
        
        <div className="Framworks">
            <ul>
                    <p>{'-'.repeat(25)}</p>
                    <p>{"From useEffact"}</p>
                    {names.map((name) => (
                        <li key={name.id}> ={'>'} {name.name} <button onClick={() => handlDelete(name.id)}>Delete</button></li>
                        
                    ))}
                    <br />                
            
            </ul>
        
        </div>
    ) 
}

/* Using Json File */
function Places( { ista, title } ) { //{ props }
    // function Options(props) {
        // const options = props.options
        return (
            <div className="info-options">
                <h3>{ title }</h3>
                {ista.Places.map((ista) => (
                    <li key={(ista.id).toString()}>
                        Ista number {ista.id} : { ista.name } 
                        
                    </li>
                ))}
            </div>
        )
}
function Options( { ista, title } ) { //{ props }
    // function Options(props) {
        // const options = props.options
        return (
            <div className="info-options">
                <h3>{ title }</h3>
                {ista.options.map((ista) => (
                    <li key={(ista.id).toString()}>
                        Ista number {ista.id} : { ista.name } 
                    </li>
                ))}
            </div>
        )
}

export let EffectObjectUsingJson = () => {
        
        const [ista, setIsta] = useState(null) 
        const [Loading, setIsLoading] = useState(true) 
        const [error, setIsError] = useState(null) 

        useEffect(() => {
            fetch("http://localhost:8000/ISTA")
            .then(resp => {
                if (! resp.ok) {
                    throw Error('Cannot Fetch the Data from Your Resource')
                }
                return resp.json()
            })
            .then(data => {
                setIsta(data)
                setIsLoading(false)
                setIsError(null)
            }).catch ( err => {
                setIsLoading(false)
                setIsError(err.message)
            }

            )
        }, [])
        return(
            
            
            <div className="ISTA">
                
                <div className="options">
                <ul>
                
                    {error && <div className='error'>{error}</div>}
                    {Loading && <div className='loading'>Loading...</div>}
                        {ista && <Places ista={ista} title="ISTA" />}
                        {ista && <Options ista={ista} title="Options" />}
                    
                
                </ul>
                </div>
            
            </div>
        ) 
    }

    /* Making a custom Hook */

    export let FetchObject = () => {
        
        const {data: ista, Loading, error} = useFetch("http://localhost:8000/ISTA");

        
        return(
            
            
            <div className="ISTA">
                
                <div className="options">
                <ul>
                
                    {error && <div className='error'>{error}</div>}
                    {Loading && <div className='loading'>Loading...</div>}
                        {ista && <Places ista={ista} title="ISTA" />}
                        {ista && <Options ista={ista} title="Options" />}
                    
                
                </ul>
                </div>
            
            </div>
        ) 
    }