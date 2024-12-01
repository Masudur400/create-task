import React from 'react';
import useAxiosPublic from '../Hooks/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ManageTasks = () => {

    const axiosPublic = useAxiosPublic()

    const { data: AllTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', axiosPublic],
        queryFn: async () => {
            const res = await axiosPublic.get('/tasks');
            return res.data;
        }
    });

    const handleDelete = task =>{
        console.log(task);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete task...!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/tasks/${task?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                             toast.success('Task Deleted')
                        }
                    })
            }
        });
    }

    return (
        <div>
            <Toaster></Toaster>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> # </th>
                            <th>Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            AllTasks.map((task, idx) => <tr key={task._id}>
                                <td> {idx + 1}</td>
                                <td className='min-w-96'>
                                    <h2 className="text-xl font-medium opacity-80">{task.task}</h2>
                                    <p>{task.description}</p>
                                </td>
                                <td>
                                    <div className='flex flex-col justify-center items-center gap-3'>
                                        <Link to={`/editTask/${task._id}`}><button className='px-3 py-1 border border-orange-500 text-orange-500 font-medium rounded-md hover:shadow-md'>Edit</button></Link>
                                        <button onClick={()=>handleDelete(task)} className='px-3 py-1 border border-orange-500 text-orange-500 font-medium rounded-md hover:shadow-md'>Delete</button>
                                    </div>
                                </td>
                            </tr>)
                        }



                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageTasks;