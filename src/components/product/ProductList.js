import React, { Component, PropTypes } from 'react';
import { hashHistory} from 'dva/router';
import { Modal,Table, message, Popconfirm ,Row, Col,Input,Select,Button,Icon} from 'antd';
const Option=Select.Option;
import './ProductList.css'
class ProductList extends React.Component{
    componentDidMount () {
        this.props.dispatch({
          type: 'product/queryProduct',
    	});
	}
	toEditProduct=()=>{
		this.props.dispatch({
          type: 'product/initEditProduct',
    	});
	}
	searchStrChange=(e)=>{
		this.props.dispatch({
          type: 'product/searchStrChange',
          payload:{
          	searchStr:e.target.value
          }
    	});
	}
	queryProduct=()=>{
		this.props.dispatch({
          type: 'product/queryProduct',
          payload:{
          	name:this.props.product.searchStr
          }
    	});
	}
	keyup=(e)=>{
		let code = e.keyCode;
		if(code == 13){
			this.props.dispatch({
	          type: 'product/queryProduct',
	          payload:{
	          	name:this.props.product.searchStr
	          }
	    	});
		}
	}
	updateProduct(text){
	 this.props.dispatch({
          type: 'product/selectCurrentItem',
          payload: {
          	id:text.id,
          }
     });
     hashHistory.push({pathname:'/product/edit'});
	}
	deleteProduct(text){
		this.props.dispatch({
          type: 'product/deleteProduct',
          payload: {id:text.id}, 
        });
	}
    render() {
    	const columns = [
    	  {
		    title: '产品图片',
		    dataIndex: 'showImages',
		    key: 'showImages',
		    render: (text, record) => {
		    	let fileListShow=[];
		    	if(text!=null&&text.length > 0 ){
               		fileListShow=JSON.parse(text);
	            }
	            if(fileListShow[0].url!=null&&fileListShow[0].url!=''){
	            	return (<img width="100%" className="hotImg" src={fileListShow[0].url}/>)
	            }
		    	else{
		    		return (<img width="100%" className="hotImg"/>)
		    	}
		    },
		  },{
		    title: '名称',
		    dataIndex: 'name',
		    key: 'name',
		  },{
		    title: '品牌',
		    dataIndex: 'brandName',
		    key: 'brandName',
		  },{
		    title: '系列',
		    dataIndex: 'seriesName',
		    key: 'seriesName',
		  },{
		    title: '型号',
		    dataIndex: 'modelName',
		    key: 'modelName',
		  },{
		    title: '租赁方式',
		    dataIndex: 'rentType',
		    key: 'rentType',
		    render: (text, record) => {
		    	let rentType=[];
		    	if(text.length > 0 ){
		    		rentType=JSON.parse(text);
		    	}
		    	if(rentType.length>0){
		    		return (<div className="rentBox">
		    			   <div>{rentType[0].show==1?<p>租完即送：月租金￥{rentType[0].rent}，租期{rentType[0].tenancy}</p>:''}</div>
			    		   <div>{rentType[1].show==1?<p>长期租赁：月租金￥{rentType[1].rent}，租期{rentType[1].tenancy}</p>:''}</div>
			    		   <div>{rentType[2].show==1?<p>短期租赁：月租金￥{rentType[2].rent}，租期{rentType[2].tenancy}</p>:''}</div>
			    		   <div>{rentType[3].show==1?<p>零售：单价¥{rentType[3].rent}</p>:''}</div>
		    			</div>
		    			)
		    	}else{
		    		return ;
		    	}
		    }
		  },{
		    title: '操作',
		    key: 'operation',
		    render: (text, record) => (
		      <p>
		        <a onClick={()=>{this.updateProduct(text)}}><Icon type="edit" /></a>
		        <span className="ant-divider" />
		        <Popconfirm title="确定要删除吗？" onConfirm={()=>{this.deleteProduct(text)}}>
		          <a><Icon type="delete" /></a>
		        </Popconfirm>
		      </p>
		    ),
		  }];
		const pagination = {
		    total:this.props.product.total,
		    current:this.props.product.current,
		    pageSize:5,
		    onChange: (value)=>{
		    	this.props.dispatch({
		          type: 'product/changeCurrent',
		          payload: {current:value}, 
       			});
		    },
		  };
	    return (
	       <div>
	        <Row gutter={10} className="searchBox">
		      <Col className="gutter-row" span={6}>
		        <div className="gutter-box"><Input placeholder="请输入关键字查找产品" onChange={this.searchStrChange} onKeyUp={this.keyup}/></div>
		      </Col>
		      <Col className="gutter-row" span={3}>
		        <div className="gutter-box"><Button type="primary" onClick={this.queryProduct}>搜索产品</Button></div>
		      </Col>
		      <Col className="gutter-row" span={15} style={{padding:'0 0 0 470px'}}>
		        <div className="gutter-box"><Button type="primary" onClick={this.toEditProduct} style={{marginLeft:12}}>添加产品</Button></div>
		      </Col>
		    </Row>
		        {this.props.product.list ==[] ? '' : 
		          <Table
			        columns={columns}
			        dataSource={this.props.product.list}
			        loading={this.props.product.loading}
			        rowKey={record => record.id}
			        pagination={pagination}
			      />
			    }
		   </div>
	    );
    }
};

export default ProductList;