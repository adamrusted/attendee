import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import db from '../firebase/firebase'


const DashboardVenue = () => {
    const [ data, setData ] = useState({areas: []})
    useEffect(() => {
        db.ref('/').on('value', (snapshot) => {
            setData(snapshot.val())
        })
    }, [])
    return (
        <div>
            <h1>{data.name}</h1>
            <ul>
            {data.areas.map((area) => {
                return ( <li>{area.name} ({area.seated}/{area.capacity})</li>)
            })}
            </ul>
            <Link to={`/view`}>Display</Link>
            <Link to={`/checkin`}>Checkin</Link>
            <Link to={`/edit`}>Edit</Link>
        </div>
    )
}

export default DashboardVenue