import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// import {getSearchNextPageToken, getSearchResults} from '../../store/reducers/user';
import * as userActions from '../../store/actions/user';

class User extends Component {
  render() {
    const { userDetail } = this.props
    return(
      <div>
        <div>{userDetail.username}</div>
        <div>{userDetail.id}</div>
      </div>
    )
  }

  componentDidMount() {
    // const { dispatch }=this.props;
    // dispatch(sendUserRequest({id: this.props.match.params.id}))
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