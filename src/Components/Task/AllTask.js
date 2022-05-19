import axios from "axios";
import React, { useEffect, useState } from "react";

const AllTask = () => {
  const [tasks, settasks] = useState([]);
  const [refetch, setRefetch] = useState(1);
  useEffect(() => {
    axios.get("http://localhost:5000/task").then((data) => {
      console.log(data);
      settasks(data.data);
    });
  }, [refetch]);

  const handelComplete = async (id) => {
    axios
      .put(`http://localhost:5000/task/${id}`, {
        completeStatus: "true",
      })
      .then((res) => {
        console.log(res);
        setRefetch(refetch + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-5">
      <table class="table caption-top m-4">
        <caption>All task</caption>
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr>
                <td>{task.task}</td>
                <td>{task.taskDescription}</td>
                <td
                  onClick={() => {
                    handelComplete(task._id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Mark as complete
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllTask;
