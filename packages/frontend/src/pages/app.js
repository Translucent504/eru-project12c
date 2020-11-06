import React, { useContext } from 'react'
import {Router, Link} from '@reach/router'
import { IdentityContext } from '../../netlifyIdentityContext'
 


const Dash = () => {
    const context = useContext(IdentityContext)
    const user = context.user
    return (
        <div>
            {user && user.user_metadata.full_name}
        </div>
    )
}


const App = () => {
    return (
        <Router>
            <Dash path="/app"/>
        </Router>
    )
}

export default App
