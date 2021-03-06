import React, { Component } from 'react'
import { Row, Col ,Pagination} from 'antd';
import './Manual.css'
import Manuallist from './List/Manuallist'
import axios from '../../axios'
export default class Manual extends Component {
    constructor(props){
        super(props);
        this.state={
            maunalList:[],
            rows: 2,
            page: 1,
            total:0
        }
    }
    componentDidMount(){
        axios.get('getManualPage',{
            params:{
                rows:this.state.rows,
                page:this.state.page
            }
        })
        .then(res=>{
                if(res.data.code === 0){
                   // console.log(res.data)
                    this.setState({
                        maunalList:res.data.data,
                        total:res.data.total
                    })
                }
            })  
    }
    changePage=(page,all)=>{
        let This= this
        this.setState({
            page:page
        })
        axios.get('getManualPage',{
            params:{
              rows:this.state.rows,
              page: page
            }
        })
        .then(res=>{
          
          if(res.data.code === 0){
              This.setState({
                maunalList:res.data.data,
                total: res.data.total
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
                <div className="pages">
                    <Pagination defaultCurrent={this.state.page} defaultPageSize={this.state.rows} total={this.state.total} onChange={this.changePage} />
                </div>
            </div>
        )
    }
}
