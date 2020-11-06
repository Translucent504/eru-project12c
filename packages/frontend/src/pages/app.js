import React, { useContext } from 'react'
import {Router} from '@reach/router'
import { IdentityContext } from '../../netlifyIdentityContext'
import Navbar from '../components/Navbar'
import { navigate } from 'gatsby'
import { Heading } from 'theme-ui'
 


const Dash = () => {
    const context = useContext(IdentityContext)
    const user = context.user
    console.log(user.id)
    console.log(user.user_metadata.full_name)
    return (
        <div>
            <Navbar/>
            <Heading as="h1">
                Your Todos:
            </Heading>
        </div>
    )
}


const App = () => {
    const context = useContext(IdentityContext)
    const user = context.user
    if(!user){
        navigate('/')
    }
    return (
        <Router>
            <Dash path="/app"/>
        </Router>
    )
}

export default App
