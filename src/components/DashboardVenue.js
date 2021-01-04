import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import db from '../firebase/firebase'


const DashboardVenue = ({venueID}) => {
    const [ data, setData ] = useState({areas: []})
    useEffect(() => {
        db.ref(`/${venueID}/`).on('value', (snapshot) => {
            setData(snapshot.val())
        })
    }, [venueID])
    return (
        <div>
            <h1>{data.name}</h1>
            <ul>
            {data.areas.map((area, index) => {
                return ( <React.Fragment>
                    <li>{area.name} ({area.seated}/{area.capacity})</li>
                    </React.Fragment>)
                })}
                <Link to={`/${venueID}/view`}>Display</Link>
                <Link to={`/${venueID}/checkin`}>Checkin</Link>
                <Link to={`/${venueID}/edit`}>Edit</Link>
            </ul>
        </div>
    )
}

export default DashboardVenue