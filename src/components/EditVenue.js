import React, {useEffect, useReducer } from 'react'

import db from '../firebase/firebase'
import AreaReducer from '../reducers/AreaReducer'

const EditVenue = () => {
    const [state, dispatch] = useReducer(AreaReducer, { event: {}, areas: []})
    useEffect(() => {
        db.ref().on('value', snapshot => {
            dispatch({type: 'DATA_LOAD', value: snapshot.val()})
        })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('/').set(state)
    }
    return (
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={(e) => { handleSubmit(e) }}>
            <label>Venue Name</label><input value={state.name} onChange={(e) => {dispatch({type: 'VENUE_NAME', value: e.target.value})}}/>
            <label>Event Name</label><input value={state.event.title} onChange={(e) => {dispatch({type: 'EVENT_NAME', value: e.target.value})}}/>
            <label>Event Description</label><textarea value={state.event.description} onChange={(e) => {dispatch({type: 'EVENT_DESC', value: e.target.value})}}/>
            <label>Event Start Time</label><input value={state.event.startTime} onChange={(e) => {dispatch({type: 'EVENT_START_TIME', value: e.target.value})}}/>
            <label>Event End Time</label><input value={state.event.endTime} onChange={(e) => {dispatch({type: 'EVENT_END_TIME', value: e.target.value})}}/>
            <label>Event Interval Length</label><input value={state.event.intervalLength} onChange={(e) => {dispatch({type: 'EVENT_INTERVAL_LENGTH', value: e.target.value})}}/>
            {state.areas.map((area, index) => {
                return (
                    <div key={index}><h3>Area {index + 1}</h3>
                        <label>Area Name</label><input value={state.areas[index].name} onChange={(e) => {
                            dispatch({type: 'AREA_NAME', id: index, value: e.target.value})
                        }}/>
                        <label>Area Capacity</label><input type="number" value={area.capacity} onChange={(e) => {
                            dispatch({type: 'AREA_CAPACITY', id: index, value: e.target.value})
                        }} />
                        <input type="checkbox" checked={area.active} onClick={(e) => { dispatch({type: 'TOGGLE_ACTIVE', id: index, value: area.active}) }} />
                    </div>
                )
            })}
            <input type="submit" />
        </form>
    )

}

export default EditVenue