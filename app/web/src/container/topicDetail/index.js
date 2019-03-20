import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendTopicDetailRequest } from '../../actions/topic'

class TopicDetail extends Component {
  componentDidMount() {
    const { dispatch }=this.props;
    dispatch(sendTopicDetailRequest({id: this.props.match.params.id}))
  }
  render() {
    const { detail } = this.props
    return(
      <div>
        <div>{detail.title}</div>
        <div>{detail.content}</div>
        <div>{detail.authorName}</div>
      </div>
    )
  }
}

TopicDetail.propTypes = {
  detail: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    detail: state.topic.topicDetail
  }
}

export default connect(mapStateToProps)(TopicDetail);
