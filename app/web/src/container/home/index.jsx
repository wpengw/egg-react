import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './home.scss';
import LeftSlider from './leftSlider';
import TopicItem from './topicItem';

class Home extends Component {
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
  const { homeInfo } = state;
  const topicList = homeInfo.topicList || [];
  return {
    topicList
  }
}

export default connect(mapStateToProps)(Home);
