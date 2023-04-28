import { useState } from 'react';
import uuid from 'react-native-uuid';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

type Task = {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle !== '') {
      const newTask: Task = {
        id: uuid.v4().toString(),
        title: newTaskTitle,
        isComplete: false,
      }

      setTasks(tasks => [...tasks, newTask]);
      setNewTaskTitle('');

    } else {
      console.log("Preencha a descrição da tarefa");
    }
  }

  function handleToggleTaskCompletion(id: string) {
    const updatedTaskList = tasks.map(task => task.id === id ?
      {
        ...task,
        isComplete: !task.isComplete,
      } :
      task
    );
    setTasks(updatedTaskList);
  }

  function handleRemoveTask(id: string) {
    const updatedTaskList = tasks.filter(task => task.id !== id);

    setTasks(updatedTaskList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}