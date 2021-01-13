import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import List from './apps/List/index.js';
import listReducer from './reducers/list';

const ListStore = createStore(listReducer);

export default function App() {
  return (
    <div>
     <Provider store={ListStore} >
       <List />
     </Provider>
    </div>
  );
}
