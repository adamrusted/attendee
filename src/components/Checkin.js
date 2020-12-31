import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import db from '../firebase/firebase'
import '../styles/Clicker.css'

const setMessage = (seated, capacity) => {
    if(seated === capacity) {
        return "Area Full"
    } else if(seated >= (capacity*0.5)) {
        return "Some Availability"
    } else {
        return "Good Availability"
    }
}

const Checkin = (props) => {
    const [ areas, setAreas ] = useState([])
    const [ active, setActive ] = useState(0)
    const venueID = props.match.params.id
    useEffect(() => {
        db.ref(`${venueID}/areas`).on('value', (snapshot) => {
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
            return (

                <div className={i === active ? `checkin-app__item active` : `checkin-app__item`} onClick={() => {
                    setActive(i);
                }}>
                    <h2>{area.name}</h2>
                    <h1>{area.seated}/{area.capacity} Seated</h1>
                    <div className="checkin-app__buttons">
                    <button disabled={area.seated === 0} onClick={() => { onMinus(i, area)}}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></button>
                        <button disabled={area.seated === area.capacity} onClick={() => { onAdd(i, area)}}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></button>
                    </div>
                </div>

            )
        })}</div>
    )
}

export default Checkin