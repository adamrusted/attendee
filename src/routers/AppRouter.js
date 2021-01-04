import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import EditVenue from '../components/EditVenue'
import Venue from '../components/Venue'
import Checkin from '../components/Checkin'

import '../styles/base.css'

export default function AppRouter() {
    return (
        <Router>
            <div className="main-container">
                <Switch>
                    <Route path="/" exact={true} component={Dashboard} />
                    <Route path="/:id/edit" exact={true} component={EditVenue} />
                    <Route path="/:id" exact={true} component={Venue} />
                    <Route path="/:id/view" exact={true} component={Venue} />
                    <Route path="/:id/checkin" exact={true} component={Checkin} />
                </Switch>
            </div>
        </Router>
    )
}