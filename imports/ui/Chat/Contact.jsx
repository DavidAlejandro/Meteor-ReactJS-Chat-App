import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';

export default class Contact extends React.Component
{
  constructor()
  {
    super();
  }

  _handleContactClick(userId)
  {
    Session.set('conversationUser', userId);
  }

  render()
  {
    return (<div id={this.props.userId} onClick={() => this._handleContactClick(this.props.userId)}>{this.props.fullName}{this.props.contactStatus}</div>);
  }
}
