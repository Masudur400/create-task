import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../Hooks/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const EditTask = () => {

    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const { data: tasks = {}, isLoading, refetch } = useQuery({
        queryKey: ['tasks', id,axiosPublic],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${id}`)
            return res.data
        }
    }) 
    const { _id,task, description } = tasks


    const  handleEditTask = async (e) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const task = form.get('task')
        const description = form.get('description')

        const data ={
            task  ,
            description  
        }

        const res = await axiosPublic.patch(`/tasks/ta/${_id}`, data)

            if (res.data.modifiedCount > 0) { 
                 toast.success('Task edited successful')
                refetch()
                navigate('/manageTasks')
            } 
    }

    return (
        <div>
            <form onSubmit={handleEditTask} className='md:w-3/4 mx-auto space-y-3'>
                <div className="w-full">
                    <label htmlFor="task" className="font-medium"> Task </label>
                    <input
                        type="text"
                        name="task"
                        id="task"
                        defaultValue={task}
                        placeholder="Task Title"
                        className=" border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-orange-500 transition-colors duration-300"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="description" className="font-medium"> Description </label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        defaultValue={description}
                        placeholder="Write description"
                        className="border  rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[100px] focus:border-orange-500 transition-colors duration-300"
                    />
                </div>

                <div className='flex justify-center items-center'>
                    <button type='submit' className='border hover:shadow-md w-40 font-medium px-4 py-2 rounded-md bg-base-100'>Edit Task</button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;