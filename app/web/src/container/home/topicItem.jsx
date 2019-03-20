import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeftSlider extends Component {
  constructor(props) {
    super(props);
    this.handleToDetail = this.handleToDetail.bind(this);
  }
  render() {
    const { topicInfo } = this.props;
    return (
      <div className="topicItem" >
        <a href={'/topicDetail/' + topicInfo.id}>
          <h4 className="topicTitle">{ topicInfo.title }</h4>
          <div className="topicExcerpt">{ topicInfo.content }</div>
        </a>
        <div className="itemMeta">
          <span>{ topicInfo.topNum } 赞</span>
          <span>{ topicInfo.pageView } 浏览</span>
          <a href={'/user/' + topicInfo.authorId}>{ topicInfo.authorName }</a>
          <span className="time">一天前</span>
        </div>
      </div>
    );
  }

  handleToDetail() {
    // this.props.history.push('/');
  }
}


const mapStateToProps = state => {
  return {
    list: state.list
  };
};

export default connect(mapStateToProps, null)(LeftSlider);
