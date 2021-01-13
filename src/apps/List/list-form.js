import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { TodoDataConfig, Request, Globals } from '../../constants';
import { addToListData } from '../../actions/list';
import { useDispatch } from 'react-redux';
import * as alertify from 'alertifyjs';

function ListForm({show, closeHandler}) {
  const dispatch = useDispatch();
  const [todoData, setTodoData] = useState(TodoDataConfig);
  const [isLoading, setIsLoading] = useState(false);
  const data = {
    _links: {
      type: {
        href: `${Globals.baseUrl}/rest/type/node/todo`
      }
    },
    title: [{
      value: todoData.name
    }],
    body: [{
      value: todoData.description,
    }],
    field_completed: [{
      value: todoData.done
    }]
  };

  const onInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setTodoData({
      ...todoData,
      [name]: value
    });
  }

  const addData = (event) => {
    setIsLoading(true);
    Request(Globals.route.node, data, 'POST', (data) => {
      setIsLoading(false);
      dispatch(addToListData({
        ...todoData,
        done: todoData.done ? "1" : "0",
        nid: data.nid.pop().value,
        _id: data.uuid.pop().value
      }));
      alertify.success('Item added');
      closeHandler();
      setTodoData(TodoDataConfig);
    },
    (error) => {
      setIsLoading(false);
    });
  }

  return (
    <Modal show={show} onHide={closeHandler}>
    <Modal.Header closeButton>
      <Modal.Title>Add a todo task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <div className="form-group">
          <label htmlFor="titleFormElement">Title</label>
          <input
            type="text"
            className="form-control"
            id="titleFormElement"
            aria-describedby="titleHelp"
            placeholder="Enter Title"
            value={todoData.name}
            name="name"
            onChange={onInputChange}
          />
          <small id="titleHelp" className="form-text text-muted">Add a todo task title.</small>
        </div>
        <div className="form-group">
          <label htmlFor="descriptionFormElement">Description</label>
          <textarea
            className="form-control"
            id="descriptionFormElement"
            aria-describedby="descriptionHelp"
            placeholder="Enter Description"
            name="description"
            value={todoData.description}
            onChange={onInputChange}
          />
          <small id="descriptionHelp" className="form-text text-muted">A short help description to add more info to the todo.</small>
        </div>
        <div className="form-group">
          <div className="custom-checkbox custom-control">
            <input
              type="checkbox"
              className="custom-control-input"
              id="checkedFormElement"
              aria-describedby="checkedHelp"
              name="done"
              checked={todoData.done}
              onChange={onInputChange}
              />
            <label className="custom-control-label" htmlFor="checkedFormElement">Is Completed</label>
          </div>
          <small id="checkedHelp" className="form-text text-muted">Enable if this is done already.</small>
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeHandler} disabled={isLoading}>
        Close
      </Button>
      <Button variant="primary" onClick={addData} disabled={isLoading}>
        Add New
      </Button>
    </Modal.Footer>
  </Modal>
 );
}

export default ListForm;
