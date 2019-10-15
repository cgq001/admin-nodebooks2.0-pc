import React, { Component , Fragment} from 'react'
import { Row, Col , Timeline,Icon ,Pagination } from 'antd';
import './Summary.css'
import axios from '../../axios'
import moment from 'moment'
import { Link } from "react-router-dom";
export default class Summary extends Component {
    constructor(props){
        super(props);
        this.state={
            page: 1,
            rows: 2,
            summaryList:[],
            total:0
        }
    }
    infoTable=(page=this.state.page)=>{
        axios.get('getTextDataLits',{
            params:{
                page: page,
                rows: this.state.rows
            }
        })
        .then(res=>{
            if(res.data.code === 0 && res.data.data.length>0){
           
                let dataStr=res.data.data
                for(let i=0;i<dataStr.length;i++){
                    dataStr[i].year=moment( dataStr[i].data).format('YYYY')
                }
                
                let srcTexts=[]
                    srcTexts[0]={}
                    srcTexts[0].yarn=dataStr[0].year
                    srcTexts[0].str=[]
                    srcTexts[0].str.push(dataStr[0])
                   
                for(let i=0;i<dataStr.length;i++){
                   for(let k=0;k<srcTexts.length;k++){

                       if(srcTexts[k].yarn===dataStr[i].year){
                          // console.log( srcTexts[k])
                        srcTexts[k].str.push(dataStr[i])
                       }else{
                        srcTexts[k].yarn=dataStr[i].year
                        srcTexts[k].str=[]
                        srcTexts[k].str.push(dataStr[i])
                       }
                   }
                }
               // console.log(srcTexts)
                this.setState({
                    summaryList:srcTexts,
                    total:res.data.total
                })
            }
        })
    }
    componentDidMount(){
        this.infoTable()
    }
    changePage=(page,all)=>{
        this.setState({
            page:page
        })
        this.infoTable(page)
    }
    render() {
        return (
            <div className='summary'>
                 <Row>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18} className='summary-content'>
                        <Timeline>
                            {this.state.summaryList.map((item,index)=>{
                                return (
                                <Fragment  key={index}>
                                    <Timeline.Item className='summary-title' key={index} dot={<Icon type="clock-circle-o" style={{ fontSize: '20px',color:'#F320F9' }} />}>{item.yarn}</Timeline.Item>
                                    {item.str.map((items,indexs)=>{
                                        return(
                                            <Timeline.Item key={indexs}>{moment(items.data).format('MM-DD')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link key={index} to={'/text/'+items._id}  >
                                                    {items.name}
                                                </Link>

                                            </Timeline.Item>
                                        ) 
                                    })}
                                </Fragment> 
                                )
                            })}
                        </Timeline>
                        {/* 分页 */}
                        <div className="pages">
                            <Pagination defaultCurrent={this.state.page} defaultPageSize={this.state.rows} total={this.state.total} onChange={this.changePage} />
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={2}>
                   
                    </Col>
                </Row>
            </div>
        )
    }
}
