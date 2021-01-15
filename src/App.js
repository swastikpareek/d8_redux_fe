import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import List from './apps/List';
import LoginForm from './apps/login-form';
import listReducer from './reducers/list';
import { Request, Globals } from './constants';
import ConditionalView from './component/ConditionalView';

import * as alertify from 'alertifyjs';

const ListStore = createStore(listReducer);

export default function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userStatusCallback = (data) => {
    setLoginStatus(true);
  }

  useEffect(() => {
    setIsLoading(true);
    Request(Globals.route.login_status, {}, 'GET', (data) => {
      setIsLoading(false);
      setLoginStatus(data === '1' ? true : false);
    }, (error) => {
      setIsLoading(false);
      alertify.error('Some error has happened');
    });
  }, []);

  return (
    <div>
     <Provider store={ListStore} >
       <div className="container pt-2 pb-2 mt-5">
        <ConditionalView condition={isLoading}>
          <div className="d-flex align-items-center py-4 flex-column">
            <div className="spinner-border mb-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p> Please wait </p>
          </div>
        </ConditionalView>
        <ConditionalView condition={!isLoading}>
          <ConditionalView condition={!loginStatus}>
            <LoginForm loginCallback={userStatusCallback} />
          </ConditionalView>
          <ConditionalView condition={loginStatus}>
            <List />
          </ConditionalView>
        </ConditionalView>
      </div>
    </Provider>
   </div>
  );
}
