import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../firebase/firebase'
import { DateTime } from 'luxon'
import VenueArea from './VenueArea'

import '../styles/VenueDisplay.css'

const Venue = (props) => {
    const venueID = props.match.params.id
    const [ venue, setVenue ] = useState({areas: [], event: { startTime: 0, intervalTime: 0, endTime: 0 }})
    useEffect(() => {
        db.ref(`/${venueID}/`).on('value', snapshot => {
            setVenue(snapshot.val())
        })
    }, [venueID])
    return (
        <React.Fragment>
        <Link className="tinyHomeLink" to={`/`}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></Link>
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
        </React.Fragment>
    )
}

export default Venue