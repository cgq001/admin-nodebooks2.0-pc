import React, { Component } from 'react'
import './Projectlist.css'
let Projectlist=(props)=>{
   
        return (
            <div className='projectlist'>
                <div className='projectlist-box'>
                        {/* icon */}
                        <div className="projectlist-icon">
                            <i className={'iconfont '+props.item.icons}></i>
                        </div>
                        {/* 标题 */}
                        <div className="projectlist-head">
                            {props.item.name}
                        </div>
                        {/* 简介 */}
                        <div className="projectlist-vision">
                           {props.item.introduction}
                        </div>
                        {/* 预览 */}
                        <div className="projectlist-foot">
                            {/* 内容 */}
                            <div className="projectlist-foot-lis">
                                <a href={props.item.urlname}>
                                    <i className='iconfont icon-plus-preview'></i>
                                    <span>预览</span>
                                </a>
                            </div>
                            <i className='iconfont icon-vertical_line'></i>
                            {/*  */}
                            <div className="projectlist-foot-lis">
                                <a href={props.item.github}>
                                    <i className='iconfont icon-daima'></i>
                                    <span>GitHub</span>
                                </a>
                            </div>
                        </div>
                </div>
                
            </div>
        )
   
}
export default Projectlist;