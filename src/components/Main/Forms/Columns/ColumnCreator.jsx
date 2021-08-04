import React, { useReducer } from 'react';
import { columnSubmitHandler } from '../../../../utils/form-handlers';
import {
  initialState,
  reducer,
  setColorAC,
  setTitleAC
} from '../../../../utils/column-form-reducer';

function NewColumnForm({ items }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <form
      onSubmit={
        (e) => columnSubmitHandler({ ...state, e }, items)
      }
      className="form-creator"
    >
      <input
        autoComplete="off"
        onChange={(e) => dispatch(setTitleAC(e.target.value))}
        type="text"
        value={state.title}
        placeholder="column title"
      />
      <div className="color_picker">
        <label htmlFor="color">Choose Color</label>
        <input
          autoComplete="off"
          onChange={(e) => dispatch(setColorAC(e.target.value))}
          type="color"
          id="color"
          name="color"
          value={state.color}
        />

      </div>

      <input className="btn" type="submit" value="Create column" />
    </form>
  );
}

export default NewColumnForm;
