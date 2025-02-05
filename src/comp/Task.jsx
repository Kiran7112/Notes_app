import React, { useState, useEffect } from "react";
import "../comp/Task.css";
import edit from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import tick from "../assets/tickIcon.png";
import upArrow from "../assets/up-arrow.png";
import downArrow from "../assets/down-arrow.png";
import redTick from "../assets/red-tick.png"; // Red tick icon
import greenTick from "../assets/green-tick.png"; // Green tick icon

function Task() {
  // Load tasks from local storage on component mount
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            task: "do gym",
            time: new Date().toLocaleTimeString(),
            taskType: "Work outs",
            editable: false,
            completed: null,
          },
          {
            task: "do homework",
            time: new Date().toLocaleTimeString(),
            taskType: "Study",
            editable: false,
            completed: null,
          },
        ];
  });

  const [task, setTask] = useState("");
  const [selectValue, setSelectValue] = useState("");

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const error = document.getElementById("error");
    if (task && selectValue) {
      error.classList.remove("error");
      error.textContent = "";
      const newTask = {
        task: task,
        time: new Date().toLocaleTimeString(),
        taskType: selectValue,
        editable: false,
        completed: null,
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setSelectValue("");
    } else {
      error.classList.add("error");
      error.textContent = "Please Enter Valid Task";
    }
  };

  const getTaskLabel = (event) => {
    setSelectValue(event.target.value);
  };

  const toggleCompletion = (key, status) => {
    setTasks(
      tasks.map((t, index) =>
        index === key ? { ...t, completed: status } : t
      )
    );
  };

  const toggleUpdateTask = (key) => {
    setTasks(
      tasks.map((t, index) =>
        index === key ? { ...t, editable: !t.editable } : t
      )
    );
  };

  const updateTask = (key, newTask) => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    setTasks(
      tasks.map((t, index) =>
        index === key
          ? { ...t, task: newTask, time: new Date().toLocaleTimeString(), editable: false }
          : t
      )
    );
  };

  const deleteTask = (key) => {
    setTasks(tasks.filter((t, index) => index !== key));
  };

  const upTask = (k) => {
    if (k > 0) {
      const mockTask = [...tasks];
      [mockTask[k], mockTask[k - 1]] = [mockTask[k - 1], mockTask[k]];
      setTasks(mockTask);
    }
  };

  const downTask = (k) => {
    if (k < tasks.length - 1) {
      const mockTask = [...tasks];
      [mockTask[k], mockTask[k + 1]] = [mockTask[k + 1], mockTask[k]];
      setTasks(mockTask);
    }
  };

  const TaskMapping = tasks.map((task, key) => (
    <div
      key={key}
      className="task"
      style={{
        backgroundColor:
          task.completed === true
            ? "#e8f5e9" // Light green for completed tasks
            : task.completed === false
            ? "#ffebee" // Light red for incomplete tasks
            : "white", // Default white for unmarked tasks
      }}
    >
      <div className="task-text">
        <p
          onBlur={(e) => updateTask(key, e.target.innerText)}
          suppressContentEditableWarning={true}
          contentEditable={task.editable}
        >
          {task.task}
        </p>
        <br />
        <br />
      </div>
      <div className="task-tools">
        <div>
          <p>{task.time}⏰</p>
        </div>
        <div>{task.taskType}</div>
        <div className="task-mod">
          <button onClick={() => upTask(key)}>
            <img src={upArrow} alt="Up" />
          </button>
          <button onClick={() => downTask(key)}>
            <img src={downArrow} alt="Down" />
          </button>
          <button onClick={() => toggleUpdateTask(key)}>
            <img src={edit} alt="Edit" />
          </button>
          <button onClick={() => toggleCompletion(key, true)}>
            <img src={greenTick} alt="Green Tick" title="Mark Complete (Green)" />
          </button>
          <button onClick={() => toggleCompletion(key, false)}>
            <img src={redTick} alt="Red Tick" title="Mark Incomplete (Red)" />
          </button>
          <button onClick={() => deleteTask(key)}>
            <img src={deleteIcon} alt="Delete" />
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="task-con">
        <h1 className="title">To Do List</h1>
        <div className="task-inp-con">
          <input
            type="text"
            placeholder="Add your Task"
            value={task}
            className="task-inp"
            onChange={(e) => setTask(e.target.value)}
          />
          <select name="task-labels" onChange={getTaskLabel} value={selectValue}>
            <option value="">Select type</option>
            <option value="Sports">Sports</option>
            <option value="Study">Study</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input type="submit" className="task-sub" onClick={addTask} />
        </div>
        <div id="error"></div>
        <div className="tasks-display-con">
          {TaskMapping.length > 0 ? TaskMapping : "No tasks"}
        </div>
      </div>
    </>
  );
}

export default Task;