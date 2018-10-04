import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Login from '../../components/Login';
import Signup from '../../components/Signup';
import WebsiteForm from '../../components/WebsiteForm';
import Website from '../../components/Website';
import configureStore from '../../configureStore';
import { MemoryRouter } from 'react-router';

// We bring our redux Store
const store = configureStore();

storiesOf('Signup and Login', module)
  .addDecorator(story => <Provider store={store}>
                {/* This will prevent errors because of your Link component*/}
                <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
               </Provider>)
  .add('Login', () => (
    <Login onSubmit={action('submitted')}/>
  ))
  .add('Signup', () => (
    <Signup onSubmit={action('submitted')}/>
  ))
  .add('WebsiteForm', () => (
    <WebsiteForm onSubmit={action('submitted')}/>
    ))
  .add('Website', () => (
    <Website name="Website Name" url="www.example.com" status="online"/>
    ))