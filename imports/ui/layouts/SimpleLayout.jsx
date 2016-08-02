import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Actions } from '../../api/actions/actionsCollection.js';

class SimpleLayout extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <main>
          {this.props.content(this.props)}
        </main>
      </div>
    );
  }
}
SimpleLayout.propTypes = {
  actions: PropTypes.object.isRequired
};

export default createContainer(() => {
  var subscription = Meteor.subscribe('actions');
    return {
      currentUser: Meteor.user(),
      ready: subscription.ready(),
      actions: Actions
    };
}, SimpleLayout);
