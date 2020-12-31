import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'
import { DateTime } from 'luxon'
import VenueArea from './VenueArea'

import '../styles/VenueDisplay.css'

const Venue = (props) => {
    const [ venue, setVenue ] = useState({areas: [], event: { startTime: 0, intervalTime: 0, endTime: 0 }})
    useEffect(() => {
        db.ref().on('value', snapshot => {
            setVenue(snapshot.val())
        })
    }, [])
    return (
        <div className="venue-display__container">
            <div className="venue-display__header-area">
                <h1><span>Welcome to</span>{venue.name}</h1>
            </div>
            {venue.areas.map((area, i) => {
                if(area.active) {
                    return <VenueArea key={i} area={area} />
                } else {
                    return null
                }
            })}
            <div className="venue-display__details">
                <h3>{venue.event.title}</h3>
                <p style={{flex: 1}}>{venue.event.description}</p>
                <p>Starts At: <strong>{DateTime.fromMillis(venue.event.startTime).toLocaleString(DateTime.TIME_SIMPLE)}</strong></p>
                {venue.event.intervalLength > 0 && <p>Interval Length: <strong>{venue.event.intervalLength} minutes</strong></p>}
                <p>Ends At: <strong>{DateTime.fromMillis(venue.event.endTime).toFormat('HH:mm')}</strong></p>
            </div>
        </div>
    )
}

export default Venue