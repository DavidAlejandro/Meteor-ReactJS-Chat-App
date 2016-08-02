import React from 'react';

UserRow = React.createClass({
  render()
  {
    console.log(this.props);
    console.log(this.props.key);
    return(<li key={this.props.key}>{this.props.userName}</li>);
  }
});
