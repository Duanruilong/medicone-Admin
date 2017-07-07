import React, { Component, PropTypes } from 'react';
import { hashHistory} from 'dva/router';
import { Modal,Table, message, Popconfirm ,Row, Col,Input,Select,Button,Icon,Switch} from 'antd';

const Option=Select.Option;
import './UserList.css'
class UserList extends React.Component{
    componentDidMount () {
       this.props.dispatch({
         type: 'user/query',
       });
	}
	queryUser=()=>{
		this.props.dispatch({
         type: 'user/query',
         payload:{
         	tel:this.props.user.searchStr
         }
       });
	}
	toDetail(id){
		this.props.dispatch({
         type: 'user/selectUserItem',
         payload:{
         	id:id
         }
       	});
		hashHistory.push({pathname:'/user/detail'});
	}
	isUse(id){
		this.props.dispatch({
         type: 'user/updateUserIsUse',
         payload:{
         	id:id,
         	list:this.props.user.list
         }
       	});
	}
	searchStrChange=(e)=>{
		this.props.dispatch({
         type: 'user/searchStrChange',
         payload:{
         	searchStr:e.target.value
         }
       	});
	}
    render() {
    	const columns = [
    	  {
		    title: '序号',
		    dataIndex: 'id',
		    key: 'id',
		    render:(text, record, index) => (
             <span>{index + 1}</span>
            )
		  },{
		    title: '用户账号',
		    dataIndex: 'username',
		    key: 'username',
		  },{
		    title: '公司名称',
		    dataIndex: 'companyName',
		    key: 'companyName',
		  },{
		    title: '公司性质',
		    dataIndex: 'companyProperty',
		    key: 'companyProperty',
		  },{
		    title: '公司规模',
		    dataIndex: 'companyScale',
		    key: 'companyScale',
		  },{
		    title: '联系人',
		    dataIndex: 'linkman',
		    key: 'linkman',
		  },{
		    title: '联系地址',
		    dataIndex: 'address',
		    key: 'address',
		  },{
		    title: '注册时间',
		    dataIndex: 'createTime',
		    key: 'createTime',
		    render: (text, record) => {
		     return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
		    },
		  },{
		    title: '用户记录',
		    key: 'record',
		    render: (text, record) => {
		     return <a onClick={()=>this.toDetail(text.id)}>查看用户记录</a>;
		    },
		  },{
		    title: '操作',
		    key: 'operation',
		    render: (text, record) => {
		    	let isShow='';
		    	if(text.status==1){
					isShow=true;
		    	}else{
		    		isShow=false;
		    	}
		      return <Switch checkedChildren={'禁用'} checked={isShow} unCheckedChildren={'启用'} onChange={()=>this.isUse(text.id)}/>
		    },
		  }];
		const pagination = {
		    total:this.props.user.total,
		    current:this.props.user.current,
		    pageSize: 10,
		    onChange: (value)=>{
		    	this.props.dispatch({
		          type: 'user/changeCurrent',
		          payload: {current:value}, 
       			});
		    },
		  };
	    return (
	       <div>
	        <Row gutter={10} className="searchBox">
		      <Col className="gutter-row" span={5}>
		        <div className="gutter-box">
		        <Input placeholder="请输入手机号或公司名称查找用户" style={{width:200}} onChange={this.searchStrChange}/>
		        </div>
		      </Col>
		      <Col className="gutter-row" span={3}>
		        <div className="gutter-box">
		        <Button type="primary" onClick={this.queryUser} style={{marginLeft:12}}>搜索</Button>
		        </div>
		      </Col>
		    </Row>
		        {this.props.user.list ==[] ? '' : 
		          <Table
		            bordered
			        columns={columns}
			        dataSource={this.props.user.list}
			        loading={this.props.user.loading}
			        rowKey={record => record.id}
			        pagination={pagination}
			      />
			    }
		   </div>
	    );
    }
};

export default UserList;