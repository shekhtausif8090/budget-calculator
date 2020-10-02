import React, { Fragment } from 'react'
import Item from './ExpenseItem';
import { MdDelete } from 'react-icons/md'

function ExpenseList({ expenses, handleEdit, handleDelete, clearItems }) {
    return (
       <Fragment>
           <ul className='list'>
            {expenses.map((expense) => {
                return <Item 
                            key={expense.id} 
                            expense={expense} 
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}/>
            })}
           </ul>
           {expenses.length > 0 && <button className='btn' onClick={clearItems}>
               clear expenses <MdDelete className='btn-icon' />
               </button>}
       </Fragment>
    )
}

export default ExpenseList
