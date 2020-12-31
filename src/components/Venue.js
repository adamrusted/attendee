import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'
import { DateTime } from 'luxon'
import VenueArea from './VenueArea'

import '../styles/VenueDisplay.css'

const Venue = (props) => {
    const venueID = props.match.params.id
    const [ venue, setVenue ] = useState({areas: [], event: { startTime: 0, intervalTime: 0, endTime: 0 }})
    useEffect(() => {
        db.ref(`${venueID}`).on('value', snapshot => {
            setVenue(snapshot.val())
        })
    }, [venueID])
    return (
        <div className="venue-display__container">
            <div className="venue-display__header-area">
                <h1><span>Welcome to</span>{venue.name}</h1>
            </div>
            {venue.areas.map((area, i) => {
                return (
                    <VenueArea key={i} area={area} />
                )
            })}
            <div className="venue-display__details">
                <h3>Details</h3>
                <p style={{flex: 1}}>{venue.event.title}</p>
                <p>Starts At: <strong>{DateTime.fromMillis(venue.event.startTime).toFormat('HH:mm')}</strong></p>
                {<p>Interval Length: <strong>{venue.event.intervalLength}</strong></p> && venue.intervalLength > 0}
                <p>Ends At: <strong>{DateTime.fromMillis(venue.event.endTime).toFormat('HH:mm')}</strong></p>
            </div>
        </div>
    )
}

export default Venue