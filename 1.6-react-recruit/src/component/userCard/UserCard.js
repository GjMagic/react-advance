import React, { Component } from 'react';
import { Card, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(item) {
    const { history } = this.props;
    history.push(`/chat/${item.user}`);
  }

  render() {
    let { handleClick } = this;
    let { userlist } = this.props;

    return (
      <WingBlank style={{marginTop: '45px'}}>
        {userlist.map((item, i) => (
          item.avatar
          ? <Card 
              key={i}
              onClick={() => { handleClick(item) }}
            >
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