import React, { useState } from 'react'
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

import './Tasks.scss';

const AddTaskForm = ({ list, onAddTask }) => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setinputValue('');
    }

    const addTask = () => {
        const obj = {
            'listId': list.id,
            'text': inputValue,
            'completed': false
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
            onAddTask(list.id, data)
            toggleFormVisible();
        }).catch(() => {
            alert('Error: An error occurred while adding tasks!')
        }).finally(() => {
            setIsLoading(false)
        });
    }

    return (
        <div className='tasks__form'>
            {!visibleForm ?
                (<div onClick={toggleFormVisible} className='tasks__form-new'>
                    <img src={addSvg} alt='Add icon' />
                    <span>New task</span>
                </div>) :
                (<div className='tasks__form-block'>
                    <input value={inputValue} className='field' type='text' placeholder='e.g.  Go to the store' onChange={e => { setinputValue(e.target.value) }} />
                    <button disabled={isLoading} onClick={addTask} className='button'>
                        {isLoading ? 'Adding...' : 'Add task'}
                    </button>
                    <button onClick={toggleFormVisible} className='button button--grey'>Cancel</button>
                </div>)}
        </div >
    )
}

export default AddTaskForm


