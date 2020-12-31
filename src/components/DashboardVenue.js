import React from 'react'
import { Link } from 'react-router-dom'

const DashboardVenue = (props) => {
    const areas = props.areas
    return (
        <div>
            <h1>{props.name}</h1>
            <ul>
            {areas.map((area) => {
                return ( <li>{area.name} ({area.seated}/{area.capacity})</li>)
            })}
            </ul>
            <Link to={`/venue/${props.venueID}`}>Display</Link>
            <Link to={`/venue/${props.venueID}/checkin`}>Checkin</Link>
        </div>
    )
}

export default DashboardVenue