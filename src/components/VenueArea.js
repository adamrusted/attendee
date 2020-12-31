import React from 'react'

const VenueArea = ({venue, area}) => {
    return (
        <div className={area.seated >= area.capacity ? `venue-display__card area-full` : `venue-display__card`}>
            <h2>{area.name}</h2>
            <h3>{area.status}</h3>
            <p>{area.seated} / {area.capacity}</p>
        </div>
    )
}

export default VenueArea