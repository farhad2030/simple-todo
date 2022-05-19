import React from "react";
import axios from "axios";
const AddTask = () => {
  const handelAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    axios
      .post("http://localhost:5000/task", formDataObj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <form className="mx-5 p-4 border rounded" onSubmit={handelAddTask}>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            name="task"
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="Add a task"
            required
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            name="taskDescription"
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="Add a task"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </form>
    </>
  );
};

export default AddTask;
