import store from '../../../store/index'
import React, { Component } from 'react'

import { Row, Col ,Divider ,Pagination } from 'antd';
import { Link ,Redirect } from "react-router-dom";
import Homelist from './Homelist/Homelist'
import './Hometable.css'
import axios from '../../../axios'
export default class Hometable extends Component {
    constructor(props){
        super(props);
        this.state={
            txt: '',
            page: 1,
            rows: 2,
            textList:[],
            hotList:[],
            total:0
        }
        store.subscribe(()=>{
          //  console.log()
          if(this.state.txt != store.getState().texts){
            this.setState({
                txt:store.getState().texts,
                page:1,
                rows: 2
            })
           // console.log(store.getState().texts)
            this.infoTextlist(1,store.getState().texts)
            
          }
           
        })
    }
    componentDidMount(){
        this.infoTextlist()
        axios.get('latelyGetText')
            .then(res=>{
                if(res.data.code === 0){
                    this.setState({
                        hotList:res.data.data
                    })
                }
            })

    }
    infoTextlist=(page=this.state.page,txt='')=>{
        axios.get('getTextLits',{
            params:{
                page:page,
                rows: this.state.rows,
                txt: txt
            }
        })
        .then(res=>{
            if(res.data.code === 0){
                let table=res.data.table
                let data=res.data.data
                for(let i=0;i<data.length;i++){
                   
                    data[i].tablename=[]
                    for(let k=0;k<data[i].label.length;k++){
                        for(let j=0;j<table.length;j++){
                           if(data[i].label[k]===table[j]._id){
                            data[i].tablename.push(table[j])
                           }
                        }
                    }
                }
              
                this.setState({
                    textList:data,
                    total:res.data.total
                })
              //  console.log(this.state.textList)
            }
        })
        .catch(err=>{

        })
    }
    ChangPage=(page, pageSize)=>{
           // console.log(page)
            this.setState({
                page:page
            })
            this.infoTextlist(page,this.state.txt)
    }
    render() {
        return (
            <div className='hometable'>
                 <Row>
                    <Col className='hometable-content' xs={24} sm={24} md={24} lg={18} xl={18}>
                        {this.state.textList.map((item,index)=>{
                            return (
                                <Homelist  key={index} item={item} />
                            )  
                        })}
                      
                       <div className="hometable-page">
                            <Pagination current={this.state.page} defaultCurrent={1}  defaultPageSize={this.state.rows} total={this.state.total} onChange={this.ChangPage}/>
                       </div>
                    </Col>
                    <Col className='hometable-right' xs={0} sm={0} md={0} lg={6} xl={6}>
                        <div className="hometable-right-box">
                            <Divider>最新发布</Divider>
                            
                            {this.state.hotList.map((item,index)=>{
                                return (
                                    <div  key={index} className='hometable-right-lately'>
                                    <Link key={index} to={'/text/'+item._id}  >{item.name}</Link>
                                    </div>
                                )
                            })}
                        </div>
                        
                        
                       
                    </Col>
                </Row>
            </div>
        )
    }
}
