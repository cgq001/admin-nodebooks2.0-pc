import React, { Component } from 'react'
import { Divider , Row, Col,Tag } from 'antd';
import { Link } from "react-router-dom";
import './Homelist.css'
import moment from 'moment'
 const Homelist=(props)=>{
   
        return (
            <div className='homelist'>
                {props.item.weight === 100 ?  <Tag color="#f50">置顶</Tag> : ''}
                {/* 标题 */}
                <Link to={'/text/'+props.item._id}  >
               
                <Divider orientation="left">{props.item.name}</Divider>
                {/* 简介 */}
                <div className="homelist-titles">
                            {props.item.introduction} 
                </div>
                </Link>
                {/* 标签 */}
                <div className="homelist-table">
                        <Row className='homelist-table-row'>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='homelist-table-left'>
                                    <span>{moment(props.item.data).format("YYYY-MM-DD")}</span>
                                    <i className='iconfont icon-yuandianxiao'></i>
                                    <span>{props.item.read}阅读</span>
                                    <i className='iconfont icon-yuandianxiao'></i>
                                    <span>{props.item.love}喜欢</span>
                            </Col>
                            <Col xs={0} sm={0} md={12} lg={12} xl={12}>
                                    <div className='homelist-table-tag'>
                                        {/* <Tag color="magenta">magenta</Tag>
                                        <Tag color="red">red</Tag>
                                        <Tag color="volcano">volcano</Tag> */}
                                        {props.item.tablename.map((item,index)=>{
                                            return (
                                                <Tag key={index} color={index%2===0 ?'magenta' : 'green' }>

                                                    <Link  key={index} to={'/tag/'+item._id}  >
                                                        {item.name}
                                                  </Link>
                                                </Tag>
                                            )
                                        })}
                                    </div>
                            </Col>
                        </Row>
                </div>
            </div>
        )
 
}

export default Homelist