import React, {useState} from 'react';
import {useSound} from 'use-sound';

function Todo(){

    const [tasks, setTasks] = useState(["do laundry","fold clothes"]);
    const [newTask, setNewTask] = useState("");
    const [accomplishedTasks, setAccomplishedTasks] = useState([]);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState(""); 

    function handleInputChange (event) {
        setNewTask(event.target.value);
    }

    function addTask (){

        if (newTask.trim() !== "" ){
            setTasks( t => [...t, newTask]);
            setNewTask("");
        }
        
    }

    function deleteTask (index){
        const updatedTasks = tasks.filter((_ ,i) => i !== index)
        setTasks(updatedTasks);
    }

    function completeTask (index){
        const taskCompleted = tasks[index];
        setAccomplishedTasks(a => [...a, taskCompleted] );
        const updatedTasks = tasks.filter((_ ,i) => i !== index)
        setTasks(updatedTasks);
    }

    function editTask (index){
        //how will i add this?
        setNewTask
    }

    return(
        <>
        <div className="todo-container">
            <div className="todo-status">
                {((accomplishedTasks.length/
                    (tasks.length+accomplishedTasks.length)) 
                    * 100).toFixed(2)}% Task Done
            </div>
            <div className="task-forms">
                <input type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={handleInputChange} />
                <button
                className="add-button"
                onClick={addTask}>➕</button>
            </div>
            <div className="tasks">
                <ol>
                    {tasks.map((task, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                        <>
                            <input className="edit-text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            />
                            <button className="save-button" onClick={() => {
                            const updatedTasks = [...tasks];
                            updatedTasks[index] = editValue;
                            setTasks(updatedTasks);
                            setEditingIndex(null);
                            }}>
                            Save
                            </button>
                        </>
                        ) : (
                        <>
                            <span>{task}</span>
                            <button className="delete-button" onClick={() => deleteTask(index)}>🗑️</button>
                            <button className="edit-button" onClick={() => {
                            setEditingIndex(index);
                            setEditValue(task);
                            }}>
                            ✍️
                            </button>
                            <button className="done-button" onClick={() => completeTask(index)}>✔️</button>
                        </>
                        )}
                    </li>
                    ))}
                </ol>
            </div>
            <div className="done-tasks">
                <h2>Accomplished tasks</h2>
                <ol>
                    {accomplishedTasks.map((doneTask, index) => <li key={index} >
                    <span>{doneTask}</span>
                    </li>)}
                </ol>
            </div>
        </div>
        </>
    )

}

export default Todo;