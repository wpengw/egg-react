import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import marked from 'marked';
import hljs from 'highlight.js';
import './style.scss';
import * as topicActions from '../../store/actions/topic';

class TopicDetail extends Component {
  render() {
    const { detail } = this.props
    return(
      <div className="container topic-detail">
        <h2 className="detail-title">{ detail.title }</h2>
        <div
          id="content"
          className="article-detail"
          dangerouslySetInnerHTML={{
            __html: detail.content ? marked(detail.content) : null
          }}
        />
      </div>
    )
  }
  componentWillMount() {
    // marked相关配置
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
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
