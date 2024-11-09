import React, { useReducer, useState } from "react";
import axios from "axios";
import style from "./addTask.module.css";
import { Link } from "react-router-dom";

const initialState = {
  task: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "POST_SUCCESS":
      return {
        task: action.payload,
        error: "",
      };
    case "POST_FAILED":
      return {
        task: {},
        error: "Failed to add task!",
      };
  }
};

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: false,
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      status: false,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/task";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((resp) => {
        dispatch({
          type: "POST_SUCCCESS",
          payload: resp.data,
        });
        alert("Task added successfully");
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          status: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: "POST_FAILED",
          payload: error.message,
        });
        alert("Error adding task");
      });
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h4 className={style.header}>Add Task</h4>
          <div className={style.form_container}>
            <form action="post">
              <div className={style.inputBox}>
                <input
                  type="text"
                  placeholder="Enter title..."
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="text"
                  placeholder="Enter description..."
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.btnBox}>
                <button
                  to={"/"}
                  className="btn btn-primary"
                  onClick={handleCancelBtn}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleAddTask}
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
