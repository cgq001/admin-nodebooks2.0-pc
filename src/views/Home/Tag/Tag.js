import React, { Component } from 'react'
import { Timeline} from 'antd';
import { Link } from "react-router-dom";
import axios from '../../../axios'
import moment from 'moment'
import './Tag.css'
export default class Tag extends Component {
    constructor(props){
        super(props);
        this.state={
            tableList:[],
            tableName:{
                name:''
            }
        }
    }
    infoTable=(id)=>{
        axios.get('tableGetText',{
            params:{
                id:id
            }
        })
        .then(res=>{
            if(res.data.code === 0){
               // console.log(res.data.data)
                this.setState({
                    tableList:res.data.data
                })
            }
        })
        axios.get('tableNames',{
            params:{
                id:id
            }
        })
        .then(res=>{
            if(res.data.code === 0){
              //  console.log(res.data.data)
                this.setState({
                    tableName:res.data.data
                })
            }
        })
    }
    componentDidMount(){
       this.infoTable(this.props.match.params.id)
    }
    shouldComponentUpdate(netxProps,netxState){
       if(netxProps.match.params.id!=this.props.match.params.id){
           this.infoTable(netxProps.match.params.id) 
          }
       // console.log(this.props.match.params.id)
            return true;
    }
    render() {
        return (
            <div className='tags'>
                {/* 列表 */}
                <Timeline>
                    <Timeline.Item className='tags-title'>{this.state.tableName.name}</Timeline.Item>
                    {this.state.tableList.map((item,index)=>{
                        return (
                            <Timeline.Item key={index} className='tags-timeline'>{moment(item.data).format("YYYY-MM-DD")}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link  key={index} to={'/text/'+item._id}  >
                                    {item.name}
                                </Link>
                                
                            </Timeline.Item>
                        )
                    })}
                </Timeline>
            </div>
        )
    }
}
