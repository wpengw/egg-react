import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Test extends Component {
  render() {
    const { userInfo, topicList } = this.props
    return(
      <div>
        <div>{userInfo.name}</div>
        <br/>
        {topicList.length > 0 && (
          <div>
            {
              topicList.map(item => {
                return (
                  <div key={item.id}>{ item.title } -- { item.content } -- { item.authorName }</div>
                )
              })
            }
          </div>
        )}
      </div>
    )
  }
}

Test.propTypes = {
  userInfo: PropTypes.object.isRequired,
  topicList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const { homeInfo } = state;
  const userInfo = homeInfo.userInfo || {};
  const topicList = homeInfo.topicList || [];
  return {
    topicList,
    userInfo
  }
}

export default connect(mapStateToProps)(Test);
