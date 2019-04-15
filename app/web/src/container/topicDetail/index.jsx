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
    const { detail } = this.props;
    let targetsArr = detail.targetsArr || [];
    return(
      <div className="container topic-detail">
        <h2 className="detail-title">{ detail.title }</h2>
        <div className="info clear">
          <span className="topic-type">{ this.handleTopicType(detail.topicType) }</span>
          {
            targetsArr.map((item, index) => {
              return <a className="topic-type topic-target" key={ index }>{ item.label }</a>
            })
          }
          <span className="pageView">{ detail.pageView } 次阅读</span>
        </div>
        <div
          id="content"
          className="article-detail"
          dangerouslySetInnerHTML={{
            __html: detail.content ? marked(detail.content) : null
          }}
        />
        {/* <div>预览：{ detail.pageView }</div> */}
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
  handleTopicType(type) {
    let _obj = {
      1: '原创',
      2: '转载',
      3: '翻译'
    }
    return _obj[type];
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
