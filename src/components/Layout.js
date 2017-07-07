import React from 'react';
import { hashHistory } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import './Layout.css';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class AdminLayout extends React.Component {
  componentWillMount(){
    if(localStorage.getItem("loginStatus")== null || localStorage.loginStatus==0){
      hashHistory.push({pathname:'/login'});
    }
  }
  itemClick(e){
    hashHistory.push({pathname:e.key});
  }
  loginOut=()=>{
    this.props.dispatch({
         type: 'login/loginOut',
    });
  }
  render() {
    let selectedKeys=[];
    let pathname=this.props.location.pathname.split('/')[1];
    selectedKeys.push(pathname);
    return (
     <Layout>
    <Header className="header">
      <div className="logo"><img src="http://118.178.188.76/img-lib/logo.png"/></div>
      <div className="logoTitle">阿斯加加后台管理系统</div>
      <div className="loginOut"><a href="#" onClick={this.loginOut}>退出登录</a></div>
    </Header>
    <Content>
      <Layout style={{background: '#fff' }}>
        <Sider>
          <Menu mode="inline" defaultOpenKeys={['sub2']} selectedKeys={selectedKeys} onClick={this.itemClick.bind(this)}>
            {this.props.login.menu.map(function(item,i){
              return <SubMenu key={`sub${i+1}`} title={<span><Icon type={item.iconType} />{item.subMenu}</span>}>
                {item.menu.map(function(item,i){
                  return  <Menu.Item key={item.key}>{item.item}</Menu.Item>
                })}
              </SubMenu>
            })}
          </Menu>
        </Sider>
        <Content style={{ padding: '24px 24px', minHeight: 620 }}>
          {this.props.children ? React.cloneElement(this.props.children,this.props) :''} 
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>一站式服务平台后台管理 ©2017 由走着网络技术(上海)有限公司技术部支持</Footer>
  </Layout>
    );
  }
}

export default AdminLayout;