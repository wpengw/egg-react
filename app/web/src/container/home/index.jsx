import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { sendTopicListRequest } from '../../actions/topic'
import './home.scss';
import LeftSlider from './leftSlider';
import TopicItem from './topicItem';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const params = {
      // topicType: ''
    }
    dispatch(sendTopicListRequest(params))
  }
  render() {
    const { topicList } = this.props
    return (
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
    );
  }
}


Home.propTypes = {
  topicList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const { topic } = state;
  const topicList = topic.topicList || [];
  return {
    topicList
  }
}

export default connect(mapStateToProps)(Home);
