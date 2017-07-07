import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, Modal ,Card ,Input,Row,Col,Button,Popconfirm} from 'antd';
import './Banner.css';

class Banner extends React.Component {
  componentDidMount () {
      this.props.dispatch({
         type: 'banner/queryFileList',
      });
  }
  handleCancel = () => this.props.dispatch({type: 'banner/hidePreview'})

  handleChange1=(e)=>{
    if(e.file.response&&e.file.response.errorCode==1){
      this.props.dispatch({
         type: 'banner/queryFileList',
      });
    }
    this.props.dispatch({
         type: 'banner/fileListChange',
         payload:{
          fileList1:e.fileList
         }
    });
  }
  handleChange2=(e)=>{
    if(e.file.response&&e.file.response.errorCode==1){
      this.props.dispatch({
         type: 'banner/queryFileList',
      });
    }
    this.props.dispatch({
         type: 'banner/fileListChange',
         payload:{
          fileList2:e.fileList
         }
    });
  }
  handleChange3=(e)=>{
    if(e.file.response&&e.file.response.errorCode==1){
      this.props.dispatch({
         type: 'banner/queryFileList',
      });
    }
    this.props.dispatch({
         type: 'banner/fileListChange',
         payload:{
          fileList3:e.fileList
         }
    });
  }
  handleChange4=(e)=>{
    if(e.file.response&&e.file.response.errorCode==1){
      this.props.dispatch({
         type: 'banner/queryFileList',
      });
    }
    this.props.dispatch({
         type: 'banner/fileListChange',
         payload:{
          bottomFile:e.fileList
         }
    });
  }
  handlePreview = (file) => {
    this.props.dispatch({
          type: 'banner/showPreview',
          payload: {
             previewImage: file.url || file.thumbUrl,
             previewVisible: true,
          }
    });
  }
  remove=(file)=>{
    this.props.dispatch({
          type: 'banner/updateFileList',
          payload: {
             id: file.name
          }
    });
  }
  // 点击编辑按钮事件
  editClick(id){
    this.props.dispatch({
          type: 'banner/currentItemEditChange',
          payload:{
            id : id
          }
    });
  }
  currentItemChange=(e)=>{
    this.props.dispatch({
          type: 'banner/currentItemChange',
          payload:{
            linkUrl : e.target.value
          }
    });
  }
  currentLtemLinkUrlEdit=()=>{
    this.props.dispatch({
          type: 'banner/updateCurrentItemLinkUrl',
          payload: {
            currentItem:this.props.banner.currentItem
          }
      });
  }
  render() {
    const { previewVisible, previewImage, fileList1,fileList2,fileList3,bottomFile } = this.props.banner;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <div className="clearfix">
      <h3 style={{margin:15}}>banner图片</h3>
      <Row>
        <Col> 
          <div ref="uploadBox">
          <Upload
              action={this.props.banner.uploadBannerUrl}
              listType="picture-card"
              fileList={fileList1}
              onPreview={this.handlePreview}
              onChange={this.handleChange1}
              onRemove={this.remove}
            >
              {fileList1.length > 0 ? null : uploadButton}
          </Upload>
          {this.props.banner.fileList1.length>0?this.props.banner.fileList1.map((item)=>{
              let currentItem=this.props.banner.currentItem;
              let disabled=true;
              let editButtonClass='';
              let saveButtonClass='';
              if(currentItem){
                if(currentItem.id==item.id){
                  disabled=false;
                  editButtonClass='buttonDisplay';
                }else{
                  saveButtonClass='buttonDisplay';
                }
              }
              return (
                    <div className="gutter-box" key={item.id}>
                    <Input value={item.linkUrl} disabled={disabled} onChange={this.currentItemChange} className="imgUrlInput"/>
                    <Button type="ghost" className={editButtonClass} onClick={()=>this.editClick(item.id)}>编辑链接</Button>
                    <Button type="primary" className={saveButtonClass} onClick={this.currentLtemLinkUrlEdit}>保存链接</Button>
                  </div>
                  );
             }):''}
          </div>
        </Col>
        <Col> 
          <div ref="uploadBox">
          <Upload
              action={this.props.banner.uploadBannerUrl}
              listType="picture-card"
              fileList={fileList2}
              onPreview={this.handlePreview}
              onChange={this.handleChange2}
              onRemove={this.remove}
            >
              {fileList2.length > 0 ? null : uploadButton}
          </Upload>
          {this.props.banner.fileList2.length>0?this.props.banner.fileList2.map((item)=>{
              let currentItem=this.props.banner.currentItem;
              let disabled=true;
              let editButtonClass='';
              let saveButtonClass='';
              if(currentItem){
                if(currentItem.id==item.id){
                  disabled=false;
                  editButtonClass='buttonDisplay';
                }else{
                  saveButtonClass='buttonDisplay';
                }
              }
              return (
                    <div className="gutter-box" key={item.id}>
                    <Input value={item.linkUrl} disabled={disabled} onChange={this.currentItemChange} className="imgUrlInput"/>
                    <Button type="ghost" className={editButtonClass} onClick={()=>this.editClick(item.id)}>编辑链接</Button>
                    <Button type="primary" className={saveButtonClass} onClick={this.currentLtemLinkUrlEdit}>保存链接</Button>
                  </div>
                  );
             }):''}
          </div>
        </Col>
        <Col> 
          <div ref="uploadBox">
          <Upload
              action={this.props.banner.uploadBannerUrl}
              listType="picture-card"
              fileList={fileList3}
              onPreview={this.handlePreview}
              onChange={this.handleChange3}
              onRemove={this.remove}
            >
              {fileList3.length > 0 ? null : uploadButton}
          </Upload>
          {this.props.banner.fileList3.length>0?this.props.banner.fileList3.map((item)=>{
              let currentItem=this.props.banner.currentItem;
              let disabled=true;
              let editButtonClass='';
              let saveButtonClass='';
              if(currentItem){
                if(currentItem.id==item.id){
                  disabled=false;
                  editButtonClass='buttonDisplay';
                }else{
                  saveButtonClass='buttonDisplay';
                }
              }
              return (
                    <div className="gutter-box" key={item.id}>
                    <Input value={item.linkUrl} disabled={disabled} onChange={this.currentItemChange} className="imgUrlInput"/>
                    <Button type="ghost" className={editButtonClass} onClick={()=>this.editClick(item.id)}>编辑链接</Button>
                    <Button type="primary" className={saveButtonClass} onClick={this.currentLtemLinkUrlEdit}>保存链接</Button>
                  </div>
                  );
             }):''}
          </div>
        </Col>
    </Row>
    <div className="bannerDecollate"></div>
    <h3 style={{margin:15}}>底部图片</h3>
    <Row>
      <Col> 
        <div ref="uploadBox">
        <Upload
            action={this.props.banner.uploadBottmUrl}
            listType="picture-card"
            fileList={bottomFile}
            onPreview={this.handlePreview}
            onChange={this.handleChange4}
            onRemove={this.remove}
          >
            {bottomFile.length > 0 ? null : uploadButton}
        </Upload>
        {this.props.banner.bottomFile.length>0?this.props.banner.bottomFile.map((item)=>{
              let currentItem=this.props.banner.currentItem;
              let disabled=true;
              let editButtonClass='';
              let saveButtonClass='';
              if(currentItem){
                if(currentItem.id==item.id){
                  disabled=false;
                  editButtonClass='buttonDisplay';
                }else{
                  saveButtonClass='buttonDisplay';
                }
              }
              return (
                    <div className="gutter-box" key={item.id}>
                    <Input value={item.linkUrl} disabled={disabled} onChange={this.currentItemChange} className="imgUrlInput"/>
                    <Button type="ghost" className={editButtonClass} onClick={()=>this.editClick(item.id)}>编辑链接</Button>
                    <Button type="primary" className={saveButtonClass} onClick={this.currentLtemLinkUrlEdit}>保存链接</Button>
                  </div>
                  );
             }):''}
        </div>
      </Col>
    </Row>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
};


export default Banner;