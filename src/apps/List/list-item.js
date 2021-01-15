import React, { useState } from 'react';
import {Request, Globals} from '../../constants';
import * as alertify from 'alertifyjs';

function ListItem({name, description, done, index, isLast, nid}) {
  const [checked, setChecked] = useState(done);
  const [isLoading, setIsLoading] = useState(false);

  const updateCheckboxState = (event) => {
    const value = event.currentTarget.checked ? "1" : "0";
    const data = {
      type:[{
         target_id: "todo"
      }],
      field_completed: {
        value
      }
    };

    setIsLoading(true);
    Request(`${Globals.route.node}/${nid}`, data, {}, 'PATCH', (data) => {
      setIsLoading(false);
      setChecked(data.field_completed.pop().value ? "1" : "0");
      alertify.success('Item updated');
    },
    (error) => {
      setIsLoading(false);
    });
  }

  return (
    <div className={"pb-3 pt-3 custom-control custom-checkbox " + (!isLast ? 'border-bottom' : null)}>
      <input
        type="checkbox"
        className="custom-control-input"
        id={"customCheck" + index}
        checked={checked === '1' ? "checked": ""}
        disabled={isLoading ? 'disabled' : null}
        onChange={updateCheckboxState}
      />
      <label className="custom-control-label" htmlFor={"customCheck" + index}>
        <h4 className="mb1"> { name} </h4>
        <i> { description } </i>
      </label>
    </div>
  );
}

export default ListItem;
