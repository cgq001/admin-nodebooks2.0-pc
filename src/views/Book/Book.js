import React, { Component } from 'react'

import './Book.css'
import axios from '../../axios'
import moment from 'moment'
import { Link } from "react-router-dom";
export default class Book extends Component {
    constructor(props){
        super(props);
        this.state={
            bookList:{
                list:[]
            }
        }
    }
    componentDidMount(){
      
        axios.get('getManualTxts',{
            params:{
                id:this.props.match.params.id
            }
        })
        .then(res=>{
            if(res.data.code === 0){
               /// console.log(res.data)
                this.setState({
                    bookList:res.data.data
                })
            }
        })
     
    }
    render() {
        return (
            <div className="book-box">
                {/* 手册信息 */}
                    <div className='book'>
                        {/* 左侧图片 */}
                        <div className="book-left">
                            <img src={this.state.bookList.imgs} />
                        </div>
                        {/* 右侧 */}
                        <div className="book-right">
                            {/* 标题 */}
                            <div className="book-right-head">
                                {this.state.bookList.name}
                            </div>
                            {/* 简介 */}
                            <div className="book-right-title">
                                {this.state.bookList.introduction}
                            </div>
                            {/* 时间 */}
                            <div className="book-right-time">
                                {moment(this.state.bookList.data).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                        </div>
                    </div>
                {/* 手册内容 */}
                    <div className="book-list">
                            {/* 标题 */}
                            <p className="book-list-title">
                                手册内容
                            </p>
                            {/* 列表 */}
                            <ul className="book-list-ul">
                                {this.state.bookList.list.map((item,index)=>{
                                    return (
                                        <Link to={'/booktxt/'+item._id} key={index}>
                                            <li className='book-list-li' key={index}>
                                                
                                                <div className='book-list-li-left'>{index+1}</div>
                                                <div className='book-list-li-right'>{item.name}</div>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>  
                    </div>
            </div>
            
        )
    }
}
