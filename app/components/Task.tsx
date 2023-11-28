"use client"

import React, { FormEventHandler, useState } from 'react'
import { ITask } from '../../types/task'
import {FiEdit, FiTrash} from "react-icons/fi";
import Modal from './Modal';
import { deleteTodo, editTodo } from '../../api';
import { useRouter } from 'next/navigation';
 
interface TaskProps {
    task: ITask
}

const Task:React.FC<TaskProps> = ({task}) => {

  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);


  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      await editTodo( {
        id: task.id,
        text:taskToEdit,
      })

      setOpenModalEdit(false);
      router.refresh();
  }

  const handleDeleteTodo = async (id:String) => {
    await deleteTodo(id);
  }

  return (
    <tr key={task.id}>
        <td className='w-full'>{task.text}</td>
        <td className='flex gap-5'>
          <FiEdit onClick={() => setOpenModalEdit(true)} size={25} className='text-blue-500' cursor="pointer" />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className='font-bold text-lg'>Edit Task</h3>
              <div className='modal-action'>
                <input
                  value={taskToEdit}
                  onChange={ (e) => setTaskToEdit(e.target.value) }
                  type="text"
                  placeholder="Enter task info"
                  className="input input-bordered w-full"
                />
                <button type='submit' className="btn">Submit</button>
              </div>
            </form>
          </Modal>
          
          <FiTrash size={25}  className='text-red-500' cursor="pointer" onClick={ () => setOpenModalDelete(true)} />

          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
            <form onSubmit={(e) => handleDeleteTodo(task.id)}>
              <h3 className='font-bold text-lg'>Delete Task</h3>
              <div className='modal-action'>
                <h3 className='text-lg self-center'>Are you sure you want to delete this task ?</h3>
                <button type='submit' className="btn self-center">Delete</button>
              </div>
            </form>
          </Modal>
          
        </td>
    </tr>
  )
}

export default Task

function uuidv4(): string {
  throw new Error('Function not implemented.');
}
