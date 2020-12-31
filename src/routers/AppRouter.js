import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardVenue from '../components/DashboardVenue'
import EditVenue from '../components/EditVenue'
import Venue from '../components/Venue'
import Checkin from '../components/Checkin'

import '../styles/base.css'

export default function AppRouter() {
    return (
        <Router>
            <div className="main-container">
                <Switch>
                    <Route path="/" exact={true} component={DashboardVenue} />
                    <Route path="/edit" exact={true} component={EditVenue} />
                    <Route path="/view" exact={true} component={Venue} />
                    <Route path="/checkin" exact={true} component={Checkin} />
                </Switch>
            </div>
        </Router>
    )
}