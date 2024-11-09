import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import style from "./home.module.css";

const initialState = {
  tasks: [],
  loading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: "",
      };
    case "FETCH_FAILED":
      return {
        ...state,
        tasks: [],
        loading: false,
        error: action.payload,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.taskId !== action.payload),
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const url = "http://localhost:8080/api/tasks";
    axios
      .get(url)
      .then((resp) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: resp.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_FAILED",
          payload: error.message,
        });
      });
  }, []);

  const deleteTask = (taskId) => {
    const url = `http://localhost:8080/api/task/${taskId}`;
    const response = axios.delete(url);
    if (response === 200) {
      dispatch({
        action: "DELETE_TASK",
        payload: taskId,
      });
    }
  };

  return (
    <>
      <div className={style.container}>
        <h4 className={style.header}>Your Tasks</h4>
        <div className={style.tasks_container}>
          {state.loading ? (
            "Loading..."
          ) : state.error ? (
            <div className={style.errorBox}>
              <h4 className={style.error}>
                Failed to fetch, please check connection or ,<br /> try again
                later!
              </h4>
            </div>
          ) : state.tasks.length == 0 ? (
            <div className={style.notask_container}>
              <div className={style.notask}>No tasks added at the moment</div>
            </div>
          ) : (
            <ul className={style.tasks_list}>
              {state.tasks.map((task) => (
                <li key={task.taskId}>
                  <div className={style.list_container}>
                    <div className={style.title_container}>
                      <div className={style.title}>{task.title}</div>
                      <div className={style.description}>
                        {task.description}
                      </div>
                    </div>
                    <div className={style.btn_container}>
                      <Link
                        to={`/task/${task.taskId}`}
                        className={style.editBtn}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        className={style.deleteBtn}
                        onClick={() => deleteTask(task.taskId)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/addtask" className="btn btn-outline-primary m-3">
          Add Task
        </Link>
      </div>
    </>
  );
};

export default Home;
