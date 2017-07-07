import React from 'react';
import { Table , Modal ,Input} from 'antd';

import './UserDetail.css'

class UserDetail extends React.Component{
    componentDidMount () {
        this.props.dispatch({
		    type: 'user/queryRecord',
		    payload: {userId:this.props.user.currentItem.id}, 
       	});
	}
	addRecord=()=>{
		this.props.dispatch({
		    type: 'user/showRecordModal',
       	});
	}
	handleOk=()=>{
		this.props.dispatch({
		    type: 'user/insertUserRecord',
		    payload:{
		    	userId:this.props.user.currentItem.id,
		    	content:this.props.user.recordContent
		    }
       	});
	}
	handleCancel=()=>{
		this.props.dispatch({
		    type: 'user/hideRecordModal',
       	});
	}
	recordContentChange=(e)=>{
		this.props.dispatch({
		    type: 'user/recordContentChange',
		    payload:{
		    	recordContent:e.target.value
		    }
       	});
	}
    render() {
    	const columns = [
    	  {
		    title: '序号',
		    dataIndex: 'id',
		    width:50,
		    key: 'id',
		    render:(text, record, index) => (
             <span>{index + 1}</span>
            )
		  },{
		    title: '沟通内容',
		    dataIndex: 'content',
		    key: 'content',
		  },{
		    title: '添加时间',
		    width:180,
		    dataIndex: 'createTime',
		    key: 'createTime',
		    render: (text, record) => {
		     return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
		    },
		  }];
		const pagination = {
		    total:this.props.user.recordTotal,
		    current:this.props.user.recordCurrent,
		    pageSize: 10,
		    onChange: (value)=>{
		    	this.props.dispatch({
		          type: 'user/changeRecordCurrent',
		          payload: {current:value}, 
       			});
		    },
		  };
		let createTime =new Date(parseInt(this.props.user.currentItem.createTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
	    return (
	       <div>
	         <div><h3>用户信息</h3></div>
	         <div className="userMessage">
	         	<p>用户账号：{this.props.user.currentItem.username}</p>
	         	<p>公司名称：{this.props.user.currentItem.companyName}</p>
	         	<p>公司性质：{this.props.user.currentItem.companyProperty}</p>
	         	<p>公司规模：{this.props.user.currentItem.companyScale}</p>
	         	<p>联系人：{this.props.user.currentItem.linkman}</p>
	         	<p>联系地址：{this.props.user.currentItem.address}</p>
	         	<p>注册时间：{createTime}</p>
	         </div>
	         <div className="userRecord"><div className="recordTitle">用户记录</div><a onClick={this.addRecord}>添加</a></div>
	         <div>
	         	{this.props.user.recordList ==[] ? '' : 
		          <Table
		            bordered
			        columns={columns}
			        dataSource={this.props.user.recordList}
			        loading={this.props.user.recordLoading}
			        rowKey={record => record.id}
			        pagination={pagination}
			      />
			    }
	         </div>
	         <Modal title="添加用户记录" visible={this.props.user.recordModalVisible}
	          onOk={this.handleOk} onCancel={this.handleCancel}
	         >
	          <h4>记录内容:</h4>
	          <Input type="textarea" rows={4} onChange={this.recordContentChange}/>
	         </Modal>
		   </div>
	    );
    }
};

export default UserDetail;