import React from 'react';
import { columnSubmitHandler } from '../../../utils/form-handlers';

function NewColumnForm({ items }) {
  return (
    <form
      onSubmit={
      (e) => columnSubmitHandler(e, items)
    }
      className="form-creator"
    >
      <input type="text" placeholder="column title" id="title" />
      <div className="color_picker">
        <label htmlFor="color">Choose Color</label>
        <input type="color" id="color" name="color" />

      </div>

      <input type="submit" value="Create column" />
    </form>
  );
}

export default NewColumnForm;
