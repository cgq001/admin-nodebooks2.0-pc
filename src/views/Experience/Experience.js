import React, { Component } from 'react'
import {  Row, Col , Timeline, Icon } from 'antd';
import './Experience.css'
import axios from '../../axios'
import moment from 'moment'
export default class Experience extends Component {
    constructor(props){
        super(props);
        this.state={
            experienceList:[]
        }
    }
    componentDidMount(){
        axios.get('getExperience')
            .then(res=>{
                if(res.data.code === 0){
                    //console.log(res.data)
                    this.setState({
                        experienceList:res.data.data
                    })
                }
            })
    }
    render() {
        return (
            <div className='experience'>
                 <Row>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18} className='summary-content'>
                            {/* 经历 */}
                            <Timeline mode="alternate">
                                {this.state.experienceList.map((item,index)=>{
                                    return (
                                        <Timeline.Item key={index} className='timelist'>
                                            <h3 className='timelist-head'>{item.name}</h3>
                                            <p className='timelist-title'>{item.introduction}</p>
                                            <p className='timelist-time'>{moment(item.dataList[0]).format('YYYY-MM-DD')}&nbsp;&nbsp;至&nbsp;&nbsp;{moment(item.dataList[1]).format('YYYY-MM-DD')}</p>
                                        </Timeline.Item>
                                    )
                                })}  
                            </Timeline>
                    </Col>
                
                </Row>
            </div>
        )
    }
}
