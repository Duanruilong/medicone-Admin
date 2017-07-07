import React from 'react';
import { Form, Icon, Input, Button, Checkbox,Card ,Alert} from 'antd';
import './Login.css';
import isNullObject from '../../utils/common.js';
import { hashHistory} from 'dva/router'
const FormItem = Form.Item;

class Login extends React.Component {
  componentWillMount(){
    if(this.props.login.loginStatus){
      hashHistory.push({pathname:'/'});
    }
  }
  userChange = (e)=>{
    this.props.dispatch({
         type: 'login/userChange',
         payload:{
            key:e.target.name,
            value:e.target.value
         }
    });
  }
  handleSubmit=()=> {
    this.props.dispatch({
         type: 'login/login',
         payload:{
            username:this.props.login.user.username,
            password:this.props.login.user.password
         }
    });
  }
  render(){
    return (
      <div className="loginBox">
      <div className="loginFormBox">
      {this.props.login.showMessage ? <Alert message="用户名或密码错误" type="error" showIcon /> :'' }
      <Card title="一站式服务平台登录" bordered={false} style={{ width: 300 }}>
       <Form className="loginForm">
        <FormItem>
            <Input addonBefore={<Icon type="user" />} name="username" placeholder="用户名" onChange={this.userChange}/>
        </FormItem>
        <FormItem>
            <Input addonBefore={<Icon type="lock" />} name="password" type="password" placeholder="密码" onChange={this.userChange}/>
        </FormItem>
        <FormItem>
          <Checkbox checked style={{float:'left'}}>记住我</Checkbox>
          <a className="loginFormForgot">忘记密码</a>
          <Button type="primary" onClick={this.handleSubmit} className="loginFormButton">
            登录
          </Button>
        </FormItem>
        </Form>
      </Card>
      </div>
      </div>
    );
  }
}

export default Login;
