import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [taskValue, setTaskValue] = useState('')
  const [tasks, setTasks] = useState([])
  

  const resetForm = () => {
    setTaskValue('')
  }

  const postTask = async (task) => {
    
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    }

    try {
      let res = await fetch('http://localhost:3001/storetasks',requestOptions)
      let json = await res.json()
    } catch (error) {
      console.log('This is' + error) 
    }
  }

  const getTask = async () => {
    const data = await fetch('http://localhost:3001/')
    const json = await data.json()
    setTasks(json)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(taskValue != ''){
      const task = {value: taskValue}
      await postTask(task)
      getTask()
    }
    resetForm();
  }

  const deleteTask = async(id) => {
    const res = await fetch(`http://localhost:3001/deletetask/${id}`,{method: 'DELETE'})
    const json = await res.json()
    getTask()
  }
  

  useEffect(() => {
    getTask()
  }, [])

  return (
    <>
      <div className="task-manager">
        <div className="task-head">
          Task Manger
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='e.g. wash dishes' value={taskValue} onChange={e => {setTaskValue(e.target.value)}}/>
            <button className='btn'>Submit</button>
          </form>
        </div>
      </div>

      <div className='tasks'>
        {tasks && tasks.map((task, i) => (
            <div className='task' key={task._id}>
              <div className='task-title'>
                {task.value}
              </div>
              <button className='btn' onClick={(e) => deleteTask(task._id)}>delete</button>
            </div>
        ))}
      </div>
    </>
  );
}

export default App;
