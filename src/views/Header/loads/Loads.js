import store from '../../../store/index'
import React, { Component } from 'react'
import {  Modal, Button , Form, Icon, Input, message} from 'antd';
import './loads.css'
import axios from '../../../axios'
 class NormalLoginForm extends Component {
     constructor(props){
         super(props);
         this.state={

         }
     }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.props.handleOk()
            axios.post('getuser',{
              ...values
            })
            .then(res=>{
                // console.log(res.data)
                if(res.data.code===0 && res.data.msg){
                  message.success(res.data.msg);
                      const action={
                                  type: 'user',
                                  value:res.data.data
                              }
                              
                    store.dispatch(action)

                    const actions={     //1为普通注册登陆   2 为GitHub 登陆
                              type: 'types',
                              value: 1
                          }
                          
                      store.dispatch(actions)
                }
                if(res.data.code===1 | res.data.code===4  && res.data.msg){
                  message.error(res.data.msg);
                }
            })
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入邮箱"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' },{ min:6,max:18, message: '密码在6~18位' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {/* {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>记住我</Checkbox>)} */}
               
                <Button type="primary" htmlType="submit" className="login-form-button btns">
                    登陆
                </Button>
                <Button type="danger" ghost  className="login-form-button btns">
                    github登陆
                </Button>
                </Form.Item>
            </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default class modal extends Component {
  
 constructor(props){
     super(props);
     this.state = { 
         visible:false
        };
 }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
   
    this.setState({
      visible: false,
    });
    this.props.loadClose()
  };


  render() {
   
    return (
      <div>
            <Modal
            title="登陆"
            visible={this.props.loadOffs}
            onOk={this.handleOk}
            onCancel={this.handleOk}
            footer={
                [] // 设置footer为空，去掉 取消 确定默认按钮
              }
            >
           <WrappedNormalLoginForm handleOk={this.handleOk} />
        </Modal>
      </div>
    );
  }
}