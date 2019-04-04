import React, { Component } from 'react';
import { connect } from 'react-redux';
import { relativeTime } from '../../../util/tool';
import { Icon } from 'antd';

class LeftSlider extends Component {
  constructor(props) {
    super(props);
    this.handleToDetail = this.handleToDetail.bind(this);
    this.handleLike = this.handleLike.bind(this);
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
          <span onClick={ () => this.handleLike(topicInfo.id) } className="like"> 
            <Icon type="like" />
            <span className="like-num">{ topicInfo.likeNum }</span>
            <span>赞</span>
          </span>
          <span>{ topicInfo.pageView } 浏览</span>
          <a className="user-name" href={'/user/' + topicInfo.authorId}>{ topicInfo.authorName }</a>
          <span className="time">{ relativeTime(topicInfo.created_at) }</span>
        </div>
      </div>
    );
  }

  handleToDetail() {
    // this.props.history.push('/');
  }
  handleLike(id) {
    console.log(id);
  }
}


const mapStateToProps = state => {
  return {
    list: state.list
  };
};

export default connect(mapStateToProps, null)(LeftSlider);
