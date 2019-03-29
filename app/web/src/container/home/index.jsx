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
    const { topicList } = this.props
    return (
      <div className="container">
        <div className="row">
          <LeftSlider />
          <div className="topicListWrapper">
            {
              topicList.length > 0 && (
                topicList.map(item => {
                  return <TopicItem topicInfo={item}  key={item.id}/>
                })
              )
            }
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const params = {
      // topicType: ''
    }
    this.props.getTopicList(params);
  }
}

Home.propTypes = {
  topicList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const { topic } = state;
  if (topic.msg) {
    message.error(topic.msg, 2);
  }
  return {
    topicList: topic.topicList
  }
}

const mapDispatchToProps = (dispatch) => {
  const getTopicList = topicActions.getTopicList.request;
  return bindActionCreators({ getTopicList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
