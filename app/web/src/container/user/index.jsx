import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Row, Col, Upload } from 'antd';
import './style.scss';

// import {getSearchNextPageToken, getSearchResults} from '../../store/reducers/user';
import * as userActions from '../../store/actions/user';

class User extends Component {
  render() {
    const { userDetail } = this.props
    return(
      <div className="container user">
        <Row>
          <Col span={4}>
            <div className="user-avatar-warp">
              <img src={require('../../../asset/images/avatar.png')} alt=""/>
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

  getUserDetail() {
    const params = {id: this.props.match.params.id};
    this.props.getUserDetail(params);
    // if (this.props.youtubeApiLoaded) {
    //   this.props.searchForVideos(searchQuery);
    // }
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

// export default connect(mapStateToProps)(User);
export default connect(mapStateToProps, mapDispatchToProps)(User);