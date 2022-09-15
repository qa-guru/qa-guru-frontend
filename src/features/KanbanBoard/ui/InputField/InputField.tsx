import React from "react";
import { FiPlus } from "react-icons/fi";
import { IInputField } from "./InputField.types";
import "./InputField.scss";

const InputField: React.FC<IInputField> = ({
  todo,
  setTodo,
  setPriority,
  handleAdd,
}) => {
  return (
    <div className="u-container -m1">
      <form className="add-form" onSubmit={handleAdd}>
        <select
          className="priorityselect"
          defaultValue="low"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option disabled value="low">
            Select priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          className="contentinput"
          type="text"
          placeholder="Add a task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="submitbtn">
          <FiPlus />
        </button>
      </form>
    </div>
  );
};

export default InputField;
