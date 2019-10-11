import React, { Component } from 'react'
import { Route} from "react-router-dom";
import { Row, Col } from 'antd';
import Leftaside from '../Layout/Leftaside/Leftaside'
import './Home.css'
import Hometable from './Hometable/Hometable'
import Text from './Text/Text'
import Tag from './Tag/Tag'
export default class Home extends Component {
    render() {
        return (
            <div className='home'>
               <Hometable />
            </div>
        )
    }
}
