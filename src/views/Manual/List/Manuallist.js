import React, { Component } from 'react'
import './Manuallist.css'
import moment from 'moment'
import { Link } from "react-router-dom";
export default class Manuallist extends Component {
    render() {
        return (
            <Link to={'/book/'+this.props.item._id}>
            <div className='manuallist'>
               
                    {/* 封面 */}
                    <div className="manuallist-imgs">
                        <img src={this.props.item.imgs} />
                    </div>
                    <div className="manuallist-txt">
                        {/* 标题 */}
                        <div className="manuallist-txt-head">
                            {this.props.item.name}
                        </div>
                        {/* 简介 */}
                        <div className="manuallist-txt-title">
                            {this.props.item.introduction}
                        </div>
                        {/* 时间 */}
                        <div className="manuallist-txt-time">
                            {moment(this.props.item.data).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                    </div>
            </div>
            </Link>
        )
    }
}
