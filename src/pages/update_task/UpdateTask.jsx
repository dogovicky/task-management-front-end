import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./updateTask.module.css";

const UpdateTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [updateTask, setUpdateTask] = useState({
    taskId: `${taskId}`,
    title: "",
    description: "",
    status: false,
    dueDate: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      console.log(taskId);
      const url = `http://localhost:8080/api/task/${taskId}`;
      axios
        .get(url)
        .then((resp) => {
          setTask(resp.data);
          console.log(resp);
          setUpdateTask(resp.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
      // const response = await axios.get(url);
      // setTask(response.data);
    };

    fetchProduct();
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask({
      ...updateTask,
      [name]: value,
    });
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/task/${taskId}`;
    axios
      .put(url, updateTask, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTask),
      })
      .then((resp) => {
        alert("Task updated successfully");
        console.log(updateTask);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h4 className={style.header}>Update Task</h4>
          <div className={style.form_container}>
            <form>
              <div className={style.inputBox}>
                <input
                  type="text"
                  placeholder={task.title}
                  name="title"
                  value={updateTask.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="text"
                  placeholder={task.description}
                  name="description"
                  value={updateTask.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="date"
                  name="dueDate"
                  value={updateTask.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.btnBox}>
                {/* <button
                  to={"/"}
                  className="btn btn-primary"
                  onClick={handleCancelBtn}
                >
                  Cancel
                </button> */}
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={handleUpdateTask}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTask;
