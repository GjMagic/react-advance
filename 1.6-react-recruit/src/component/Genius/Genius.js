import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../userCard/UserCard';

@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends Component {
  
  componentDidMount() {
    this.props.getUserList('boss');
  }

  render() {
    
    const { userlist } = this.props;

    return (
      <UserCard userlist={userlist}></UserCard>
    );
  }
}

export default Genius;