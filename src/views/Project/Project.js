import React, { Component } from 'react'
import './Project.css'
import { Row, Col } from 'antd';
import Projectlist from './Projectlist/Projectlist'
import axios from '../../axios'
export default class Project extends Component {
    constructor(props){
        super(props);
        this.state={
            projectList: []
        }
    }
    componentDidMount(){
        axios.get('getProjectList')
            .then(res=>{
                if(res.data.code === 0){
                    this.setState({
                        projectList:res.data.data

                    })
                    //console.log(res.data)
                }
            })
    }
    render() {
        return (
            <div>
                
                <Row>
                    {/* <Col className="gutter-row" xs={12} sm={12} md={12} lg={8} xl={6} xxl={4}>
                        <Projectlist />
                    </Col> */}
                    {this.state.projectList.map((item,index)=>{
                        return (
                           
                            <Col key={index} className="gutter-row" xs={12} sm={12} md={12} lg={8} xl={6} xxl={4}>
                                 <Projectlist key={index} item={item} />
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
}
