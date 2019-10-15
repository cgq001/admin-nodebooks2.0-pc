import React, { Component } from 'react'
import './Home.css'
import Hometable from './Hometable/Hometable'
export default class Home extends Component {
    render() {
        return (
            <div className='home'>
               <Hometable />
            </div>
        )
    }
}
