//Dependencies
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { render } from 'react-dom';//quitar
import { mount } from 'react-mounter';

//Layouts
import MainLayout from '../../ui/layouts/MainLayout.jsx';
import SimpleLayout from '../../ui/layouts/SimpleLayout.jsx';

//Layout Components
import ChatContainer from '../../ui/Chat/ChatContainer.jsx';

//Components
import RegisterForm from '../../ui/Users/RegisterForm.jsx';
import LoginForm from '../../ui/Users/LoginForm.jsx';

//Agregar un layout para paginas sencillas.
const adminLayout = ({content}) => (
    <MainLayout content={content}/>
);

const simpleLayout = ({content}) => (
    <SimpleLayout content={content}/>
);

FlowRouter.route('/', {
  name: 'home',
  action(params) {
    mount(MainLayout, {
      content: function(){},
      contacts: (props) => (<ChatContainer {...props}/>)});
    }
});

FlowRouter.route('/register', {
  name: 'register',
  action(params) {
    mount(SimpleLayout, {content: (props) => (<RegisterForm {...props}/>)});
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action(params) {
      mount(SimpleLayout, {content: (props) => (<LoginForm {...props}/>)});
    }

});
