import React, { Component } from 'react'
import { Row, Col, Tag ,Skeleton,Empty} from 'antd';
import { Link } from "react-router-dom";
import axios from '../../../axios'
import './Text.css'
import moment from 'moment'
import marked from 'marked'
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
import 'mavon-editor/dist/css/index.css'
let renderer =new marked.Renderer()
export default class Text extends Component {
    constructor(props){
        super(props);
        this.state={
            textList:{
                text: '',
                nameTable:[]
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
    infoText=(id=this.props.match.params.id)=>{
        axios.get('getText',{
            params:{
                _id:id
            }
        })
        .then(res=>{
            if(res.data.code === 0){
                let data =res.data.data
                let table =res.data.table
                    data.nameTable=[]
                for(let i=0;i<data.label.length;i++){
                    for(let k=0;k<table.length;k++){
                        if(data.label[i]===table[k]._id){
                            data.nameTable.push(table[k])
                        }
                    }
                }
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
       if(netxProps.match.params.id!=netxState.textList._id){
        this.infoText(netxProps.match.params.id) 
       }
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
                                <Col className='texts-news-right' xs={24} sm={24} md={12} lg={12} xl={12}>
                                    {this.state.textList.nameTable.map((item,index)=>{
                                            return (
                                                <Tag key={index} color={index%2===0 ?'magenta' : 'green' }>

                                                    <Link  key={index} to={'/tag/'+item._id}  >
                                                        {item.name}
                                                    </Link>

                                                </Tag>
                                            )
                                        })}
                                </Col>
                            </Row>
                            
                        </div>
                        {/* 正文 */}
                        <div className="texts-txt" dangerouslySetInnerHTML={{__html:marked(this.state.textList.text,{ renderer: renderer })}}>
                           
                            
                        </div>
                        {this.state.textList.text ? '' : <Skeleton active />} 
                        
                    </Col>
                    <Col className='texts-col' xs={0} sm={0} md={0} lg={6} xl={6}>
                       
                    </Col>
                    
                </Row>
                {this.state.textList.text ? '' : <Empty />} 
                {/* <Empty /> */}
            </div>
        )
    }
}
