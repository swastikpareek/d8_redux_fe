import React, { useEffect } from 'react';
import ListItem from './list-item.js';
import ListForm from './list-form.js';
import { useSelector, useDispatch } from 'react-redux';
import { setLoadingState, setListData, toggleFormState } from '../../actions/list';
import ConditionalView from '../../component/ConditionalView';
import { Button } from 'react-bootstrap';
import {Request, Globals} from '../../constants';

function List() {
  const dispatch = useDispatch();
  const listItems = useSelector(state => state.listItems);
  const isLoading = useSelector(state => state.loading);
  const userInfo = useSelector(state => state.user);
  const showAddFormPopup = useSelector(state => state.showAddFormPopup);

  const toggleForm = () => {
    dispatch(toggleFormState(!showAddFormPopup));
  }

  useEffect(() => {
    if(Array.isArray(userInfo.uid)) {
      Request(`${Globals.route.todoLists}/${userInfo.uid[0].value}`, {}, {}, 'GET', (data) => {
        dispatch(setListData(data));
        dispatch(setLoadingState(false));
      },
      (error) => {
        dispatch(setLoadingState(false));
      });
    }
  }, [dispatch, userInfo]);

  return (
    <div className="mt-5 card">
      <div className="card-body">
        <h3 className="card-title">List Items</h3>
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
        <Button variant="primary" onClick={toggleForm} className="w-100">
          Add a Todo
        </Button>
        <ListForm show={showAddFormPopup} closeHandler={toggleForm} />
      </div>
    </div>
  );
}

export default List;
