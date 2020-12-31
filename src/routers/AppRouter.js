import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Venue from '../components/Venue'
import Checkin from '../components/Checkin'

import '../styles/base.css'

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={Dashboard} />
                <Route path="/venue/:id" exact={true} component={Venue} />
                <Route path="/venue/:id/checkin" exact={true} component={Checkin} />
            </Switch>
        </Router>
    )
}