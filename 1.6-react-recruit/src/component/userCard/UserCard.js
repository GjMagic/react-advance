import React, { Component } from 'react';
import { Card, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';

class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  render() {

    let { userlist } = this.props;

    return (
      <WingBlank>
        {userlist.map((item, i) => (
          item.avatar
          ? <Card key={i}>
              <Card.Header 
                title={item.user}
                thumb={require(`../img/${item.avatar}.png`)}
                extra={<span>{item.title}</span>}
              />
              <Card.Body>
                {item.type === 'boss' ? <div>公司名：{item.company}</div> : null}
                {item.desc.split('\n').map((v, i) => (
                  <div key={i}>{v}</div>
                ))}
                {item.type === 'boss' ? <div>薪资：{item.money}</div> : null}
              </Card.Body>
          </Card> : null
        ))}
      </WingBlank>
    );
  }
}
export default UserCard;