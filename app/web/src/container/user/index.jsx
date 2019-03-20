import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendUserRequest } from '../../actions/user'

class User extends Component {
  componentDidMount() {
    const { dispatch }=this.props;
    dispatch(sendUserRequest({id: this.props.match.params.id}))
  }
  render() {
    const { userInfo } = this.props
    return(
      <div>
        <div>{userInfo.name}</div>
        <div>{userInfo.age}</div>
      </div>
    )
  }
}

User.propTypes = {
  userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(User);
