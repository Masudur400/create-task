import React from 'react';

const TaskForm = () => {
    return (
        <div className='md:px-7 md:py-14 p-3 g-card'>
            <h3 className="text-2xl font-medium text-center">Create A Task</h3>
            <div>
                <form className='md:w-3/4 mx-auto space-y-3'>
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
                    <button type='submit' className='border border-orange-500 font-medium px-3 py-1'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;