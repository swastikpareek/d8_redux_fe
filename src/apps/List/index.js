import React, { useEffect } from 'react';
import ListItem from './list-item.js';
import ListForm from './list-form.js';
import { useSelector, useDispatch } from 'react-redux';
import { setLoadingState, setListData, toggleFormState } from '../../actions/list';
import ConditionalView from '../../component/ConditionalView';
import { Button } from 'react-bootstrap';

function List() {
  const dispatch = useDispatch();
  const listItems = useSelector(state =>{
    return state.listItems;
  });

  const isLoading = useSelector(state =>{
    return state.loading;
  });

  const showAddFormPopup = useSelector(state =>{
    return state.showAddFormPopup;
  });

  const ItemURLs = `http://l.d8/list/todo?_format=json`;

  const toggleForm = () => {
    dispatch(toggleFormState(!showAddFormPopup));
  }

  useEffect(() => {
    if(isLoading) {
      fetch(ItemURLs)
        .then(data => {
          return data.json();
        })
        .then(data => {
          dispatch(setListData(data));
          dispatch(setLoadingState(false));
        })
        .catch(err => {
          console.log('error');
        });
    }
  }, [ItemURLs, dispatch, isLoading]);

  return (
    <div className="container pt-2 pb-2 mt-5 card">
      <h1> List Items</h1>
      <ConditionalView condition={isLoading}>
        <div className="d-flex align-items-center py-4 flex-column">
          <div className="spinner-border mb-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p> Please wait </p>
        </div>
      </ConditionalView>
      <ConditionalView condition={!isLoading}>
        <ConditionalView condition={listItems.length > 0}>
          {listItems.map((i, ind) => <ListItem key={ind} index={ind} isLast={ind === listItems.length - 1} {...i} />)}
        </ConditionalView>
        <ConditionalView condition={listItems.length === 0}>
          <div className="d-flex align-items-center py-4 flex-column">
            <h4> No todo for you </h4>
            <p> Add a todo from the 'Add Todo' button </p>
          </div>
        </ConditionalView>
      </ConditionalView>
      <Button variant="primary" onClick={toggleForm}>
        Add a Todo
      </Button>
      <ListForm show={showAddFormPopup} closeHandler={toggleForm} />
    </div>
  );
}

export default List;
