import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class User extends Component {
  render() {
    const { userInfo } = this.props
    console.log(this.props.location.pathname);
    return(
      <div>
        <div>{userInfo.name}</div>
      </div>
    )
  }
}

User.propTypes = {
  userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { homeInfo } = state;
  const userInfo = homeInfo.userInfo || {};
  return {
    userInfo
  }
}

export default connect(mapStateToProps)(User);
