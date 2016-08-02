import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Actions } from '../../api/actions/actionsCollection.js';
import LoginForm from '../Users/LoginForm.jsx';
import AccountButtons from './AccountButtons.jsx';

class MainLayout extends Component{

  constructor(props) {
    super(props);
    this.state = {
      currentUser: Meteor.user()
    };
  }

  componentWillMount()
  {
    Tracker.autorun(()=>{
        this.setState({currentUser: Meteor.user()})
    });
  }

  render() {
    if (!this.state.currentUser)
    {
      //if not logged render login component.
      return <LoginForm/>;
    }
    else
    {
      return (
        <div>
          <header>
            <h1>Simple Chat Module</h1>
            <AccountButtons/>
          </header>
          <main>
            <br></br>
            <div className="Contacts">{this.props.contacts(this.props)}</div>
            <div className="Content">{this.props.content(this.props)}</div>
          </main>
        </div>
      );
    }
  }
}
MainLayout.propTypes = {
  actions: PropTypes.object.isRequired
};

export default createContainer(() => {
  var subscription = Meteor.subscribe('actions');
    return {
      ready: subscription.ready(),
      actions: Actions
    };
}, MainLayout);
