import React from 'react';
import { hashHistory} from 'dva/router';
import isNullObject from '../../utils/common';
import { Form, Input, Select, Button,Checkbox ,Row,Col,Upload,Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import './EditProduct.css'

class EditProduct extends React.Component{
    componentDidMount () {
    	if(this.props.product.currentItem.id == null){
    		hashHistory.push({pathname:'/product'});
    	}
        this.props.dispatch({
		    type: 'product/queryCategory',
       	});
	}
	brandOneSelectChange=(e)=>{
		this.props.dispatch({
		    type: 'product/changeBrand',
		    payload:{
		    	level:1,
		    	id:e
		    }
       	});
	}
	brandTwoSelectChange=(e)=>{
		this.props.dispatch({
		    type: 'product/changeBrand',
		    payload:{
		    	level:2,
		    	id:e
		    }
       	});
	}
	brandThreeSelectChange=(e)=>{
		this.props.dispatch({
		    type: 'product/changeBrand',
		    payload:{
		    	level:3,
		    	id:e
		    }
       	});
	}
	categoryOneSelectChange=(e)=>{
		this.props.dispatch({
		    type: 'product/changeCategory',
		    payload:{
		    	level:1,
		    	id:e
		    }
       	});
	}
	categoryTwoSelectChange=(e)=>{
		this.props.dispatch({
		    type: 'product/changeCategory',
		    payload:{
		    	level:2,
		    	id:e
		    }
       	});
	}
	categoryThreeSelectChange=(e)=>{
		this.props.dispatch({
		    type: 'product/changeCategory',
		    payload:{
		    	level:3,
		    	id:e
		    }
       	});
	}
	ProductItemChange=(e)=>{
		this.props.dispatch({
	         type: 'product/productItemChange',
	         payload: {
	         	key:e.target.name,
	         	value:e.target.value
	     	 }
        });
	}
	rentTypeChange=(e)=>{
		this.props.dispatch({
	         type: 'product/rentTypeChange',
	         payload: {
	         	rentId:e.target.value,
	         	checked:e.target.checked
	     	 }
        });
	}
	rentTypeContentChange=(e)=>{
		let rentArr= e.target.name.split("@");
		let key =rentArr[0];
		let rentId =rentArr[1];
		let value =e.target.value;
		this.props.dispatch({
	         type: 'product/rentTypeContentChange',
	         payload: {
	         	rentId:rentId,
	         	key:key,
	         	value:value
	     	 }
        });
	}
	submitProduct=()=>{
		let currentItem=this.props.product.currentItem;
		currentItem.status=1;
		currentItem.rentType=JSON.stringify(this.props.product.rentType);
		this.props.dispatch({
	         type: 'product/updateProduct',
	         payload: {
	         	currentItem:currentItem,
	     	 }
        });
	}
	cancelProduct=()=>{
		hashHistory.push({pathname:'/product'});
	}
	removeShowImages=(e)=>{
		this.props.dispatch({
	         type: 'product/removeShowImages',
	         payload: {
	         	productId:this.props.product.currentItem.id,
	         	type:1,
	         	id:e.id
	     	 }
        });
	}
	removeDetailImages=(e)=>{
		this.props.dispatch({
	         type: 'product/removeShowImages',
	         payload: {
	         	productId:this.props.product.currentItem.id,
	         	type:2,
	         	id:e.id
	     	 }
        });
	}
	showFileListChange1=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListShowChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:1
	     	 }
        });
	}
	showFileListChange2=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListShowChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:2
	     	 }
        });
	}
	showFileListChange3=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListShowChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:3
	     	 }
        });
	}
	showFileListChange4=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListShowChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:4
	     	 }
        });
	}
	showFileListChange5=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListShowChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:5
	     	 }
        });
	}
	detailFileListChange1=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListDetailChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:1
	     	 }
        });
	}
	detailFileListChange2=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListDetailChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:2
	     	 }
        });
	}
	detailFileListChange3=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListDetailChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:3
	     	 }
        });
	}
	detailFileListChange4=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListDetailChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:4
	     	 }
        });
	}
	detailFileListChange5=(e)=>{
		this.props.dispatch({
	         type: 'product/fileListDetailChange',
	         payload: {
	         	fileList:e.fileList,
	         	id:5
	     	 }
        });
	}
    render() {
    	const labelCol={span: 3};
	    return (
	    	<div>
	    		<h2>{this.props.product.editProductTitle}</h2>
	    	    <h3>产品基本信息</h3>
	    		<Form inline className="fromItem">
			      <FormItem label="产品名称">
			        <Input size="small" name="name" value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.name:''} onChange={this.ProductItemChange}/>
			      </FormItem>
			    </Form>
			    <Form inline className="fromItem">
			      <FormItem label="分类">
			        <Select size="small" defaultValue={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.categoryOneName:'请选择类目'} style={{ width: 140 }} onChange={this.categoryOneSelectChange}>
			          {this.props.product.categoryOneLevel.map((item)=>{
			          	return (<Option key={item.id} value={`${item.id}`}>{item.name}</Option>)
			          })}
				    </Select>
			      </FormItem>
			      <FormItem>
			        <Select size="small" defaultValue={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.categoryTwoName:'请选择类目'} style={{ width: 140 }} onChange={this.categoryTwoSelectChange}>
			          {this.props.product.categoryTwoLevel.map((item)=>{
			          	return (<Option key={item.id} value={`${item.id}`}>{item.name}</Option>)
			          })}
				    </Select>
			      </FormItem>
			      <FormItem>
			        <Select size="small" defaultValue={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.categoryThreeName:'请选择类目'} style={{ width: 140 }} onChange={this.categoryThreeSelectChange}>
			          {this.props.product.categoryThreeLevel.map((item)=>{
			          	return (<Option key={item.id} value={`${item.id}`}>{item.name}</Option>)
			          })}
				    </Select>
			      </FormItem>
			    </Form>
			    <Form inline className="fromItem">
			      <FormItem label="品牌">
			        <Select size="small" defaultValue={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.brandName:'请选择品牌'} style={{ width: 140 }} onChange={this.brandOneSelectChange}>
			          {this.props.product.brandOneLevel.map((item)=>{
			          	return (<Option key={item.id} value={`${item.id}`}>{item.name}</Option>)
			          })}
				    </Select>
			      </FormItem>
			      <FormItem label="系列">
			        <Select size="small" defaultValue={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.seriesName:'请选择系列'} style={{ width: 140 }} onChange={this.brandTwoSelectChange}>
				      {this.props.product.brandTwoLevel.map((item)=>{
			          	return (<Option key={item.id} value={`${item.id}`}>{item.name}</Option>)
			          })}
				    </Select>
			      </FormItem>
			      <FormItem label="型号">
			        <Select size="small" defaultValue={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.modelName:'请选择型号'} style={{ width: 140 }} onChange={this.brandThreeSelectChange}>
				      {this.props.product.brandThreeLevel.map((item)=>{
			          	return (<Option key={item.id} value={`${item.id}`}>{item.name}</Option>)
			          })}
				    </Select>
			      </FormItem>
			    </Form>
			    <Form inline className="fromItem">
			      <FormItem label="批准文号">
			        <Input size="small" className="scopeInput" name="approval" value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.approval:''} onChange={this.ProductItemChange}/>
			      </FormItem>
			    </Form>
			    <Form inline className="fromItem">
			    <div>租赁方式及费用：</div>
			      <FormItem>
			        <Row>
				      <Col span={24}>
				      	<Checkbox onChange={this.rentTypeChange} value="1" checked={this.props.product.rentType.length>0?this.props.product.rentType[0].show==1?true:false:false}>
				      		<div className="checkboxContent">租完即送 
				      		月租金¥<Input size="small" className="checkboxInput" name="rent@1" onChange={this.rentTypeContentChange} value={this.props.product.rentType.length>0?this.props.product.rentType[0].rent:''}/> 
				      		&#12288;租期<Input size="small" className="checkboxInput" name="tenancy@1" onChange={this.rentTypeContentChange} value={this.props.product.rentType.length>0?this.props.product.rentType[0].tenancy:''}/>
				      		</div>
				      	</Checkbox>
				      </Col>
				    </Row>
				    <Row>
				      <Col span={24}>
				      	<Checkbox onChange={this.rentTypeChange} value="2" checked={this.props.product.rentType.length>0?this.props.product.rentType[1].show==1?true:false:false}>
				      		<div className="checkboxContent">长期租赁 
				      		月租金¥<Input size="small" className="checkboxInput" name="rent@2" onChange={this.rentTypeContentChange} value={this.props.product.rentType.length>0?this.props.product.rentType[1].rent:''}/> 
				      		&#12288;租期<Input size="small" className="checkboxInput" name="tenancy@2" onChange={this.rentTypeContentChange} value={this.props.product.rentType.length>0?this.props.product.rentType[1].tenancy:''}/></div>
				      	</Checkbox>
				      </Col>
				    </Row>
				    <Row>
				      <Col span={24}>
				      	<Checkbox onChange={this.rentTypeChange} value="3" checked={this.props.product.rentType.length>0?this.props.product.rentType[2].show==1?true:false:false}>
				      		<div className="checkboxContent">短期租赁 
				      		月租金¥<Input size="small" className="checkboxInput" name="rent@3" onChange={this.rentTypeContentChange} value={this.props.product.rentType.length>0?this.props.product.rentType[2].rent:''}/> 
				      		&#12288;租期<Input size="small" className="checkboxInput" name="tenancy@3" onChange={this.rentTypeContentChange} value={this.props.product.rentType.length>0?this.props.product.rentType[2].tenancy:''}/></div>
				      	</Checkbox>
				      </Col>
				    </Row>
				    <Row>
				      <Col span={24}>
				      	<Checkbox onChange={this.rentTypeChange} value="4" checked={this.props.product.rentType.length>0?this.props.product.rentType[3].show==1?true:false:false}>
				      		<div className="checkboxContent">零售 
				      		&#12288;单价¥<Input size="small" className="checkboxInput" name="rent4" name="rent@4" onChange={this.rentTypeContentChange} value={this.props.product.rentType.length>0?this.props.product.rentType[3].rent:''}/></div>
				      	</Checkbox>
				      </Col>
				    </Row>
			      </FormItem>
			    </Form>
			    <h3>产品展示图片：</h3>
			    <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:1,id:1}}
		              listType="picture-card"
		              fileList={this.props.product.fileListShow1}
		              onChange={this.showFileListChange1}
		              onPreview={this.handlePreview}
		              onRemove={this.removeShowImages}
		        >
		              {this.props.product.fileListShow1.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:1,id:2}}
		              listType="picture-card"
		              fileList={this.props.product.fileListShow2}
		              onChange={this.showFileListChange2}
		              onPreview={this.handlePreview}
		              onRemove={this.removeShowImages}
		        >
		              {this.props.product.fileListShow2.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:1,id:3}}
		              listType="picture-card"
		              fileList={this.props.product.fileListShow3}
		              onChange={this.showFileListChange3}
		              onPreview={this.handlePreview}
		              onRemove={this.removeShowImages}
		        >
		              {this.props.product.fileListShow3.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:1,id:4}}
		              listType="picture-card"
		              fileList={this.props.product.fileListShow4}
		              onChange={this.showFileListChange4}
		              onPreview={this.handlePreview}
		              onRemove={this.removeShowImages}
		        >
		              {this.props.product.fileListShow4.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:1,id:5}}
		              listType="picture-card"
		              fileList={this.props.product.fileListShow5}
		              onChange={this.showFileListChange5}
		              onPreview={this.handlePreview}
		              onRemove={this.removeShowImages}
		        >
		              {this.props.product.fileListShow5.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <h3>产品细节图片：</h3>
			    <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:2,id:1}}
		              listType="picture-card"
		              fileList={this.props.product.fileListDetail1}
		              onChange={this.detailFileListChange1}
		              onPreview={this.handlePreview}
		              onRemove={this.removeDetailImages}
		        >
		              {this.props.product.fileListDetail1.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:2,id:2}}
		              listType="picture-card"
		              fileList={this.props.product.fileListDetail2}
		              onChange={this.detailFileListChange2}
		              onPreview={this.handlePreview}
		              onRemove={this.removeDetailImages}
		        >
		              {this.props.product.fileListDetail2.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:2,id:3}}
		              listType="picture-card"
		              fileList={this.props.product.fileListDetail3}
		              onChange={this.detailFileListChange3}
		              onPreview={this.handlePreview}
		              onRemove={this.removeDetailImages}
		        >
		              {this.props.product.fileListDetail3.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:2,id:4}}
		              listType="picture-card"
		              fileList={this.props.product.fileListDetail4}
		              onChange={this.detailFileListChange4}
		              onPreview={this.handlePreview}
		              onRemove={this.removeDetailImages}
		        >
		              {this.props.product.fileListDetail4.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <Upload
		              action={this.props.product.uploadUrl}
		              className="productUpload"
		              data={{userId:this.props.product.currentItem.id,type:2,id:5}}
		              listType="picture-card"
		              fileList={this.props.product.fileListDetail5}
		              onChange={this.detailFileListChange5}
		              onPreview={this.handlePreview}
		              onRemove={this.removeDetailImages}
		        >
		              {this.props.product.fileListDetail5.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text">点击上传</div></div>}
		        </Upload>
		        <h3>规则参数</h3>
			    <Form inline className="fromItem">
			      <FormItem label="包装">
			        <Input size="small" name="pack" onChange={this.ProductItemChange} value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.pack:''}/>
			      </FormItem>
			      <FormItem label="规格">
			        <Input size="small" name="size" onChange={this.ProductItemChange} value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.size:''}/>
			      </FormItem>
			      <FormItem label="重量">
			        <Input size="small" name="weight" onChange={this.ProductItemChange} value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.weight:''}/>
			      </FormItem>
			    </Form>
			    <Form inline className="fromItem">
			    <div>产品特点：</div>
			      <FormItem className="productTrait">
			        <Input type="textarea" className="charactersInput" rows={4} name="characters" onChange={this.ProductItemChange} value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.characters:''}/>
			      </FormItem>
			    </Form>
			    <Form inline className="fromItem">
			      <FormItem label="适用范围">
			        <Input size="small" className="scopeInput" name="pack" name="scope" onChange={this.ProductItemChange} value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.scope:''}/>
			      </FormItem>
			    </Form>
			    <Form inline className="fromItem">
			      <FormItem label="禁忌">
			        <Input size="small" name="taboo" className="scopeInput" onChange={this.ProductItemChange} value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.taboo:''}/>
			      </FormItem>
			    </Form>
			    <h3>售后服务</h3>
			    <Input type="textarea" rows={4} className="aftermarket" name="aftermarket" onChange={this.ProductItemChange} value={!isNullObject(this.props.product.currentItem)?this.props.product.currentItem.aftermarket:''}/>
			    <div className="editProductButtom">
				    <Button type="primary" onClick={this.submitProduct}>确定</Button>
	    			<Button onClick={this.cancelProduct}>取消</Button>
    			</div>
	    	</div>
	    );
    }
};

export default EditProduct;