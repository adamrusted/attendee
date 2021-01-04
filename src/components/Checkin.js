import React, { useEffect, useState } from 'react'

import db from '../firebase/firebase'
import '../styles/Clicker.css'

const setMessage = (seated, capacity) => {
    if(seated >= capacity) {
        return "Area Full"
    } else if(seated >= (capacity*0.5)) {
        return "Some Availability"
    } else {
        return "Good Availability"
    }
}

const Checkin = (props) => {
    const venueID = props.match.params.id
    const [ areas, setAreas ] = useState([])
    const [ active, setActive ] = useState(0)
    useEffect(() => {
        db.ref(`/${venueID}/areas/`).on('value', (snapshot) => {
            setAreas(snapshot.val())
        })
    }, [venueID])
    const onAdd = (i, addToArea) => {
        addToArea.seated++
        db.ref(`${venueID}/areas/${i}`).update({
            seated: addToArea.seated,
            status: setMessage(addToArea.seated, addToArea.capacity)
        })
    }
    const onMinus = (i, takeFromArea) => {
        takeFromArea.seated--
        db.ref(`${venueID}/areas/${i}`).update({
            seated: takeFromArea.seated,
            status: setMessage(takeFromArea.seated, takeFromArea.capacity)
        })
    }

    return (
        <div className="checkin__container">{areas.map((area, i) => {
            if(area.active) {
                return (

                    <div className={i === active ? `checkin-app__item active` : `checkin-app__item`} onClick={() => {
                        setActive(i);
                    }}>
                        <h2>{area.name}</h2>
                        <h1>{area.seated}/{area.capacity} Seated</h1>
                        <div className="checkin-app__buttons">
                            <button disabled={area.seated === 0} onClick={() => { onMinus(i, area)}}>-</button>
                            <button disabled={area.seated >= area.capacity} onClick={() => { onAdd(i, area)}}>+</button>
                        </div>
                    </div>

                )
            } else {
                return null
            }
        })}</div>
    )
}

export default Checkin