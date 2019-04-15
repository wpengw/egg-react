import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import * as topicActions from '../../store/actions/topic';
import './home.scss';
import LeftSlider from './leftSlider';
import TopicItem from './topicItem';
import { message } from 'antd';

class Home extends Component {
  render() {
    const { topicList, like } = this.props;
    let likeId = like.hasOwnProperty('id') ? like.id : null;
    let status = like.hasOwnProperty('id') ? like.likeStatus : null;
    return (
      <div className="container">
        <div className="row">
          <LeftSlider 
            handleSelectByTarget={ this.handleSelectByTarget.bind(this) } 
            handleSelectByTopicType={ this.handleSelectByTopicType.bind(this) }
          />
          <div className="topicListWrapper">
            {
              topicList.length > 0 ? (
                topicList.map(item => {
                  if (likeId == item.id) {
                    status ? item.likeNum++ : item.likeNum--;
                    return <TopicItem topicInfo={item} handleLike={ this.handleLike.bind(this) } key={item.id}/>
                  }
                  return <TopicItem topicInfo={item} handleLike={ this.handleLike.bind(this) } key={item.id}/>
                })
              ) :
                <div className="noData">~(&gt;_&lt;)~&nbsp;还没该类目的文章,快去写文章吧</div>
            }
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.getTopicList();
  }
  handleSelectByTarget(target) {
    this.props.getTopicList({ target });
  }
  handleSelectByTopicType(parentTarget) {
    this.props.getTopicList({ parentTarget })
  }
  handleLike(id) {
    const params = {
      id,
      userId: this.props.loginInfo.id
    }
    this.props.postLikeTopic(params);
  }
}

Home.propTypes = {
  topicList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  console.log(state);
  const { topic, user } = state;
  if (topic.msg && !('username' in user.loginInfo)) {
    message.error(topic.msg, 2);
  }
  return {
    topicList: topic.topicList,
    like: topic.like,
    loginInfo: user.loginInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  const getTopicList = topicActions.getTopicList.request;
  const postLikeTopic = topicActions.postLikeTopic.request;
  return bindActionCreators({ getTopicList, postLikeTopic }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
