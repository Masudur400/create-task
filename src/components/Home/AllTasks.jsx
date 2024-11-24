import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/axiosPublic';
import SingleTask from './SingleTask';
import { useQuery } from '@tanstack/react-query';

const AllTasks = () => {

    const axiosPublic = useAxiosPublic()
    const [pages, setPages] = useState([])
    const [itemParPage, setItemParPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)

    

    const { data: AllTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', axiosPublic, currentPage, itemParPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/task?page=${currentPage}&size=${itemParPage}`)
            return res.data
        }
    })


    const { data: count = {}, isLoading: isloading } = useQuery({
        queryKey: ['tasksCount', axiosPublic],
        queryFn: async () => {
            const res = await axiosPublic.get('/tasksCount')
            return res.data
        }
    })

    useEffect(() => {
        if (count.count) {
            const numberOfPages = Math.ceil(count.count / itemParPage)
            const page = [...Array(numberOfPages).keys()];
            setPages(page)
        }
    }, [itemParPage, count])

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({
                top: 0,
                behavior: "smooth",  
            });
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({
                top: 0,
                behavior: "smooth",  
            });
        }
    }


    return (
        <div>
            <div className='flex items-center gap-3 my-10'>
                <div className='h-12 w-4 bg-orange-500'> </div>
                <h3 className="text-2xl font-bold">All Tasks</h3>
            </div>
            <div className='grid md:grid-cols-2 gap-5'>
                {
                    AllTasks.map(tasks => <SingleTask key={tasks._id} tasks={tasks}></SingleTask>)
                }
            </div>
            <div className="md:w-1/2 mx-auto mt-10 mb-5">
                <button onClick={handlePrevPage} className="px-3 py-1 font-medium bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm ">Prev</button>
                {
                    pages?.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={currentPage === page ? "px-3 py-1 text-white bg-orange-400 hover:bg-orange-500 mr-3 rounded-sm mb-2" : "px-3 py-1 bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm mb-2"}>{page + 1}</button>)
                }
                <button onClick={handleNextPage} className="px-3 py-1 font-medium bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm ">Next</button>
            </div>
        </div>
    );
};

export default AllTasks;