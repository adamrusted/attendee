import React, { useEffect, useState } from 'react'

import DashboardVenue from './DashboardVenue'
import db from '../firebase/firebase'

const Dashboard = () => {
    const [ venues, setVenues ] = useState([])
    useEffect(() => {
        db.ref('/').on('value', (snapshot) => {
            setVenues(snapshot.val())
        })
    }, [])
    return (
        <div>{venues.map((venue, i) => {
            return ( <DashboardVenue key={i} venueID={i} {...venue} />)
        })}</div>
    )
}


export default Dashboard