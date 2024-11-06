import React, { useState } from 'react'
import "../comp/Task.css";
import edit   from  "../assets/editIcon.png";
import deleteIcon from  "../assets/deleteIcon.png";
import tick from "../assets/tickIcon.png";
import upArrow from "../assets/up-arrow.png";
import downArrow from "../assets/down-arrow.png";
function Task() {
const [tasks,setTasks]=useState([ 
  {
    task:"do gym",
    time:new Date().toLocaleTimeString(),
    taskType:'Work outs',
    editable:'false',
  },
  {
    task:"do homework",
    time:new Date().toLocaleTimeString(),
    taskType:'Study',
    editable:'false',
  }
]);
const [task,setTask]=useState("");
const [selectValue,setSelectValue]=useState("");
const addTask=()=>{
  const error=document.getElementById("error");
  if(task && selectValue){
    error.classList.remove('error'); 
    error.textContent="";
    const newTask={
      task:task,
      time:new Date().toLocaleTimeString(),
      taskType:selectValue,
      editable:false,
    }
    setTasks([...tasks,newTask]);
    setTask("");
    setSelectValue("");
  }else{
    error.classList.add('error'); 
   
    error.textContent="Plese Enter Valid Task"
  }
};

const getTaskLabel=(event)=>{
  setSelectValue(event.target.value);
}
const upTask=(k)=>{
 if(k>0){
  const mockTask=[...tasks];
  [mockTask[k],mockTask[k-1]]=[mockTask[k-1],mockTask[k]]

setTasks(mockTask);
 }
}


const downTask=(k)=>{
  if(k<tasks.length-1){
    const mockTask=[...tasks];
    [mockTask[k],mockTask[k+1]]=[mockTask[k+1],mockTask[k]]
  setTasks(mockTask);
  }d
  
}
const toogleUpdateTask=(key)=>{
   setTasks(tasks.map((t,index)=>(
    index===key ? {...t,editable:!t.editable}:t
   ))) 
  console.log("Toogled Succesfully");
}
const updateTask=(key,newTask)=>{
 
  
  setTasks(tasks.map((t,index)=>(
    index===key ? {...t,task:newTask,time:new Date().toLocaleTimeString(),editable:false}: t
  )))
   
     console.log("updated Succesfully");
}
const deleteTask=(key)=>{
   setTasks(tasks.filter((t,index)=>(
      index!=key
   )))
  console.log("deleted successffully");
}
const TaskMapping=tasks.map((task,key)=>(
  <div key={key} className="task"   >
          <div className='task-text'>
          <p onBlur={(e)=>updateTask(key,e.target.innerText)}
          suppressContentEditableWarning={true}
           contentEditable={task.editable} >{task.task}</p> 
            <br /><br />

          </div>
          <div className='task-tools'>
            
           <div>
           <p>{task.time}⏰</p> 
           </div>
             <div>
              {task.taskType}
             </div>

           
             <div className='task-mod'>
             <button onClick={()=>upTask(key)}><img src={upArrow} alt="" /></button>
             <button onClick={()=>downTask(key)}><img src={downArrow} alt="" /></button>
              <button onClick={()=>toogleUpdateTask(key)} ><img src={edit}    alt=""  /></button>
              <button ><img src={tick}    alt=""  /></button>
              <button onClick={()=>deleteTask(key)}><img src={deleteIcon} alt="" /></button>
             </div>
          </div>
  </div>
))



  return (
   <>
    <div className='task-con'>
      <h1 className='title'>To Do List</h1>
            <div className="task-inp-con">
                 <input type="text" placeholder='Add your Task' value={task}  className='task-inp'  onChange={(e)=>setTask(e.target.value)}/>
                 <select name="task-labels" onChange={getTaskLabel} value={selectValue}>
                 <option value="">Select type</option>
                  <option value="Sports">Sports</option>
                  <option value="Study">Study</option>
                  <option value="Entertaiment">Entertaiment</option>
                 </select>
                 <input type="submit"  className='task-sub' onClick={addTask} />
            </div>
            <div id="error">
              
            </div>
         <div className='tasks-display-con'>
            {TaskMapping.length >0 ? TaskMapping :"No tasks"}
           
         </div>
         
    </div>
   </>
  )
}

export default Task;
