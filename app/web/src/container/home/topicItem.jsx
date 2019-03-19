import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LeftSlider extends Component {
  render() {
    const { topicInfo } = this.props;
    return (
      <div className="topicItem">
        <h4 className="topicTitle">{ topicInfo.title }</h4>
        <div className="topicExcerpt">{ topicInfo.content }</div>
        <div className="itemMeta">
          <span>{ topicInfo.topNum } 赞</span>
          <span>{ topicInfo.pageView } 浏览</span>
          <a href={'/user/' + topicInfo.authorId}>{ topicInfo.authorName }</a>
          <span className="time">一天前</span>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    list: state.list
  };
};

export default connect(mapStateToProps, null)(LeftSlider);
