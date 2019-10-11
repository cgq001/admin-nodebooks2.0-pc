import React, { Component } from 'react'
import { Row, Col } from 'antd';
import './Manual.css'
import Manuallist from './List/Manuallist'
import axios from '../../axios'
export default class Manual extends Component {
    constructor(props){
        super(props);
        this.state={
            maunalList:[]
        }
    }
    componentDidMount(){
        axios.get('getManual')
            .then(res=>{
                if(res.data.code === 0){
                    //console.log(res.data.data)
                    this.setState({
                        maunalList:res.data.data
                    })
                }
            })  
    }
    render() {
        return (
            <div className='manual'>
                 <Row>
                    <Col xs={24} sm={24} md={24} lg={20} xl={16} className='manual-box'>
                        {this.state.maunalList.map((item,index)=>{
                            return (
                                <Manuallist key={index} item={item} />
                            )
                        })}       
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={8}>

                    </Col>
                </Row>
            </div>
        )
    }
}
