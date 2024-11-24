import React from 'react';

const SingleTask = ({tasks}) => {
    
    const {task, description} = tasks

    return (
        <div className='p-3 shadow-md border border-base-300 rounded-md hover:shadow-lg space-y-2'>
            <h2 className="text-xl font-medium opacity-80">{task}</h2>
            <p>{description}</p>
        </div>
    );
};

export default SingleTask;