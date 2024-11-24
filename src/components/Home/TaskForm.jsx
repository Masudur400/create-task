import React from 'react';
import useAxiosPublic from '../Hooks/axiosPublic';
import toast, { Toaster } from 'react-hot-toast';

const TaskForm = () => {

    const axiosPublic = useAxiosPublic()

    const  createTask = async (e) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const task = form.get('task')
        const description = form.get('description')

        const data ={
            task, description
        }

        const res = await axiosPublic.post('/tasks', data)
        if (res.data.insertedId) {
             toast.success('Task Added Successful !')
            e.target.reset()
        }

    }


    return (
        <div className='md:px-7 md:py-14 p-3 bg-base-300 rounded-md'>
            <Toaster></Toaster>
            <h3 className="text-2xl font-bold text-center text-orange-400">Create A Task</h3>
            <div>
                <form onSubmit={createTask} className='md:w-3/4 mx-auto space-y-3'>
                    <div className="w-full">
                        <label htmlFor="task" className="font-medium"> Task </label>
                        <input
                            type="text"
                            name="task"
                            id="task"
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
                            placeholder="Write description"
                            className="border  rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[100px] focus:border-orange-500 transition-colors duration-300"
                        />
                    </div>

                    <div className='flex justify-center items-center'>
                    <button type='submit' className='border hover:shadow-md w-40 font-medium px-4 py-2 rounded-md bg-base-100'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;