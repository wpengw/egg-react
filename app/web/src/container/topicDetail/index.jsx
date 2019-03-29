import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as topicActions from '../../store/actions/topic';

class TopicDetail extends Component {
  render() {
    const { detail } = this.props
    return(
      <div className="container">
        <div>{detail.title}</div>
        <div>{detail.content}</div>
        <div>{detail.authorName}</div>
      </div>
    )
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getTopicDetail({ id })
  }
}

TopicDetail.propTypes = {
  detail: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { topic } = state;
  return {
    detail: topic.detail
  }
}

const mapDispatchToProps = (dispatch) => {
  const getTopicDetail = topicActions.getTopicDetail.request;
  return bindActionCreators({ getTopicDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail);
