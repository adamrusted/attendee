import React, { useEffect, useState } from 'react'

import db from '../firebase/firebase'

const App = () => {
    const [ venues, setVenues ] = useState([])
    useEffect(() => {
        db.ref('/').on('value', (snapshot) => {
            setVenues(snapshot.val())
        })
    }, [])
    console.log(venues)
    return (
        <div></div>
    )
}

export default App