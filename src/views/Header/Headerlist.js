import store from '../../store/index'
import Modals from './modal/modal'
import Loads from './loads/Loads'
import React, { Component } from 'react'
import { Link} from "react-router-dom";
import './Headerlist.css'
import { Menu,  Button , Avatar} from 'antd';



export default class Headerlist extends Component {
    constructor(props){
        super(props);
        this.state={
            current: '1',
            txt:'',
            ts: false,
            loadOffs: false,
            registerOffs: false,
            user: {}
        }
   
    }
    componentDidMount=()=>{
    //    console.log(window.location.pathname.substr(1))
       this.setState({
        current:window.location.pathname
       })
       let This= this
       store.subscribe(()=>{
           let stateUser=store.getState().user
           This.setState({
                user:stateUser
           })
       })
    }
      handleClick = e => {
        // console.log( e.key );
        this.setState({
          current: e.key,
        });
      };
      txtChange=(e)=>{
        this.setState({
            txt:e.target.value
        })
      }
      txtKeyDown=(e)=>{
          if(e.keyCode === 13){
              
             // console.log(this.state.txt)
              const action={
                  type: 'txt',
                  value:this.state.txt
              }
            
              store.dispatch(action)
           
              this.setState({
                  ts: true
              })
          }else{
            this.setState({
                ts: false
            })
          }
      }
      loadBtns=()=>{
            this.setState({
                loadOffs:true,
                registerOffs:false
            })
           
      }
      loadClose=()=>{
            this.setState({
                loadOffs:false,
                registerOffs:false
            })
      }
      registerBtns=()=>{
            this.setState({
                loadOffs:false,
                registerOffs:true
            })
      }
    render() {
      
        return (
            <div className='headerlist'>
                <div className="headerlist-left">
                        <div className="headerlist-left-logo">
                            <i className='iconfont icon-drxx18'></i>
                            老崔云笔记
                        </div>
                        <div className="headerlist-left-search">
                            <input type="text" placeholder='首页文章内容搜索' onChange={(e)=>this.txtChange(e)} onKeyDown={(e)=>this.txtKeyDown(e)}/>
                        </div>
                </div>
                <div className="headerlist-right">
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="/" className='headerlist-menu'>
                                <Link  to='/'><i className='iconfont icon-shouye' ></i>首页</Link>   
                        </Menu.Item>
                        <Menu.Item key="/summary">
                            <Link  to='/summary'>
                                <i className='iconfont icon-liebiaoxiangmu'></i>
                                    归档
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/project">
                            {/*  */}
                            <Link  to='/project'>
                                <i className='iconfont icon-guidangxiangmu'></i>
                                    项目
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/manual">
                            <Link to='/manual'>
                                <i className='iconfont icon-ziliaoshouce-xianxing'></i>
                                    手册
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/experience">
                            <Link to='/experience'>
                                <i className='iconfont icon-xueli'></i>
                                    经历
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/message">
                            <Link to='/message'>
                                <i className='iconfont icon-biji'></i>
                                    留言
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/about">
                            <Link to='/about'>
                                <i className='iconfont icon-web__guanyuwomen'></i>
                                    关于
                            </Link>
                        </Menu.Item>
                        
                    </Menu>
                    <div className='headerlist-right-twos'>
                        
                            
                            
                        { this.state.user.username ? null : <Button className='headerlist-right-btns' type="primary"  onClick={this.loadBtns}>登陆</Button> }
                        { this.state.user.username ? null : <Button className='headerlist-right-btns' type="danger" ghost onClick={this.registerBtns}>注册</Button> }
                        { this.state.user.username ? <Avatar  shape="square" size="large" icon="user" /> : null}
                    </div>
                    

                    <Modals registerOffs={this.state.registerOffs} loadClose={this.loadClose} />
                    <Loads loadOffs={this.state.loadOffs} loadClose={this.loadClose} />
                </div>
            </div>
            
        )
        
    }
}
