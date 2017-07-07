import React from 'react';
import './Hot.css'
import { Card ,Select ,Row ,Col,Upload,Icon} from 'antd';
const Option = Select.Option;

class Hot extends React.Component {
  componentDidMount () {
     	this.props.dispatch({
           type: 'category/queryHot',
      });
  }
  getFocus=(i)=>{
	  this.props.dispatch({
           type: 'category/changeHotItem',
           payload:{
           	 hotItemSort:i+1
           }
    });
  }
  handleChange=(e)=>{
  	this.props.dispatch({
           type: 'category/updateCategorySort',
           payload:{
           	 sort:this.props.category.hotItemSort,
           	 id:e
           }
    });
  }
  iconChange1=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:1,
             fileList:e.fileList
           }
    });
  }
  iconChange2=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:2,
             fileList:e.fileList
           }
    });
  }
  iconChange3=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:1,
             fileList:e.fileList
           }
    });
  }
  iconChange3=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:3,
             fileList:e.fileList
           }
    });
  }
  iconChange4=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:4,
             fileList:e.fileList
           }
    });
  }
  iconChange5=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:5,
             fileList:e.fileList
           }
    });
  }
  iconChange6=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:6,
             fileList:e.fileList
           }
    });
  }
  iconChange7=(e)=>{
    this.props.dispatch({
           type: 'category/changeHotItemFileList',
           payload:{
             id:7,
             fileList:e.fileList
           }
    });
  }
  iconRemove=(id)=>{
    this.props.dispatch({
           type: 'category/updateCategory',
           payload:{
             id:id,
             iconUrl:""
           }
    });
  }
  render() {
    return (
      <div>
      	<div style={{marginBottom:15}}><h3>分类产品显示</h3></div>
      	<Row gutter={2}>
      	  {this.props.category.hotList.slice(0,7).map((item,i)=>{
      	  	let defaultValue='选择类目';
            if(item.sort==(i+1)){
              defaultValue=item.name;
            }
            let iconChange;
            if(i==0){
              iconChange=this.iconChange1;
            }else if(i==1){
              iconChange=this.iconChange2;
            }else if(i==2){
              iconChange=this.iconChange3;
            }else if(i==3){
              iconChange=this.iconChange4;
            }else if(i==4){
              iconChange=this.iconChange5;
            }else if(i==5){
              iconChange=this.iconChange6;
            }else if(i==6){
              iconChange=this.iconChange7;
            }
      	  	return (<Col key={i} className="colBottom" xs={12} sm={9} md={6} lg={3}>
		      	  		  <div className="hotBox">
						           <div className="custom-image hot-custom-image">
        						      <Upload
                            action={this.props.category.categoryIconUploadUrl}
                            data={{id:item.id}}
                            className="hotUpload"
                            listType="picture-card"
                            fileList={item.fileList}
                            onChange={iconChange}
                            onRemove={()=>this.iconRemove(item.id)}
                          >
                            {item.fileList.length >0  ? null : <div><Icon type="plus" /><div className="ant-upload-text"></div></div>}
                          </Upload>
        						    </div>
        						    <div className="custom-card">
        						      <Select className="hotSelect" size="large" defaultValue={defaultValue} style={{ width: 120 }} name={i} onFocus={()=>this.getFocus(i)} onChange={this.handleChange}>
        						      	{this.props.category.hotList.map((item,i)=>(
        						      		<Option key={`o${i}`} value={`${item.id}`}>{item.name}</Option>
        						      	))}
        							  </Select>
        						    </div>
        						</div>
        					</Col>)
      	  })}
	    </Row>
      </div>
    );
  }
};


export default Hot;