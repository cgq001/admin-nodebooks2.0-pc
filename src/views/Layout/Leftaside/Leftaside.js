import React, { Component } from 'react'
import { Divider,Tag  } from 'antd';
import { Link } from "react-router-dom";
import './Leftaside.css'
import axios from '../../../axios'
// import imgs from '../../../imgs/8170747.jpg'
import imgs from '../../../imgs/056.png'
export default class Leftaside extends Component {
    constructor(props){
        super(props);
        this.state={
            hotList:[],
            tableList:[],
            admins:{}
        }
    }
    componentDidMount(){
        axios.get('hotGetText')
            .then(res=>{
                if(res.data.code === 0){
                    this.setState({
                        hotList:res.data.data
                    })
                }
            })
        let srcTable=['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
       
        axios.get('getTableAll')
            .then(res=>{
                if(res.data.code === 0 ){
                    let data= res.data.data
                    for(let i=0;i<data.length;i++){
                        data[i].icon=srcTable[parseInt(Math.random()*10)]
                    }
                    // console.log(data)
                    this.setState({
                        tableList:data
                    })
                }
            })
        
        axios.get('searchMsgAdminsLeft')
            .then(res=>{
                if(res.data.code === 0){
                    this.setState({
                        admins:res.data.data
                    })
                }
            })
    }
    render() {
        return (
            <div className='leftaside'>
                {/* 头像 */}
                <div className="leftaside-header">
                    <div className='leftaside-header-imgs'>
                        <img src={this.state.admins.imgs}></img>
                    </div>
                    <div className='leftaside-header-next'>
                        <div>
                            <i className='iconfont icon-github'></i>
                            <a href={this.state.admins.github} target='blank'>GitHub</a>
                            
                        </div>
                        <div>
                            <i className='iconfont icon-biji'></i>
                            <a href={this.state.admins.juejin} target='blank'>掘金</a>
                        </div>
                    </div>
                </div>
                {/* 热门文章 */}
                <Divider className='leftaside-hot' orientation="left">热门文章 <i className='iconfont icon-huo' style={{color:'#EE12F9'}}></i></Divider>
                <div className="leftaside-hot-list">
                    <ul className='leftaside-hot-list-ul'>
                        {this.state.hotList.map((item,index)=>{
                            return (
                                <li key={index}>
                                <Link key={index} to={'/text/'+item._id}  >{item.name}</Link>
                                </li>
                            )
                        })}
                       
                    </ul>
                </div>
                {/* 标签 */}
                <Divider className='leftaside-hot' orientation="left">标签 <i className='iconfont icon-biaoqian1' style={{color:'#186CFC'}}></i></Divider>
                <div className="leftaside-table-list">
                       
                      {this.state.tableList.map((item,index)=>{
                          return (
                            <Tag key={index}  color={item.icon}>
                                 <Link key={index} to={'/tag/'+item._id}  >
                                   {item.name} 
                                </Link>
                            </Tag>
                          )
                      })}
                </div>
            </div>
        )
    }
}
