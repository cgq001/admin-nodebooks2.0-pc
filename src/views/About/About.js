import React, { Component } from 'react'
import { Row, Col, Tag ,Skeleton,Empty} from 'antd';
import axios from '../../axios'
import './About.css'
import moment from 'moment'
import marked from 'marked'
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
import 'mavon-editor/dist/css/index.css'
let renderer =new marked.Renderer()
export default class Booktxt extends Component {
    constructor(props){
        super(props);
        this.state={
            textList:{
                text: ''
            }
        }
    }
    componentWillMount(){
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function(code) {
                return hljs.highlightAuto(code).value;
            },
        });
    }
    infoText=()=>{
        axios.get('getabout')
            .then(res=>{
                if(res.data.code === 0){
                    let data =res.data.data
                   // console.log(res.data)
                    this.setState({
                        
                        textList:data
                    })
                    // console.log(this.state.textList)
                }
            })
            .catch(err=>{
                this.textList=null
            })
    }
    componentDidMount(){
       this.infoText() 
        
    }
    shouldComponentUpdate(netxProps,netxState){
      
        return true;
    }
    render() {
        return (
            <div className='texts'>
                <Row  className='tetxs-row'>
                    <Col className='texts-col text-col-tent' xs={24} sm={24} md={24} lg={18} xl={18}>
                        {/* 头部 */}
                        <div className="texts-title">
                            {this.state.textList.name}
                        </div>
                        {/* 消息 */}
                        <div className="texts-news">
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <span>时间：{moment(this.state.textList.data).format("YYYY-MM-DD HH:mm:ss")}</span>
                                        <i className='iconfont icon-yuandianxiao'></i>
                                        <span>阅读: &nbsp;{this.state.textList.read}</span>
                                        <i className='iconfont icon-yuandianxiao'></i>
                                        <span>喜欢: &nbsp;{this.state.textList.love}</span>
                                </Col>
                                
                            </Row>
                            
                        </div>
                        {/* 正文 */}
                        <div className="texts-txt" dangerouslySetInnerHTML={{__html:marked(this.state.textList.text,{ renderer: renderer })}}>
                           
                            
                        </div>
                        {this.state.textList.text ? '' : <Skeleton active />} 
                        
                    </Col>
                    {/* {this.state.textList ? <Col className='texts-col' xs={0} sm={0} md={0} lg={6} xl={6}></Col> : <h1>存在</h1>} */}
                    
                    
                </Row>
                {this.state.textList.text ? '' : <Empty />} 
            </div>
        )
    }
}
