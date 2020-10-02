import React from 'react'
import { MdSend } from 'react-icons/md'

function ExpenseForm({ charge, amount, handleCharge, handleAmount, submit, edit }) {
    return (
       <form onSubmit={submit}>
           <div className='form-center'>
             <div className='form-group'>
                <label htmlFor='charge'>charge</label>
                <input 
                    type='text' 
                    className='form-control' 
                    id='charge' 
                    name='charge' 
                    placeholder='eg: rent'
                    value={charge}
                    onChange={handleCharge}/>
             </div>
             <div className='form-group'>
                <label htmlFor='amount'>amount</label>
                <input 
                    type='number' 
                    className='form-control' 
                    id='amount' 
                    name='amount' 
                    placeholder='eg: 1000'
                    value={amount}
                    onChange={handleAmount}/>
             </div>
           </div>
           <button type='submit' className='btn'>{ edit ? 'edit' : 'submit'} <MdSend className='btn-icon'/> </button>
       </form>
    )
}

export default ExpenseForm
