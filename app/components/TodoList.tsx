import React from 'react'
import { ITask } from '../../types/task'
import Task from './Task'

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>Task</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {tasks.map(task => <Task key={task.id} task={task} /> )}
            </tbody>
        </table>
        </div>
  )
}

export default TodoList