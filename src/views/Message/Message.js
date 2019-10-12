import axios from '../../axios'
import store from '../../store/index'
import moment from 'moment'
import React, { Component } from 'react'
import './message.css'
import { Comment, Avatar, Input , Button, message} from 'antd';
const { TextArea } = Input;

const ExampleComment = ({ content,datetime,author,avatar,children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">{moment(datetime).format('YYYY-MM-DD HH:mm:SS')}</span>]}
    author={author}
    avatar={
      <Avatar
        src={avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
        alt="Han Solo"
      />
    }
    content={
      <p>
        {content}
      </p>
    }
  >
    {children}
  </Comment>
)


export default class Message extends Component {
  constructor(props){
    super(props);
    this.state={
      value:'',
      rows: 2,
      page: 1,
      list:[],
      admins:{}
    }
  }
  componentDidMount=()=>{
    let This= this
        axios.get('searchMsgAdmins')
              .then(res=>{
                if(res.data.code === 0){
                  This.setState({
                    admins:res.data.data
                  })
                }
              })
        axios.get('searchMsg',{
            params:{
              rows:this.state.rows,
              page:this.state.page
            }
        })
        .then(res=>{
          if(res.data.code === 0){
              This.setState({
                list:res.data.data
              })

          }
          // console.log(res.data.data)
        })
       
       store.subscribe(()=>{
           let stateUser=store.getState().user
           let types=store.getState().types
           This.setState({
                user:stateUser,
                types:types
           })
       })

  
    }
  onChange=({ target: { value } })=>{
    this.setState({ value });

  }
  submits=()=>{
     
      if(this.state.value.length<=0){
        message.error('请输入文本内容');
        return false
      }
      let This=this
      if(this.state.types && this.state.types >0 ){
        if(this.state.types === 1){   //1 为普通注册登陆
                  let data={
                    type:This.state.types,
                    name:This.state.user.name,
                    email:This.state.user.email,
                    username:This.state.user.username,
                    value:This.state.value
              }
              axios.post('/addMessage',{
                ...data
              })
              .then(res=>{
                  if(res.data.code === 0){
                    message.success(res.data.msg);
                    This.setState({
                      value:""
                    })
                  }
              })
        }
              

      }else{
        message.warning('你还没有登陆');
      }
  }
    render() {
        return (
            <div className='messages'>
                
               
              {this.state.list.map((item,index)=>{
                return (
                  <ExampleComment 
                  content={item.value}  
                  datetime={item.admindata}
                  author={item.name} 
                  avatar={item.imgage}
                  key={index}>
                      {item.adminmsg && (
                         <ExampleComment 
                         content={item.adminmsg}  
                         datetime={item.admindata}
                         author={this.state.admins.name} 
                         avatar={this.state.admins.nameimgs}
                         key={index}>
                        </ExampleComment>
                      )}
                  </ExampleComment>
                )
              })}
                <div>
                 {this.state.admins.msgoffs && (
                   <div>
                      <TextArea
                          
                        className="messages-txt"
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder="留下你想说的话呗"
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />
                      <div className='message-btns-box'>
                          <Button className='message-btns' onClick={this.submits} type="primary">发表留言</Button> 
                      </div>
                    </div>
                 )}
                     
                </div>
            </div>
        )
    }
}
