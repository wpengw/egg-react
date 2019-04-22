import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Row, Col, Upload, Icon, message } from 'antd';
import './style.scss';

// import {getSearchNextPageToken, getSearchResults} from '../../store/reducers/user';
import * as userActions from '../../store/actions/user';


class User extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      imgUrl: ''
    }

    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    const { userDetail } = this.props;
    const { imgUrl } = this.state;
    return(
      <div className="container user">
        <Row>
          <Col span={4}>
            <div className="user-avatar-warp">
              <img src={ userDetail.avatarUrl } alt=""/>
              <Upload
                name="avatar"
                className="upload-img"
                showUploadList={false}
                action="http://10.155.121.40:7001/api/v1/upload/img"
                beforeUpload={ this.beforeUpload }
                onChange={ this.handleChange }
              >
                上传头像
              </Upload>
            </div>
          </Col>
          <Col span={10}>col-12</Col>
          <Col span={10}>col-12</Col>
        </Row>
        {/* <div>{userDetail.username}</div>
        <div>{userDetail.id}</div> */}
      </div>
    )
  }

  componentDidMount() {
    // const { dispatch }=this.props;
    // dispatch(sendUserRequest({id: this.props.match.params.id}));
    this.getUserDetail();
  }
  beforeUpload(file) {
    const isJPG = file.type === 'image/png';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  handleChange(info) {
    if (info.file.status === 'done') {
      // this.setState({
      //   imgUrl: info.avatarUrl
      // })
      this.getUserDetail();
    }
  }

  getUserDetail() {
    const params = {id: this.props.match.params.id};
    this.props.getUserDetail(params);
  }
}

User.propTypes = {
  userDetail: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => {
  const { userDetail } = state.user;
  return {
    userDetail: userDetail || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  const getUserDetail = userActions.getUserDetail.request;
  return bindActionCreators({ getUserDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);