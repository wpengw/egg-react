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
    const { infoDetail } = this.props
    return(
      <div>
        <div>{infoDetail.username}</div>
        <div>{infoDetail.id}</div>
      </div>
    )
  }
}

User.propTypes = {
  infoDetail: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { infoDetail } = state.userInfo;
  return {
    infoDetail: infoDetail || {}
  }
}

export default connect(mapStateToProps)(User);
