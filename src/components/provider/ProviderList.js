import React, { Component, PropTypes } from 'react';
import { Modal,Table, message, Popconfirm ,Popover,Row, Col,Input,Select,Button,Icon,Switch} from 'antd';

const Option=Select.Option;
import './Provider.css'
class ProviderList extends React.Component{
    componentDidMount () {
       this.props.dispatch({
         type: 'provider/query',
       });
	}
	showEditProvider=()=>{
		this.props.dispatch({
         type: 'provider/initProvider',
       	});
	}
	updateProvider(text){
	 this.props.dispatch({
          type: 'provider/chooseProvider',
          payload: {
          	id:text.id,
          }
     });
	}
	deleteProvider(text){
		this.props.dispatch({
          type: 'provider/deleteProvider',
          payload: {
          	id:text.id,
          	status:0
          }
        });
	}
	isShow(id){
		this.props.dispatch({
         type: 'provider/updateProviderIsShow',
         payload: {
         	id:id,
         	list:this.props.provider.list
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
		    title: 'LOGO',
		    dataIndex: 'iconUrl',
		    key: 'iconUrl',
		    render: (text, record) => {
		     return <img src={text} className="providerIcon"/>;
		    },
		  },{
		    title: '名称',
		    dataIndex: 'name',
		    key: 'name',
		  },{
		    title: '简介',
		    dataIndex: 'description',
		    key: 'description',
		    render: (text, record) => {
		    	let content=<div style={{width:200}}>{text}</div>
		    	let textStr=text+'';
		    	let showConten=textStr.substring(0,10);
		     return (<Popover content={content}>
					    <div>{showConten}</div>
					 </Popover>);
		    },
		  },{
		    title: '创建时间',
		    dataIndex: 'createTime',
		    key: 'createTime',
		    render: (text, record) => {
		     return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
		    },
		  },{
		    title: '是否展示',
		    key: 'show',
		    render: (text, record) => {
		    	let isShow='';
		    	if(text.isShow==1){
					isShow=true;
		    	}else{
		    		isShow=false;
		    	}
		     return <Switch checkedChildren={'开'} unCheckedChildren={'关'} checked={isShow} onChange={()=>this.isShow(text.id)}/>
		    }
		  },{
		    title: '操作',
		    key: 'operation',
		    render: (text, record) => (
		      <p>
		        <a onClick={()=>{this.updateProvider(text)}}><Icon type="edit" /></a>
		        <span className="ant-divider" />
		        <Popconfirm title="确定要删除吗？" onConfirm={()=>{this.deleteProvider(text)}}>
		          <a><Icon type="delete" /></a>
		        </Popconfirm>
		      </p>
		    ),
		  }];
		const pagination = {
		    total:this.props.provider.total,
		    current:this.props.provider.current,
		    pageSize: 5,
		    onChange: (value)=>{
		    	this.props.dispatch({
		          type: 'provider/changeCurrent',
		          payload: {current:value}, 
       			});
		    },
		  };
	    return (
	       <div>
	        <Row gutter={10} className="searchBox">
		      <Col className="gutter-row" span={3}>
		        <div className="gutter-box"><Button type="primary" onClick={this.showEditProvider} style={{marginLeft:12}}>添加合作伙伴</Button></div>
		      </Col>
		    </Row>
		        {this.props.provider.list ==[] ? '' : 
		          <Table
		            bordered
			        columns={columns}
			        dataSource={this.props.provider.list}
			        loading={this.props.provider.loading}
			        rowKey={record => record.id}
			        pagination={pagination}
			      />
			    }
		   </div>
	    );
    }
};

export default ProviderList;